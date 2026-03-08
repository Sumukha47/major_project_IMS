import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, AlertCircle } from 'lucide-react';

const MarksTable = ({ students, onMarkChange, maxInternal = 20, maxExternal = 80 }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toString().includes(searchTerm)
    );

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'O': return 'bg-emerald-100 text-emerald-700';
            case 'A+': return 'bg-green-100 text-green-700';
            case 'A': return 'bg-lime-100 text-lime-700';
            case 'B': return 'bg-blue-100 text-blue-700';
            case 'C': return 'bg-yellow-100 text-yellow-700';
            case 'F': return 'bg-rose-100 text-rose-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Search Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-gray-800">Student Marks Sheet</h3>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search student..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase w-16">Roll</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase">Student</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase text-center w-32">Internal ({maxInternal})</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase text-center w-32">External ({maxExternal})</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase text-center w-24">Total</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase text-center w-20">Grade</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase w-48">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <AnimatePresence>
                            {filteredStudents.map((student) => (
                                <motion.tr
                                    key={student.id}
                                    layout
                                    className="hover:bg-blue-50/30 transition-colors group"
                                >
                                    <td className="p-4 font-mono text-xs text-gray-500">{student.rollNo}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={student.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-100" />
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                                                <p className="text-xs text-gray-400">{student.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Internal Marks Input */}
                                    <td className="p-4 text-center">
                                        <input
                                            type="number"
                                            min="0"
                                            max={maxInternal}
                                            value={student.internalMarks}
                                            onChange={(e) => onMarkChange(student.id, 'internalMarks', e.target.value)}
                                            className={`
                        w-16 p-2 text-center text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${student.internalMarks > maxInternal ? 'border-rose-400 bg-rose-50' : 'border-gray-200'}
                      `}
                                        />
                                    </td>

                                    {/* External Marks Input */}
                                    <td className="p-4 text-center">
                                        <input
                                            type="number"
                                            min="0"
                                            max={maxExternal}
                                            value={student.externalMarks}
                                            onChange={(e) => onMarkChange(student.id, 'externalMarks', e.target.value)}
                                            className={`
                        w-16 p-2 text-center text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${student.externalMarks > maxExternal ? 'border-rose-400 bg-rose-50' : 'border-gray-200'}
                      `}
                                        />
                                    </td>

                                    {/* Total & Grade (Auto-calculated) */}
                                    <td className="p-4 text-center">
                                        <span className="font-bold text-gray-800">{student.total}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${getGradeColor(student.grade)}`}>
                                            {student.grade}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <input
                                            type="text"
                                            value={student.remarks || ''}
                                            onChange={(e) => onMarkChange(student.id, 'remarks', e.target.value)}
                                            placeholder="Add note..."
                                            className="w-full text-xs border-b border-gray-100 focus:border-blue-400 focus:outline-none bg-transparent py-1 transition-colors"
                                        />
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-400 text-sm">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MarksTable;
