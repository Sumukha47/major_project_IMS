import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Calendar, BarChart2, Download, Mail } from 'lucide-react';

const ClassDetailDrawer = ({ isOpen, onClose, classData }) => {
    if (!classData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{classData.subject}</h2>
                                    <p className="text-gray-500">{classData.code} • {classData.section}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Users size={20} />
                                        <span className="font-semibold">Enrolled</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{classData.enrolled}</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-2 text-green-600 mb-2">
                                        <BarChart2 size={20} />
                                        <span className="font-semibold">Avg Attendance</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{classData.attendance}%</p>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mb-8">
                                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="flex gap-3">
                                    <button className="flex-1 py-2.5 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                                        <Download size={18} /> Export Report
                                    </button>
                                    <button className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <Mail size={18} /> Email Class
                                    </button>
                                </div>
                            </div>

                            {/* Student List Preview */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4">Student Roster</h3>
                                <div className="space-y-3">
                                    {classData.students.slice(0, 5).map((student) => (
                                        <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                                                    <p className="text-xs text-gray-500">{student.rollNo}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${student.attendance >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {student.attendance}%
                                            </span>
                                        </div>
                                    ))}
                                    <button className="w-full py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors mt-2">
                                        View All Students
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ClassDetailDrawer;
