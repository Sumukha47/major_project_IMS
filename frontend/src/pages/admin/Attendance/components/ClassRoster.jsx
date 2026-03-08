import React, { useState } from 'react';
import { Save, Check, X, Clock } from 'lucide-react';
import { useAttendance } from '../../../../context/AttendanceContext';

const ClassRoster = ({ selectedClass, selectedSubject, date, onCancel, onSuccess }) => {
    const { markAttendance } = useAttendance();

    // Mock student list for the selected class
    const [students, setStudents] = useState([
        { id: 1, name: 'Rahul Sharma', rollNo: 'CS101', status: 'Present' },
        { id: 2, name: 'Priya Patel', rollNo: 'CS102', status: 'Present' },
        { id: 3, name: 'Ankit Verma', rollNo: 'CS103', status: 'Present' },
        { id: 4, name: 'Sneha Gupta', rollNo: 'CS104', status: 'Present' },
        { id: 5, name: 'Vikram Singh', rollNo: 'CS105', status: 'Present' },
        { id: 6, name: 'Rohit Kumar', rollNo: 'CS106', status: 'Present' },
        { id: 7, name: 'Neha Singh', rollNo: 'CS107', status: 'Present' },
        { id: 8, name: 'Amit Kumar', rollNo: 'CS108', status: 'Present' },
    ]);

    const handleStatusChange = (id, status) => {
        setStudents(students.map(s => s.id === id ? { ...s, status } : s));
    };

    const handleSubmit = () => {
        const records = students.map(s => ({
            studentId: s.id,
            studentName: s.name,
            rollNo: s.rollNo,
            date,
            status: s.status,
            subject: selectedSubject,
            class: selectedClass
        }));
        markAttendance(records);
        onSuccess();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Take Attendance</h2>
                    <p className="text-sm text-gray-500">{selectedClass} • {selectedSubject} • {date}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-colors"
                    >
                        <Save size={16} />
                        Save Attendance
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                            <th className="px-6 py-4">Roll No</th>
                            <th className="px-6 py-4">Student Name</th>
                            <th className="px-6 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{student.rollNo}</td>
                                <td className="px-6 py-4 text-gray-900">{student.name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'Present')}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${student.status === 'Present'
                                                ? 'bg-green-100 text-green-700 ring-2 ring-green-500 ring-offset-1'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Check size={14} /> Present
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'Absent')}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${student.status === 'Absent'
                                                ? 'bg-red-100 text-red-700 ring-2 ring-red-500 ring-offset-1'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            <X size={14} /> Absent
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'Late')}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${student.status === 'Late'
                                                ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500 ring-offset-1'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Clock size={14} /> Late
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassRoster;
