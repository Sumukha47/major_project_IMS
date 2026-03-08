import React, { useState } from 'react';
import { Save, Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';

const MarksManager = () => {
    const [examType, setExamType] = useState('mid-term');
    const [students, setStudents] = useState([
        { id: 'S001', name: 'Alice Johnson', roll: 'CS-001', marks: 45, max: 50 },
        { id: 'S002', name: 'Bob Smith', roll: 'CS-002', marks: 38, max: 50 },
        { id: 'S003', name: 'Charlie Brown', roll: 'CS-003', marks: 42, max: 50 },
        { id: 'S004', name: 'Diana Prince', roll: 'CS-004', marks: 49, max: 50 },
        { id: 'S005', name: 'Evan Wright', roll: 'CS-005', marks: 35, max: 50 },
    ]);

    const handleMarkChange = (id, value) => {
        const numValue = parseInt(value) || 0;
        setStudents(students.map(s => s.id === id ? { ...s, marks: numValue } : s));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Marks Entry</h2>
                    <p className="text-sm text-gray-500">Computer Science - Section A</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="mid-term">Mid Term Exam</option>
                        <option value="final">Final Exam</option>
                        <option value="assignment-1">Assignment 1</option>
                        <option value="assignment-2">Assignment 2</option>
                    </select>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                        <Upload size={16} /> Import CSV
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase w-24">Roll No</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Student Name</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase w-32">Marks Obtained</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase w-24">Max Marks</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase w-32">Percentage</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase w-32">Grade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student) => {
                                const percentage = ((student.marks / student.max) * 100).toFixed(1);
                                let grade = 'F';
                                let gradeColor = 'text-red-600 bg-red-50';
                                if (percentage >= 90) { grade = 'A+'; gradeColor = 'text-green-700 bg-green-50'; }
                                else if (percentage >= 80) { grade = 'A'; gradeColor = 'text-green-600 bg-green-50'; }
                                else if (percentage >= 70) { grade = 'B'; gradeColor = 'text-blue-600 bg-blue-50'; }
                                else if (percentage >= 60) { grade = 'C'; gradeColor = 'text-yellow-600 bg-yellow-50'; }
                                else if (percentage >= 50) { grade = 'D'; gradeColor = 'text-orange-600 bg-orange-50'; }

                                return (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-gray-900">{student.roll}</td>
                                        <td className="p-4 text-sm text-gray-700">{student.name}</td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                value={student.marks}
                                                onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                                max={student.max}
                                                min="0"
                                                className="w-20 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">{student.max}</td>
                                        <td className="p-4 text-sm font-medium text-gray-700">{percentage}%</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${gradeColor}`}>
                                                {grade}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MarksManager;
