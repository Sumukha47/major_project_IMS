import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotices } from '../../../context/NoticeContext';
import { useAttendance } from '../../../context/AttendanceContext';
import {
    BookOpen, Calendar, Clock, TrendingUp, Bell, FileText,
    CheckCircle, AlertCircle, ChevronRight, User, LogOut,
    GraduationCap, Activity, FileCheck, CheckCircle2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { notices, fetchNotices } = useNotices();
    const { stats, fetchStats } = useAttendance();

    useEffect(() => {
        fetchNotices('Student');
        if (user?.id) fetchStats(user.id);
    }, [user]);

    // Use authorized user data
    const studentInfo = {
        name: user?.name || "Student",
        program: user?.department ? `B.Tech ${user.department}` : "Engineering Program",
        semester: user?.semester ? `${user.semester}th Semester` : "Current Semester",
        avatar: user?.avatar
    };

    const getAttendanceStatus = (percentage) => {
        if (percentage >= 75) return { text: "Good Standing", color: "text-emerald-600", bg: "bg-emerald-50" };
        return { text: "Critical Risk", color: "text-red-600", bg: "bg-red-50" };
    };

    const attStatus = getAttendanceStatus(stats?.percentage || 0);

    const kpiData = [
        {
            label: "Attendance",
            value: stats ? `${stats.percentage}%` : "0%",
            subtext: attStatus.text,
            icon: stats?.percentage >= 75 ? CheckCircle : AlertCircle,
            color: attStatus.color,
            bg: attStatus.bg,
            border: stats?.percentage >= 75 ? "border-emerald-100" : "border-red-100"
        },
        { label: "CGPA", value: "8.4", subtext: "Last Sem: 8.2", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
        { label: "Pending", value: "3", subtext: "2 Assignments", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
        { label: "Next Exam", value: "12 Days", subtext: "Data Structures", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
    ];

    const todaySchedule = [
        { id: 1, time: "09:00 AM", subject: "Compiler Design", type: "Lecture", room: "LT-2", status: "Upcoming" },
        { id: 2, time: "11:00 AM", subject: "Web Technologies", type: "Lab", room: "Lab-4", status: "Pending" },
        { id: 3, time: "02:00 PM", subject: "AI & ML", type: "Lecture", room: "LT-1", status: "Pending" },
    ];

    // Filter notices for display (Take top 3)
    const displayNotices = notices.slice(0, 3);

    const TimelineSchedule = () => (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-lg h-full overflow-hidden"
        >
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="text-indigo-600" />
                        Today's Schedule
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Your academic timeline</p>
                </div>
                <button
                    onClick={() => navigate('/student/timetable')}
                    className="text-sm text-indigo-600 font-medium hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
                >
                    View Timetable
                </button>
            </div>

            <div className="relative space-y-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-600 before:via-gray-200 before:to-transparent">
                {todaySchedule.map((cls, index) => {
                    const isNext = index === 0;
                    return (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className="relative flex items-start group mb-8 pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className={`absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 transition-all ${isNext ? 'bg-indigo-600 border-indigo-100 scale-110 shadow-lg shadow-indigo-200' : 'bg-white border-gray-200'
                                }`}>
                                {isNext ? (
                                    <Clock size={16} className="text-white animate-pulse" />
                                ) : (
                                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                )}
                            </div>

                            {/* Content Card */}
                            <div className={`w-full p-5 rounded-2xl border transition-all ${isNext
                                ? 'bg-indigo-50/50 border-indigo-100 shadow-sm'
                                : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                                }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isNext ? 'text-indigo-700' : 'text-gray-400'}`}>
                                        {cls.time}
                                    </span>
                                    {isNext && <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NOW</span>}
                                </div>

                                <h4 className="font-bold text-gray-900 text-lg mb-1">{cls.subject}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><User size={14} /> {cls.type}</span>
                                    <span className="flex items-center gap-1"><LogOut size={14} className="rotate-90" /> {cls.room}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );

    const GlassQuickActions = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl flex flex-col text-white"
        >
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                        <FileCheck size={16} />
                    </div>
                    Quick Actions
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: "Apply Leave", icon: FileText, desc: "Sick? Wedding?", color: "from-blue-400 to-blue-600", path: '/student/requests' },
                        { label: "Gate Pass", icon: LogOut, desc: "Going out?", color: "from-orange-400 to-red-500", path: '/student/requests' },
                        { label: "Exam Results", icon: BookOpen, desc: "View Marks", color: "from-emerald-400 to-green-600", path: '/student/marks' },
                    ].map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(action.path)}
                            className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-20 transition-opacity`} />

                            <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                <action.icon size={20} className="text-white" />
                            </div>
                            <div>
                                <span className="block font-bold text-white group-hover:translate-x-1 transition-transform">{action.label}</span>
                                <span className="text-xs text-indigo-200 group-hover:text-white transition-colors">{action.desc}</span>
                            </div>
                            <ChevronRight size={16} className="ml-auto text-indigo-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Abstract Background Art */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans space-y-8 max-w-7xl mx-auto">
            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden"
            >
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome back, {studentInfo.name.split(' ')[0]}! 👋</h1>
                        <p className="text-gray-500 text-lg flex items-center gap-2">
                            {studentInfo.program} • {studentInfo.semester}
                        </p>
                    </div>
                </div>
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">{kpi.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                                <p className={`text-xs font-bold ${kpi.color} bg-opacity-10 px-2 py-0.5 rounded-full inline-block mt-2 ${kpi.bg}`}>
                                    {kpi.subtext}
                                </p>
                            </div>
                            <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
                                <kpi.icon size={24} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline takes 2/3 width */}
                <div className="lg:col-span-2">
                    <TimelineSchedule />
                </div>

                {/* Right Column (Quick Actions & Notices) */}
                <div className="space-y-8">
                    <div className="h-[400px]">
                        <GlassQuickActions />
                    </div>

                    {/* Notices Mini-Feed */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Bell className="text-orange-500" size={20} />
                                Notices
                            </h2>
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                        </div>
                        <div className="space-y-4">
                            {displayNotices.length > 0 ? (
                                displayNotices.map((notice) => (
                                    <div key={notice.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${notice.category === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {notice.category}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {formatDistanceToNow(new Date(notice.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-indigo-600 transition-colors">{notice.title}</h4>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No new notices</p>
                            )}
                        </div>
                        <button
                            onClick={() => navigate('/student/notices')}
                            className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        >
                            View All Notifications
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
