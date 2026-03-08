import React from 'react';
import { Users, CheckCircle, XCircle, Clock, Percent } from 'lucide-react';
import { useAttendance } from '../../../../context/AttendanceContext';

const AttendanceStats = () => {
    const { getStats } = useAttendance();
    const stats = getStats();

    const statCards = [
        { label: 'Total Records', value: stats.total, icon: Users, color: 'bg-blue-50 text-blue-600' },
        { label: 'Present', value: stats.present, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
        { label: 'Absent', value: stats.absent, icon: XCircle, color: 'bg-red-50 text-red-600' },
        { label: 'Avg Attendance', value: `${stats.percentage}%`, icon: Percent, color: 'bg-purple-50 text-purple-600' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => (
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

export default AttendanceStats;
