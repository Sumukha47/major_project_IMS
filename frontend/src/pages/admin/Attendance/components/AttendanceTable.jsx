import React from 'react';

const AttendanceTable = ({ records }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-700 border-green-200';
            case 'Absent': return 'bg-red-100 text-red-700 border-red-200';
            case 'Late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Roll No</th>
                            <th className="px-6 py-4">Student Name</th>
                            <th className="px-6 py-4">Class</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {records.length > 0 ? (
                            records.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-600 text-sm">{record.date}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{record.rollNo}</td>
                                    <td className="px-6 py-4 text-gray-900">{record.studentName}</td>
                                    <td className="px-6 py-4 text-gray-600">{record.class}</td>
                                    <td className="px-6 py-4 text-gray-600">{record.subject}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    No attendance records found.
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
