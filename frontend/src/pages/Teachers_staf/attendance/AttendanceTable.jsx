import React, { useState, useMemo } from 'react';
import { Search, StickyNote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusPill = ({ status, onClick, selected }) => {
    const styles = {
        present: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200',
        absent: 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200',
        late: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200',
    };

    const activeStyles = {
        present: 'bg-emerald-500 text-white border-emerald-600 shadow-md transform scale-105',
        absent: 'bg-rose-500 text-white border-rose-600 shadow-md transform scale-105',
        late: 'bg-amber-500 text-white border-amber-600 shadow-md transform scale-105',
    }

    return (
        <button
            onClick={onClick}
            className={`
        px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
        ${selected ? activeStyles[status] : styles[status] + ' opacity-60 hover:opacity-100'}
      `}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
    );
};

const AttendanceTable = ({ students, onStatusChange, onNoteChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNo.toString().includes(searchTerm)
        );
    }, [students, searchTerm]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Table Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-gray-800">Student List <span className="text-gray-400 font-normal">({filteredStudents.length})</span></h3>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or roll no..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Table Header */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Roll No</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-64">Attendance Status</th>
                            <th className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-64">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <AnimatePresence>
                            {filteredStudents.map((student) => (
                                <motion.tr
                                    key={student.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    layout
                                    className="hover:bg-gray-50/50 transition-colors group"
                                >
                                    <td className="p-4 font-mono text-sm text-gray-600">#{student.rollNo.toString().padStart(2, '0')}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full bg-gray-100" />
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                                                <p className="text-xs text-gray-400">ID: {student.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            {['present', 'absent', 'late'].map((status) => (
                                                <StatusPill
                                                    key={status}
                                                    status={status}
                                                    selected={student.status === status}
                                                    onClick={() => onStatusChange(student.id, status)}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="relative">
                                            <StickyNote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                            <input
                                                type="text"
                                                value={student.note || ''}
                                                onChange={(e) => onNoteChange(student.id, e.target.value)}
                                                placeholder="Add note..."
                                                className="w-full pl-9 pr-3 py-1.5 text-xs bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-300 focus:bg-white rounded transition-all focus:outline-none placeholder-gray-300"
                                            />
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-400 text-sm">
                                    No students found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceTable;
