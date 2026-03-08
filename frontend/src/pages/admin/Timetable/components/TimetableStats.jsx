import React from 'react';
import { Clock, AlertTriangle, Layout, CheckCircle } from 'lucide-react';
import { useTimetable } from '../../../../context/TimetableContext';

const TimetableStats = () => {
    const { getStats } = useTimetable();
    const stats = getStats();

    const statCards = [
        { label: 'Total Hours/Week', value: stats.totalHours, icon: Clock, color: 'bg-blue-50 text-blue-600' },
        { label: 'Free Rooms', value: stats.freeRooms, icon: Layout, color: 'bg-green-50 text-green-600' },
        { label: 'Conflicts Detected', value: stats.conflicts, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
        { label: 'Schedule Status', value: 'Active', icon: CheckCircle, color: 'bg-purple-50 text-purple-600' },
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

export default TimetableStats;
