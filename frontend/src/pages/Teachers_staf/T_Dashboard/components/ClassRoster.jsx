import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, FileText, CheckCircle, XCircle } from 'lucide-react';

const ClassRoster = () => {
    const [students, setStudents] = useState([
        { id: 'S001', name: 'Alice Johnson', roll: 'CS-001', attendance: '85%', status: 'Present', email: 'alice@nit.edu' },
        { id: 'S002', name: 'Bob Smith', roll: 'CS-002', attendance: '92%', status: 'Present', email: 'bob@nit.edu' },
        { id: 'S003', name: 'Charlie Brown', roll: 'CS-003', attendance: '78%', status: 'Absent', email: 'charlie@nit.edu' },
        { id: 'S004', name: 'Diana Prince', roll: 'CS-004', attendance: '95%', status: 'Present', email: 'diana@nit.edu' },
        { id: 'S005', name: 'Evan Wright', roll: 'CS-005', attendance: '88%', status: 'Late', email: 'evan@nit.edu' },
    ]);

    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6">
            {/* Main Roster List */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Class Roster</h2>
                        <p className="text-sm text-gray-500">Computer Science - Section A</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Roll No</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Attendance</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status (Today)</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student) => (
                                <tr
                                    key={student.id}
                                    className="hover:bg-indigo-50/30 transition-colors cursor-pointer"
                                    onClick={() => setSelectedStudent(student)}
                                >
                                    <td className="p-4 text-sm font-medium text-gray-900">{student.roll}</td>
                                    <td className="p-4 text-sm text-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
                                                {student.name.charAt(0)}
                                            </div>
                                            {student.name}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${parseInt(student.attendance) > 80 ? 'bg-green-500' : 'bg-orange-500'}`}
                                                    style={{ width: student.attendance }}
                                                ></div>
                                            </div>
                                            <span className="text-xs">{student.attendance}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.status === 'Present' ? 'bg-green-100 text-green-800' :
                                                student.status === 'Absent' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-indigo-600 p-1">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Student Details Drawer */}
            {selectedStudent && (
                <div className="w-80 bg-white border-l border-gray-200 shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                        <div className="text-center w-full">
                            <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto flex items-center justify-center text-indigo-600 text-2xl font-bold mb-3 border-4 border-white shadow-sm">
                                {selectedStudent.name.charAt(0)}
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">{selectedStudent.name}</h3>
                            <p className="text-sm text-gray-500">{selectedStudent.roll}</p>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedStudent(null); }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <XCircle size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 overflow-y-auto flex-1">
                        <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Contact Info</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={16} className="text-gray-400" />
                                    {selectedStudent.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone size={16} className="text-gray-400" />
                                    +91 98765 43210
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Performance</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-center">
                                    <p className="text-xs text-gray-500">Attendance</p>
                                    <p className="text-lg font-bold text-gray-900">{selectedStudent.attendance}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-center">
                                    <p className="text-xs text-gray-500">Avg Grade</p>
                                    <p className="text-lg font-bold text-gray-900">A-</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Actions</h4>
                            <div className="space-y-2">
                                <button className="w-full py-2 px-4 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
                                    <FileText size={16} />
                                    View Full Report
                                </button>
                                <button className="w-full py-2 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                    <Mail size={16} />
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassRoster;
