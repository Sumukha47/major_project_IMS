import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
    Calendar as CalendarIcon, UserCheck, XCircle, Clock,
    AlertCircle, Filter, ChevronDown, CheckCircle, Info,
    TrendingUp, ArrowUpRight, ArrowDownRight, LayoutGrid, List, FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAttendance } from '../../../context/AttendanceContext';

const StudentAttendance = () => {
    const { stats, attendanceRecords, loading, getMonthlySummary } = useAttendance();
    const [viewMode, setViewMode] = useState('summary');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlyHistory, setMonthlyHistory] = useState([]);

    useEffect(() => {
        const fetchMonthly = async () => {
            const data = await getMonthlySummary(selectedMonth, selectedYear);
            setMonthlyHistory(data);
        };
        fetchMonthly();
    }, [selectedMonth, selectedYear]);

    // Chart Data
    const chartData = stats ? [
        { name: 'Present', value: stats.present + stats.late, color: '#10B981' },
        { name: 'Absent', value: stats.absent, color: '#EF4444' },
    ] : [];

    // Status Message
    const getStatusMessage = (percentage) => {
        if (percentage >= 90) return { text: "Excellent Standing", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle };
        if (percentage >= 75) return { text: "Good Standing", color: "text-blue-600", bg: "bg-blue-50", icon: CheckCircle };
        if (percentage >= 65) return { text: "Attention Required", color: "text-orange-600", bg: "bg-orange-50", icon: AlertCircle };
        return { text: "Critical Risk", color: "text-red-600", bg: "bg-red-50", icon: AlertCircle };
    };

    const status = stats ? getStatusMessage(stats.percentage) : null;

    const handleExport = () => {
        window.print(); // Simple PDF export for now
    };

    if (loading && !stats) return (
        <div className="flex items-center justify-center p-20 min-h-screen">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 font-sans">
            {/* Professional Header */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>

                <div className="z-10 text-center md:text-left flex-1">
                    <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                        <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                            <UserCheck size={24} />
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Attendance Record</h1>
                    </div>
                    <p className="text-gray-500 max-w-md text-lg leading-relaxed">
                        Track your daily presence and eligibility status.
                        Live synchronization with campus registry.
                    </p>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest ${status.bg} ${status.color}`}
                        >
                            <status.icon size={20} />
                            {status.text}
                        </motion.div>
                    )}
                </div>

                {/* Circular Indicator */}
                <div className="relative z-10 w-56 h-56 flex-shrink-0 bg-white rounded-full p-2 shadow-inner border border-gray-50">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={8}
                                dataKey="value"
                                cornerRadius={12}
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-gray-900">{stats?.percentage || 0}%</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mt-1">Average</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm sticky top-4 z-30">
                <div className="flex bg-white/80 p-1.5 rounded-2xl shadow-inner border border-gray-100">
                    <button
                        onClick={() => setViewMode('summary')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${viewMode === 'summary' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:text-gray-900'
                            }`}
                    >
                        <LayoutGrid size={18} /> Summary
                    </button>
                    <button
                        onClick={() => setViewMode('detailed')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${viewMode === 'detailed' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:text-gray-900'
                            }`}
                    >
                        <List size={18} /> History
                    </button>
                </div>

                <div className="flex gap-4">
                    <button onClick={handleExport} className="px-6 py-3 bg-white text-gray-900 border border-gray-100 shadow-sm rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-3 hover:translate-y-[-2px] transition-all active:scale-95">
                        <FileDown size={16} className="text-indigo-600" /> Export PDF
                    </button>
                    <div className="flex items-center bg-white rounded-2xl border border-gray-100 px-4">
                        <CalendarIcon size={16} className="text-indigo-600 mr-3" />
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none py-3"
                        >
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                                <option key={i} value={i + 1}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Content area logic is similar to before but with live data mapped from attendanceRecords and monthlyHistory */}
            {/* ... (Detailed View and Summary Cards) ... */}
            <AnimatePresence mode="wait">
                {viewMode === 'summary' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Placeholder for real subject-wise aggregation if backend provides it, otherwise calculate on fly */}
                        {/* For now, showing overall stats grid */}
                        {[
                            { label: 'Present', val: stats?.present, color: 'emerald', icon: CheckCircle },
                            { label: 'Absent', val: stats?.absent, color: 'rose', icon: XCircle },
                            { label: 'Late', val: stats?.late, color: 'amber', icon: Clock },
                            { label: 'Total Logs', val: stats?.total, color: 'indigo', icon: Info }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm">
                                <div className={`w-12 h-12 rounded-2xl bg-${card.color}-50 text-${card.color}-600 flex items-center justify-center mb-6`}>
                                    <card.icon size={24} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${card.color}-500 mb-2 block`}>{card.label}</span>
                                <span className="text-4xl font-black text-gray-900">{card.val || 0}</span>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest text-center">Monthly Log: {selectedMonth}/{selectedYear}</h3>
                        <div className="space-y-4">
                            {monthlyHistory.map((record, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center font-black">
                                            <span className="text-[10px] text-gray-400 leading-none mb-1">{record.date.split('-')[1]}</span>
                                            <span className="text-lg text-gray-900 leading-none">{record.date.split('-')[2]}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">{record.subject || 'General'}</h4>
                                            <p className="text-[10px] font-bold text-gray-400">SESSION RECORDED BY FACULTY</p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${record.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                                            record.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                        }`}>
                                        {record.status}
                                    </div>
                                </div>
                            ))}
                            {monthlyHistory.length === 0 && (
                                <p className="p-10 text-center font-bold text-gray-400 uppercase tracking-[0.2em]">No records found for this period</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Threshold Warning */}
            {stats && stats.percentage < 75 && (
                <div className="bg-rose-50 border-2 border-rose-100 rounded-[2rem] p-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200 animate-pulse">
                        <AlertCircle size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-rose-900 uppercase tracking-widest mb-1">Low Attendance Alert</h3>
                        <p className="text-rose-600 font-bold">Your current record is below the mandatory 75% threshold. Please contact your department head immediately to avoid debarment.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentAttendance;
