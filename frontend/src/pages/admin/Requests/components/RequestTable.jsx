import React from 'react';
import { Eye } from 'lucide-react';

const RequestTable = ({ requests, onRowClick }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                            <th className="px-6 py-4">Request ID</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Requester</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr
                                    key={req.id}
                                    onClick={() => onRowClick(req)}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">{req.id}</td>
                                    <td className="px-6 py-4 text-gray-600">{req.type}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{req.subject}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{req.requester}</p>
                                            <p className="text-xs text-gray-500">{req.department}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{req.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-green-600 p-1 rounded-full hover:bg-green-50 transition-colors">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                    No requests found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestTable;
