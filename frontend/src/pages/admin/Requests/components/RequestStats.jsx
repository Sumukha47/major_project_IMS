import React from 'react';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

const RequestStats = ({ requests }) => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'Pending').length;
    const approved = requests.filter(r => r.status === 'Approved').length;
    const rejected = requests.filter(r => r.status === 'Rejected').length;

    const stats = [
        { label: 'Total Requests', value: total, icon: FileText, color: 'bg-blue-50 text-blue-600' },
        { label: 'Pending', value: pending, icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
        { label: 'Approved', value: approved, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
        { label: 'Rejected', value: rejected, icon: XCircle, color: 'bg-red-50 text-red-600' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                        <stat.icon size={24} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestStats;
