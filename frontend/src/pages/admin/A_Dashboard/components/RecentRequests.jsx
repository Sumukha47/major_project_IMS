import React, { useState } from 'react';
import { Check, X, FileText, User } from 'lucide-react';

const RecentRequests = () => {
    const [requests, setRequests] = useState([
        { id: 1, user: 'Rahul Sharma', type: 'Bonafide Certificate', date: '2 mins ago', status: 'Pending' },
        { id: 2, user: 'Priya Patel', type: 'Leave Application', date: '1 hour ago', status: 'Pending' },
        { id: 3, user: 'Amit Kumar', type: 'ID Card Replacement', date: '3 hours ago', status: 'Pending' },
        { id: 4, user: 'Sneha Gupta', type: 'Transcript Request', date: '5 hours ago', status: 'Pending' },
    ]);

    const handleAction = (id, action) => {
        // Optimistic update
        setRequests(requests.filter(r => r.id !== id));
        // API call would go here
        console.log(`Request ${id} ${action}`);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>

            <div className="space-y-4">
                {requests.length > 0 ? (
                    requests.map((req) => (
                        <div key={req.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{req.type}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <User size={10} />
                                        <span>{req.user}</span>
                                        <span>•</span>
                                        <span>{req.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleAction(req.id, 'approved')}
                                    className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                    title="Approve"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    onClick={() => handleAction(req.id, 'rejected')}
                                    className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                    title="Reject"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No pending requests
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentRequests;
