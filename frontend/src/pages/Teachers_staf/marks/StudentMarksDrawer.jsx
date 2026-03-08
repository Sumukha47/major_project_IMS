import React from 'react';
import { X, TrendingUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentMarksDrawer = ({ student, isOpen, onClose }) => {
    if (!student) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-800">Student Details</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Profile Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <img
                                    src={student.avatar}
                                    alt={student.name}
                                    className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-md"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                                    <p className="text-sm text-gray-500">Roll No: #{student.rollNo}</p>
                                </div>
                            </div>

                            {/* Current Status Card */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-blue-800">Current Exam Status</span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${student.status === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                        {student.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-bold text-blue-900">{student.total}</span>
                                    <span className="text-sm text-blue-600 mb-1">/ 100</span>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-blue-500 uppercase">Internal</p>
                                        <p className="font-semibold text-blue-900">{student.internalMarks} / {student.maxInternal}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-500 uppercase">External</p>
                                        <p className="font-semibold text-blue-900">{student.externalMarks} / {student.maxExternal}</p>
                                    </div>
                                </div>
                            </div>

                            {/* History Timeline */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Performance History
                                </h4>
                                <div className="space-y-4">
                                    {student.history?.map((record, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-md border border-gray-200">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{record.exam}</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{record.total}</span>
                                        </div>
                                    ))}
                                    {(!student.history || student.history.length === 0) && (
                                        <p className="text-sm text-gray-400 italic">No previous records found.</p>
                                    )}
                                </div>
                            </div>

                            {/* Remarks */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Teacher Remarks</h4>
                                <textarea
                                    className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Add detailed feedback for this student..."
                                    defaultValue={student.remarks}
                                ></textarea>
                                <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Save Remarks
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StudentMarksDrawer;
