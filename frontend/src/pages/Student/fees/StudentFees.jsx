import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IndianRupee, Calendar, CreditCard, Download,
    AlertTriangle, CheckCircle2, History, ChevronRight,
    Search, X, Printer
} from 'lucide-react';
import { useFees } from '../../../context/FeeContext';
import { toast } from 'react-toastify';

const StudentFees = () => {
    const { myFees, loading, submitPayment } = useFees();
    const [selectedFee, setSelectedFee] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentData, setPaymentData] = useState({
        amountPaid: '',
        transactionId: '',
        paymentMethod: 'Online',
        remarks: 'Tuition Fee Payment'
    });

    const handlePayment = async (e) => {
        e.preventDefault();
        const res = await submitPayment({
            ...paymentData,
            feeStructureId: selectedFee.id,
            studentId: selectedFee.studentId // or get from auth
        });
        if (res.success) {
            toast.success('Payment submitted successfully (Mock)');
            setIsPaymentModalOpen(false);
            setPaymentData({ amountPaid: '', transactionId: '', paymentMethod: 'Online', remarks: '' });
        } else {
            toast.error(res.message);
        }
    };

    const totalDue = myFees.reduce((sum, fee) => sum + fee.balance, 0);

    return (
        <div className="space-y-6">
            {/* Header / Summary */}
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Fee Dashboard</h1>
                        <p className="text-indigo-100 italic">Academic Session 2024-25</p>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-medium text-indigo-100 uppercase tracking-wider">Total Outstanding</span>
                        <h2 className="text-4xl font-black mt-1">₹{totalDue.toLocaleString()}</h2>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full -ml-16 -mb-16 blur-2xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Fee List */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <CreditCard className="text-indigo-600" />
                        Due Fees
                    </h2>

                    {myFees.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">All Fees Paid!</h3>
                            <p className="text-gray-500">You have no outstanding dues at this time.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {myFees.map((fee) => (
                                <motion.div
                                    key={fee.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">{fee.name}</h3>
                                                {fee.isOverdue && (
                                                    <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-red-100 animate-pulse">
                                                        Overdue
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><Calendar size={14} /> Due: {new Date(fee.dueDate).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1 font-medium text-indigo-600">Total: ₹{fee.totalAmount.toLocaleString()}</span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-4">
                                                <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-tighter">
                                                    <span>Progression</span>
                                                    <span>{Math.round((fee.amountPaid / fee.totalAmount) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(fee.amountPaid / fee.totalAmount) * 100}%` }}
                                                        className={`h-full ${fee.status === 'Paid' ? 'bg-green-500' : 'bg-indigo-600'}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between items-end gap-2 shrink-0">
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Balance</p>
                                                <p className="text-xl font-black text-gray-900">₹{fee.balance.toLocaleString()}</p>
                                            </div>
                                            {fee.balance > 0 && (
                                                <button
                                                    onClick={() => { setSelectedFee(fee); setIsPaymentModalOpen(true); }}
                                                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Side Info */}
                <div className="space-y-6">
                    {/* Payment History Card */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <History size={18} className="text-indigo-600" />
                                Recent Activity
                            </h3>
                            <button className="text-[10px] font-bold text-indigo-600 hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {myFees.flatMap(f => f.payments || []).slice(0, 4).map((p, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                                        <Download size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">₹{p.amountPaid.toLocaleString()}</p>
                                        <p className="text-[10px] text-gray-400">{new Date(p.date).toLocaleDateString()}</p>
                                    </div>
                                    <button title="Print Receipt" className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                        <Printer size={16} />
                                    </button>
                                </div>
                            ))}
                            {myFees.every(f => !f.payments?.length) && (
                                <p className="text-center text-gray-400 text-sm py-8">No payments recorded yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Notification Card */}
                    <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm shadow-orange-100 shrink-0">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-orange-900 mb-1">Fee Policy</h4>
                                <p className="text-xs text-orange-700 leading-relaxed">
                                    A late fine of ₹500 is applicable after the due date. Please ensure all payments are made before deadlines to avoid penalties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {isPaymentModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                            onClick={() => setIsPaymentModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl z-[70] shadow-2xl p-8"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Make Payment</h2>
                                    <p className="text-xs text-indigo-600 font-bold tracking-wider uppercase mt-1">Ref: {selectedFee?.name}</p>
                                </div>
                                <button onClick={() => setIsPaymentModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Amount Selected</span>
                                    <span className="text-xl font-black text-gray-900">₹{selectedFee?.balance.toLocaleString()}</span>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1 block">Transaction ID (Mock)</label>
                                    <input
                                        type="text" required placeholder="IMSTRX_123456789"
                                        className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                                        value={paymentData.transactionId}
                                        onChange={e => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentData({ ...paymentData, amountPaid: selectedFee?.balance })}
                                            className="w-full h-full py-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all"
                                        >
                                            Pay Full
                                        </button>
                                    </div>
                                    <input
                                        type="number" required placeholder="Custom Amount"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500/20 text-xs font-bold"
                                        value={paymentData.amountPaid}
                                        onChange={e => setPaymentData({ ...paymentData, amountPaid: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all mt-4 shadow-xl shadow-indigo-100">
                                    <CheckCircle2 size={20} />
                                    Confirm Mock Payment
                                </button>
                                <p className="text-[10px] text-center text-gray-400">
                                    Note: This is a demonstration. No real funds will be transferred.
                                </p>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentFees;
