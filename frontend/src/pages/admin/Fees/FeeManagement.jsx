import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IndianRupee, TrendingUp, Users, AlertCircle,
    Plus, Search, Filter, ChevronRight, Download,
    CheckCircle2, Clock, X, FileText
} from 'lucide-react';
import { useFees } from '../../../context/FeeContext';
import { toast } from 'react-toastify';

const FeeManagement = () => {
    const {
        stats, feeStructures, defaulters, loading,
        createFeeStructure, fetchStats, fetchDefaulters
    } = useFees();

    const [activeTab, setActiveTab] = useState('overview');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [newStructure, setNewStructure] = useState({
        name: '',
        amount: '',
        department: 'Computer Science',
        academicYear: '2024-25',
        semester: 1,
        dueDate: '',
        lateFeeAmount: 500,
        lateFeePerDay: 50,
        lateFeeApplicable: true
    });

    const handleCreateStructure = async (e) => {
        e.preventDefault();
        const res = await createFeeStructure(newStructure);
        if (res.success) {
            toast.success('Fee structure created successfully');
            setIsModalOpen(false);
            setNewStructure({
                name: '', amount: '', department: 'Computer Science',
                academicYear: '2024-25', semester: 1, dueDate: '',
                lateFeeAmount: 500, lateFeePerDay: 50, lateFeeApplicable: true
            });
        } else {
            toast.error(res.message);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
                    <p className="text-gray-500 text-sm">Monitor collections, manage structures, and track defaulters.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Plus size={20} />
                        New Fee Structure
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all">
                        <Download size={20} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                            <IndianRupee size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
                            <TrendingUp size={12} /> +8.4%
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">₹{stats?.totalRevenue?.toLocaleString() || '0'}</h3>
                    <p className="text-gray-500 text-sm mt-1">Total Collection</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Users size={24} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stats?.totalTransactions || '0'}</h3>
                    <p className="text-gray-500 text-sm mt-1">Payments Received</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                            <AlertCircle size={24} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{defaulters?.length || '0'}</h3>
                    <p className="text-gray-500 text-sm mt-1">Defaulters Count</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                            <FileText size={24} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{feeStructures?.length || '0'}</h3>
                    <p className="text-gray-500 text-sm mt-1">Active Structures</p>
                </motion.div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100/50 p-1 rounded-xl w-fit">
                {['overview', 'structures', 'defaulters'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                {activeTab === 'overview' && (
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <TrendingUp size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Revenue Insights</h2>
                        <p className="text-gray-500 max-w-md mx-auto">
                            The collection chart and detailed department-wise breakdown are currently being aggregated based on live data.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-8">
                            <div className="p-4 bg-gray-50 rounded-xl text-left border border-gray-100">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Collection</span>
                                <p className="text-xl font-bold text-gray-900">₹45,00,000</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl text-left border border-gray-100">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Collected Percentage</span>
                                <p className="text-xl font-bold text-green-600">82%</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'structures' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr className="text-xs uppercase text-gray-500 font-bold tracking-wider">
                                    <th className="px-6 py-4 text-left">Structure Name</th>
                                    <th className="px-6 py-4 text-left">Department</th>
                                    <th className="px-6 py-4 text-left">Due Date</th>
                                    <th className="px-6 py-4 text-left">Amount</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {feeStructures.map((s, i) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-gray-900">{s.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{s.department}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(s.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">₹{parseFloat(s.amount).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                                <ChevronRight size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'defaulters' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr className="text-xs uppercase text-gray-500 font-bold tracking-wider">
                                    <th className="px-6 py-4 text-left">Student Name</th>
                                    <th className="px-6 py-4 text-left">Email</th>
                                    <th className="px-6 py-4 text-left">Department</th>
                                    <th className="px-6 py-4 text-left">Pending Balance</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {defaulters.map((d, i) => (
                                    <tr key={d.id} className="hover:bg-gray-100/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900">{d.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{d.department}</td>
                                        <td className="px-6 py-4 font-bold text-red-600">₹{d.totalPending.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                                                Send Reminder
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {defaulters.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No defaulters found. All students are up to date!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Structure Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl z-[70] shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Create Fee Structure</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateStructure} className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-1 block">Structure Name</label>
                                    <input
                                        type="text" required placeholder="e.g., Annual Tuition Fees 2024"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20"
                                        value={newStructure.name}
                                        onChange={e => setNewStructure({ ...newStructure, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-1 block">Amount (₹)</label>
                                        <input
                                            type="number" required placeholder="0.00"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20"
                                            value={newStructure.amount}
                                            onChange={e => setNewStructure({ ...newStructure, amount: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-1 block">Due Date</label>
                                        <input
                                            type="date" required
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                                            value={newStructure.dueDate}
                                            onChange={e => setNewStructure({ ...newStructure, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-1 block">Department</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                                            value={newStructure.department}
                                            onChange={e => setNewStructure({ ...newStructure, department: e.target.value })}
                                        >
                                            <option>Computer Science</option>
                                            <option>Information Technology</option>
                                            <option>Electronics</option>
                                            <option>Mechanical</option>
                                            <option>Civil</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-1 block">Year</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                                            value={newStructure.academicYear}
                                            onChange={e => setNewStructure({ ...newStructure, academicYear: e.target.value })}
                                        >
                                            <option>2024-25</option>
                                            <option>2023-24</option>
                                            <option>2025-26</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-2xl space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-indigo-900">Late Fee Applicable</label>
                                        <input
                                            type="checkbox"
                                            checked={newStructure.lateFeeApplicable}
                                            onChange={e => setNewStructure({ ...newStructure, lateFeeApplicable: e.target.checked })}
                                            className="w-5 h-5 text-indigo-600 rounded"
                                        />
                                    </div>
                                    {newStructure.lateFeeApplicable && (
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Initial Penalty</label>
                                                <input
                                                    type="number" className="w-full bg-white px-3 py-2 rounded-lg text-sm border-none mt-1"
                                                    value={newStructure.lateFeeAmount}
                                                    onChange={e => setNewStructure({ ...newStructure, lateFeeAmount: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Per Day Fine</label>
                                                <input
                                                    type="number" className="w-full bg-white px-3 py-2 rounded-lg text-sm border-none mt-1"
                                                    value={newStructure.lateFeePerDay}
                                                    onChange={e => setNewStructure({ ...newStructure, lateFeePerDay: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all mt-4">
                                    <CheckCircle2 size={20} />
                                    Publish Fee Structure
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FeeManagement;
