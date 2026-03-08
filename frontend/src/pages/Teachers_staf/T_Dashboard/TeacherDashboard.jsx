import React, { useState } from 'react';
import { useTeacher } from '../../../context/TeacherContext';
import { Users, Clock, FileText, ArrowUpRight, Calendar, ChevronRight, MoreVertical, Play, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import TakeAttendanceModal from './components/TakeAttendanceModal';

// --- Components ---

const StatCard = ({ title, value, icon: Icon, color, trend, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
    >
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                <Icon size={24} className={`${color.replace('bg-', 'text-')}`} />
            </div>
        </div>

        {trend && (
            <div className="relative z-10 flex items-center gap-1 mt-4 text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full">
                <ArrowUpRight size={14} />
                <span>{trend}</span>
            </div>
        )}

        {/* Decor Blob */}
        <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${color} rounded-full opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}></div>
    </motion.div>
);

const TimelineSchedule = ({ schedule, onStartClass }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg h-full overflow-hidden"
    >
        <div className="flex justify-between items-center mb-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900">Live Schedule</h3>
                <p className="text-sm text-gray-500 mt-1">Your timeline for today</p>
            </div>
            <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {schedule.length} Classes
            </div>
        </div>

        <div className="relative space-y-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {schedule.map((cls, index) => {
                const isNext = index === 0; // Assuming sorted by time
                return (
                    <motion.div
                        key={cls.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8"
                    >
                        {/* Timeline Dot */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${isNext ? 'bg-indigo-600 border-indigo-100' : 'bg-white border-gray-200'
                            }`}>
                            {isNext ? (
                                <Clock size={16} className="text-white animate-pulse" />
                            ) : (
                                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                            )}
                        </div>

                        {/* Content Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-bold uppercase tracking-wider ${isNext ? 'text-indigo-600' : 'text-gray-400'}`}>
                                    {cls.time}
                                </span>
                                {isNext && <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NOW</span>}
                            </div>

                            <h4 className="font-bold text-gray-900 mb-1">{cls.subject}</h4>
                            <p className="text-sm text-gray-500 mb-4">{cls.class} • Room {cls.room}</p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onStartClass(cls)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${isNext
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Play size={14} fill={isNext ? "currentColor" : "none"} />
                                    {isNext ? 'Start Class' : 'View Details'}
                                </button>
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl flex flex-col"
    >
        <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                    <MoreVertical size={16} />
                </div>
                Quick Actions
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {[
                    { icon: CheckCircle2, label: 'Mark Attendance', desc: 'Class 3A • CSS', color: 'from-emerald-500 to-green-600' },
                    { icon: FileText, label: 'Upload Marks', desc: 'Mid-Term Results', color: 'from-blue-500 to-indigo-600' },
                    { icon: BookOpen, label: 'Lesson Plan', desc: 'Update for next week', color: 'from-purple-500 to-pink-600' }
                ].map((action, idx) => (
                    <button
                        key={idx}
                        className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left overflow-hidden"
                    >
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                            <action.icon size={20} />
                        </div>
                        <div>
                            <span className="block font-bold text-white group-hover:translate-x-1 transition-transform">{action.label}</span>
                            <span className="text-xs text-gray-400 group-hover:text-gray-300">{action.desc}</span>
                        </div>
                        <ChevronRight size={16} className="ml-auto text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                ))}
            </div>
        </div>

        {/* Abstract Background Art */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
    </motion.div>
);

const TeacherDashboard = () => {
    const { teacherProfile, stats, schedule } = useTeacher();
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const handleStartClass = (cls) => {
        setSelectedClass(cls);
        setIsAttendanceModalOpen(true);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Greeting Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-end pb-2 gap-4"
            >
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{teacherProfile?.name.split(' ')[1]}</span>
                        <span className="inline-block animate-bounce ml-2">👋</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Your academic summary is ready.</p>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm text-sm font-semibold text-gray-700">
                        <Calendar size={16} className="text-indigo-500" />
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </motion.div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Today's Classes" value={stats.todayClasses} icon={Clock} color="bg-indigo-500" trend="2 remaining" delay={0.1} />
                <StatCard title="Pending Attendance" value={stats.pendingAttendance} icon={Users} color="bg-orange-500" trend="Action Needed" delay={0.2} />
                <StatCard title="Ungraded Papers" value={stats.ungradedSubmissions} icon={FileText} color="bg-pink-500" trend="+5 new" delay={0.3} />
                <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="bg-emerald-500" delay={0.4} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline takes 2/3 width */}
                <div className="lg:col-span-2">
                    <TimelineSchedule schedule={schedule} onStartClass={handleStartClass} />
                </div>
                {/* Quick Actions takes 1/3 width */}
                <div className="h-[500px] lg:h-auto">
                    <GlassQuickActions />
                </div>
            </div>

            <TakeAttendanceModal
                isOpen={isAttendanceModalOpen}
                onClose={() => setIsAttendanceModalOpen(false)}
                classData={selectedClass}
            />
        </div>
    );
};

export default TeacherDashboard;
