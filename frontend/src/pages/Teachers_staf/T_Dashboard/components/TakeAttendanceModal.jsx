import React, { useState } from 'react';
import { X, Check, XCircle, Clock, Save } from 'lucide-react';

const TakeAttendanceModal = ({ isOpen, onClose, classData }) => {
    if (!isOpen) return null;

    const [students, setStudents] = useState([
        { id: 'S001', name: 'Alice Johnson', roll: 'CS-001', status: 'present' },
        { id: 'S002', name: 'Bob Smith', roll: 'CS-002', status: 'present' },
        { id: 'S003', name: 'Charlie Brown', roll: 'CS-003', status: 'absent' },
        { id: 'S004', name: 'Diana Prince', roll: 'CS-004', status: 'present' },
        { id: 'S005', name: 'Evan Wright', roll: 'CS-005', status: 'late' },
        // ... more students
    ]);

    const toggleStatus = (id, newStatus) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
    };

    const markAll = (status) => {
        setStudents(students.map(s => ({ ...s, status })));
    };

    const stats = {
        present: students.filter(s => s.status === 'present').length,
        absent: students.filter(s => s.status === 'absent').length,
        late: students.filter(s => s.status === 'late').length,
        total: students.length
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Take Attendance</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {classData?.subject || 'Computer Science'} • {classData?.class || 'CS-A'} • {new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2 text-sm font-medium">
                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded">P: {stats.present}</span>
                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded">A: {stats.absent}</span>
                            <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded">L: {stats.late}</span>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 flex gap-3 bg-white">
                    <button
                        onClick={() => markAll('present')}
                        className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        Mark All Present
                    </button>
                    <button
                        onClick={() => markAll('absent')}
                        className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        Mark All Absent
                    </button>
                </div>

                {/* Student Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className={`p-4 rounded-xl border transition-all duration-200 ${student.status === 'present' ? 'bg-white border-green-200 shadow-sm' :
                                        student.status === 'absent' ? 'bg-red-50 border-red-200' :
                                            'bg-orange-50 border-orange-200'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                        <p className="text-xs text-gray-500">{student.roll}</p>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${student.status === 'present' ? 'bg-green-500' :
                                            student.status === 'absent' ? 'bg-red-500' :
                                                'bg-orange-500'
                                        }`}>
                                        {student.status.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleStatus(student.id, 'present')}
                                        className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${student.status === 'present'
                                                ? 'bg-green-100 text-green-700 ring-1 ring-green-500'
                                                : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                                            }`}
                                    >
                                        <Check size={12} /> Present
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(student.id, 'absent')}
                                        className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${student.status === 'absent'
                                                ? 'bg-red-100 text-red-700 ring-1 ring-red-500'
                                                : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                                            }`}
                                    >
                                        <XCircle size={12} /> Absent
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(student.id, 'late')}
                                        className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${student.status === 'late'
                                                ? 'bg-orange-100 text-orange-700 ring-1 ring-orange-500'
                                                : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                                            }`}
                                    >
                                        <Clock size={12} /> Late
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-white rounded-b-xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // Save logic here
                            onClose();
                        }}
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
                    >
                        <Save size={18} />
                        Save Attendance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeAttendanceModal;
