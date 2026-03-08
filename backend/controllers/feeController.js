import { Op } from 'sequelize';
import FeeStructure from '../models/FeeStructure.js';
import FeePayment from '../models/FeePayment.js';
import Discount from '../models/Discount.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import sequelize from '../config/database.js';

// Helper: Calculate late fees
const calculateLateFee = (structure, currentDate = new Date()) => {
    if (!structure.lateFeeApplicable) return 0;

    const due = new Date(structure.dueDate);
    if (currentDate <= due) return 0;

    const diffTime = Math.abs(currentDate - due);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return parseFloat(structure.lateFeeAmount) + (diffDays * parseFloat(structure.lateFeePerDay));
};

// Create Fee Structure
export const createFeeStructure = async (req, res) => {
    try {
        const structure = await FeeStructure.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json(structure);
    } catch (error) {
        res.status(500).json({ message: 'Error creating fee structure', error: error.message });
    }
};

// Get Fee Structures (Filterable)
export const getFeeStructures = async (req, res) => {
    try {
        const { department, academicYear, semester } = req.query;
        const where = {};
        if (department) where.department = department;
        if (academicYear) where.academicYear = academicYear;
        if (semester) where.semester = semester;

        const structures = await FeeStructure.findAll({ where, order: [['createdAt', 'DESC']] });
        res.json(structures);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fee structures', error: error.message });
    }
};

// Record/Input Payment
export const inputPayment = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { studentId, feeStructureId, amountPaid, transactionId, paymentMethod, remarks } = req.body;

        const structure = await FeeStructure.findByPk(feeStructureId);
        if (!structure) throw new Error('Fee structure not found');

        // Check for existing payments to determine installment and remaining balance
        const existingPayments = await FeePayment.findAll({
            where: { studentId, feeStructureId },
            order: [['installmentNumber', 'DESC']]
        });

        const totalAlreadyPaid = existingPayments.reduce((sum, p) => sum + parseFloat(p.amountPaid), 0);
        const installmentNumber = existingPayments.length + 1;

        // Calculate total due (including late fees if first payment or if applicable)
        const lateFee = calculateLateFee(structure);
        const totalBaseDue = parseFloat(structure.amount);
        const totalDueWithLate = totalBaseDue + lateFee;

        // Note: Disounts would be subtracted here in a real scenario
        const remainingBeforeThis = totalDueWithLate - totalAlreadyPaid;
        const remainingAfterThis = remainingBeforeThis - parseFloat(amountPaid);

        let status = 'Partial';
        if (remainingAfterThis <= 0) status = 'Paid';

        const payment = await FeePayment.create({
            studentId,
            feeStructureId,
            amountPaid,
            transactionId,
            paymentMethod,
            installmentNumber,
            remainingAmount: Math.max(0, remainingAfterThis),
            penaltyApplied: lateFee,
            status,
            remarks,
            verifiedBy: req.user.role === 'admin' ? req.user.id : null,
            date: new Date()
        }, { transaction: t });

        await t.commit();
        res.status(201).json(payment);
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error recording payment', error: error.message });
    }
};

// Get Student Fees (Personal View)
export const getMyFees = async (req, res) => {
    try {
        const student = await Student.findOne({ where: { userId: req.user.id } });
        if (!student) return res.status(404).json({ message: 'Student profile not found' });

        // Get structures applicable to this student
        const structures = await FeeStructure.findAll({
            where: {
                department: student.department,
                academicYear: student.year, // Simplified mapping
                // semester: student.semester
            },
            include: [{
                model: FeePayment,
                as: 'payments',
                where: { studentId: req.user.id },
                required: false
            }]
        });

        // Format for frontend
        const feeData = structures.map(s => {
            const structure = s.toJSON();
            const paid = (structure.payments || []).reduce((sum, p) => sum + parseFloat(p.amountPaid), 0);
            const lateFee = calculateLateFee(s);
            const total = parseFloat(s.amount) + lateFee;

            return {
                ...structure,
                totalAmount: total,
                amountPaid: paid,
                balance: Math.max(0, total - paid),
                status: paid >= total ? 'Paid' : (paid > 0 ? 'Partial' : 'Pending'),
                isOverdue: new Date() > new Date(s.dueDate) && paid < total
            };
        });

        res.json(feeData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching personal fees', error: error.message });
    }
};

// Get Collection Stats
export const getFeeStats = async (req, res) => {
    try {
        const totalRevenue = await FeePayment.sum('amountPaid') || 0;
        const totalTransactions = await FeePayment.count();

        // Simple aggregation for chart (last 6 months)
        const monthlyStats = await FeePayment.findAll({
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('date')), 'month'],
                [sequelize.fn('sum', 'amountPaid'), 'total']
            ],
            group: [sequelize.fn('date_trunc', 'month', sequelize.col('date'))],
            order: [[sequelize.fn('date_trunc', 'month', sequelize.col('date')), 'ASC']],
            limit: 6
        });

        res.json({
            totalRevenue,
            totalTransactions,
            monthlyStats
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fee stats', error: error.message });
    }
};

// Create Discount (Scholarship/Concession)
export const createDiscount = async (req, res) => {
    try {
        const discount = await Discount.create({
            ...req.body,
            approvedBy: req.user.id
        });
        res.status(201).json(discount);
    } catch (error) {
        res.status(500).json({ message: 'Error creating discount', error: error.message });
    }
};

// Get All Discounts
export const getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.findAll();
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching discounts', error: error.message });
    }
};

// Get Defaulters
export const getDefaulters = async (req, res) => {
    try {
        // Fetch all students and their payments for active structures
        const students = await User.findAll({
            where: { role: 'student' },
            include: [
                { model: Student, as: 'studentProfile' },
                {
                    model: FeePayment,
                    as: 'paymentsReceived',
                    include: [{ model: FeeStructure, as: 'feeStructure' }]
                }
            ]
        });

        const defaulters = students.filter(u => {
            const payments = u.paymentsReceived || [];
            if (payments.length === 0) return true; // No payment at all

            // Return true if the latest payment still has a balance and is overdue
            // This is a simplified check
            return payments.some(p => parseFloat(p.remainingAmount) > 0 && new Date() > new Date(p.feeStructure?.dueDate));
        }).map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            department: u.studentProfile?.department,
            totalPending: (u.paymentsReceived || []).reduce((sum, p) => sum + parseFloat(p.remainingAmount), 0)
        }));

        res.json(defaulters);
    } catch (error) {
        console.error('[FeeController] getDefaulters Error:', error);
        res.status(500).json({ message: 'Error fetching defaulters', error: error.message });
    }
};
