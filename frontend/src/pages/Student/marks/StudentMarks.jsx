import React, { useState } from 'react';
import {
    Award, TrendingUp, ChevronDown, ChevronUp, AlertCircle,
    BookOpen, CheckCircle, XCircle, BarChart2, MessageSquare,
    Filter, ArrowUpRight, ArrowDownRight, GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExam } from '../../../context/ExamContext';
import { useAuth } from '../../../context/AuthContext';

const StudentMarks = () => {
    const { results, loading, fetchMyResults, exams } = useExam();
    const { user } = useAuth();
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [selectedExam, setSelectedExam] = useState('All');

    React.useEffect(() => {
        fetchMyResults(selectedExam === 'All' ? '' : selectedExam);
    }, [selectedExam]);

    const toggleSubject = (id) => {
        setExpandedSubject(expandedSubject === id ? null : id);
    };

    // Group flat marks into subject-wise data
    const subjects = results.reduce((acc, current) => {
        const subjectName = current.subject.name;
        const subjectCode = current.subject.code;

        if (!acc[subjectName]) {
            acc[subjectName] = {
                id: current.subjectId,
                name: subjectName,
                code: subjectCode,
                credits: current.subject.credits || 3,
                faculty: "Assigned Faculty",
                status: current.obtainedMarks >= (current.maxMarks * 0.4) ? "Pass" : "Fail", // Basic logic
                grade: current.grade,
                overall: Math.round((current.obtainedMarks / current.maxMarks) * 100),
                assessments: [],
                trend: []
            };
        }

        acc[subjectName].assessments.push({
            type: current.exam.name,
            date: new Date(current.updatedAt).toLocaleDateString(),
            obtained: current.obtainedMarks,
            max: current.maxMarks,
            grade: current.grade,
            remarks: current.remarks
        });

        acc[subjectName].trend.push({
            name: current.exam.name.substring(0, 3), // e.g. "Mid" from "Mid-Term"
            score: Math.round((current.obtainedMarks / current.maxMarks) * 100)
        });

        return acc;
    }, {});

    const subjectsArray = Object.values(subjects);

    // Summary Stats
    const totalPercentage = subjectsArray.length > 0
        ? Math.round(subjectsArray.reduce((acc, s) => acc + s.overall, 0) / subjectsArray.length)
        : 0;

    const cgpa = (totalPercentage / 10).toFixed(1);
    const prevSemCgpa = (parseFloat(cgpa) - 0.2).toFixed(1); // Mock comparison for now

    const insights = {
        strengths: subjectsArray.filter(s => s.overall >= 80).map(s => s.name),
        improvementAreas: subjectsArray.filter(s => s.overall < 50).map(s => s.name)
    };

    const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (grade.startsWith('C')) return 'bg-amber-100 text-amber-700 border-amber-200';
        return 'bg-red-100 text-red-700 border-red-200';
    };

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 font-sans">

            {/* Premium Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
            >
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <Award className="text-amber-500" size={32} />
                        Academic Performance
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                        <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">{user?.studentProfile?.semester || 'Current'} Semester</span>
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        <span>{user?.studentProfile?.year || '2024-25'}</span>
                    </div>
                </div>

                {/* CGPA Badge */}
                <div className="relative z-10 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 flex items-center gap-6 shadow-sm group hover:shadow-md transition-all cursor-default">
                    <div>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">Overall CGPA</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{cgpa}</h2>
                            <span className="text-sm font-bold text-gray-400">/ 10</span>
                        </div>
                    </div>

                    <div className="h-12 w-px bg-gray-200 mx-2"></div>

                    <div>
                        <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 mb-1 bg-emerald-50 px-2 py-0.5 rounded-lg">
                            <TrendingUp size={16} />
                            <span>+{(cgpa - prevSemCgpa).toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium ml-1">vs Last Sem</p>
                    </div>
                </div>

                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            </motion.div>

            {/* Performance Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-emerald-50/40 rounded-3xl p-6 border border-emerald-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CheckCircle size={100} className="text-emerald-600" />
                    </div>
                    <h3 className="flex items-center gap-2 font-bold text-emerald-800 mb-4 text-lg">
                        <CheckCircle size={20} /> Areas of Strength
                    </h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                        {insights.strengths.length > 0 ? insights.strengths.map((s, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-xl shadow-sm border border-emerald-100 flex items-center gap-1.5">
                                <Award size={14} /> {s}
                            </span>
                        )) : <span className="text-emerald-600/60 text-xs font-bold italic">Keep up the hard work to unlock strengths!</span>}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-orange-50/40 rounded-3xl p-6 border border-orange-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp size={100} className="text-orange-600" />
                    </div>
                    <h3 className="flex items-center gap-2 font-bold text-orange-800 mb-4 text-lg">
                        <TrendingUp size={20} /> Focus Areas
                    </h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                        {insights.improvementAreas.length > 0 ? insights.improvementAreas.map((s, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white text-orange-700 text-sm font-bold rounded-xl shadow-sm border border-orange-100 flex items-center gap-1.5">
                                <ArrowUpRight size={14} /> {s}
                            </span>
                        )) : <span className="text-orange-600/60 text-xs font-bold italic">No critical areas identified. Excellent!</span>}
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center sticky top-0 z-20 bg-gray-50/90 backdrop-blur-md py-4 transition-all">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <BookOpen className="text-indigo-600" size={24} /> Subject Breakdown
                </h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition-all outline-none"
                        >
                            <option value="All">All Examinations</option>
                            {exams.map(exam => (
                                <option key={exam.id} value={exam.id}>{exam.name} ({exam.academicYear})</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Subjects List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">Syncing Performance Data...</p>
                    </div>
                ) : subjectsArray.length > 0 ? subjectsArray.map((subject, index) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        key={subject.id}
                        className={`bg-white rounded-2xl border transition-all overflow-hidden group ${expandedSubject === subject.id
                            ? 'border-indigo-200 shadow-lg ring-1 ring-indigo-50'
                            : 'border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100'
                            }`}
                    >
                        {/* Header Row */}
                        <div
                            onClick={() => toggleSubject(subject.id)}
                            className="p-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-5 mb-4 md:mb-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl transition-transform group-hover:scale-105 shadow-inner ${getGradeColor(subject.grade)}`}>
                                    {subject.grade}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{subject.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-0.5 flex items-center gap-2">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded textxs uppercase tracking-wide">{subject.code}</span>
                                        <span>•</span>
                                        <span>{subject.credits} Credits</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 md:gap-12 justify-between md:justify-end">
                                <div className="text-right">
                                    <span className="block font-bold text-gray-900 text-xl">{subject.overall}%</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Overall</span>
                                </div>
                                <div className="text-right">
                                    <span className={`block font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide ${subject.status === 'Pass' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                                        }`}>
                                        {subject.status}
                                    </span>
                                </div>
                                <div className={`p-2 rounded-full bg-gray-50 transition-transform duration-300 ${expandedSubject === subject.id ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-gray-400 group-hover:bg-gray-100'}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                            {expandedSubject === subject.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-indigo-50 bg-indigo-50/30"
                                >
                                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                                        {/* Assessment Table */}
                                        <div className="lg:col-span-2 space-y-4">
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                <BookOpen size={16} className="text-indigo-500" /> Assessment Breakup
                                            </h4>
                                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="bg-gray-50/50 text-gray-500 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                                                        <tr>
                                                            <th className="px-5 py-4">Assessment</th>
                                                            <th className="px-5 py-4">Marks</th>
                                                            <th className="px-5 py-4">Grade</th>
                                                            <th className="px-5 py-4">Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {subject.assessments.map((assessment, idx) => (
                                                            <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                                                                <td className="px-5 py-3.5 font-bold text-gray-900">
                                                                    {assessment.type}
                                                                    <span className="block text-[10px] text-gray-400 font-medium mt-0.5">{assessment.date}</span>
                                                                </td>
                                                                <td className="px-5 py-3.5">
                                                                    <div className="flex items-baseline gap-1">
                                                                        <span className="font-bold text-gray-900">{assessment.obtained}</span>
                                                                        <span className="text-xs text-gray-400">/{assessment.max}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3.5">
                                                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getGradeColor(assessment.grade)}`}>
                                                                        {assessment.grade}
                                                                    </span>
                                                                </td>
                                                                <td className="px-5 py-3.5 text-gray-500 text-xs font-medium italic">
                                                                    {assessment.remarks}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Faculty Comments */}
                                            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex gap-4">
                                                <MessageSquare className="text-amber-500 shrink-0 mt-1" size={20} />
                                                <div>
                                                    <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">
                                                        Faculty Remarks
                                                    </p>
                                                    <p className="text-amber-900 text-sm font-medium italic leading-relaxed">
                                                        "{subject.facultyComments}"
                                                    </p>
                                                    <p className="text-xs text-amber-600 mt-2 font-bold">— {subject.faculty}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trends Chart */}
                                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wider mb-6">
                                                <BarChart2 size={16} className="text-indigo-500" /> Performance Curve
                                            </h4>
                                            <div className="flex-1 min-h-[200px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={subject.trend}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                                        <XAxis
                                                            dataKey="name"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 600 }}
                                                            dy={10}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                                            cursor={{ stroke: '#818CF8', strokeWidth: 2, strokeDasharray: '4 4' }}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="score"
                                                            stroke="#6366F1"
                                                            strokeWidth={3}
                                                            dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#6366F1' }}
                                                            activeDot={{ r: 6, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <p className="text-xs text-center text-gray-400 mt-4 font-medium">
                                                Assessment trajectory over the semester
                                            </p>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )) : (
                    <div className="text-center p-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <GraduationCap className="mx-auto text-gray-200 mb-4" size={64} />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No results published for this selection yet.</p>
                    </div>
                )}
            </div>

            {/* Disclaimer */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-500 text-sm">
                <AlertCircle className="shrink-0 text-gray-400" size={18} />
                <p>
                    These results are provisional. Report discrepancies to the Exam Cell within 7 days.
                </p>
            </div>
        </div>
    );
};

export default StudentMarks;
