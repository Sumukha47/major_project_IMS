import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, Award } from 'lucide-react';
import PerformanceCharts from './PerformanceCharts';
import AttendanceCharts from './AttendanceCharts';

const TeacherAnalytics = () => {
    // Stats Cards Data
    const stats = [
        { label: 'Class Average', value: '78%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Total Students', value: '62', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Top Performer', value: '98%', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const [selectedClass, setSelectedClass] = useState('CSE-A');

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <BarChart2 className="text-blue-600" />
                            Class Analytics
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Insights into student performance and attendance.</p>
                    </div>

                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                    >
                        <option value="CSE-A">Class CSE-A</option>
                        <option value="CSE-B">Class CSE-B</option>
                        <option value="ECE-A">Class ECE-A</option>
                    </select>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <PerformanceCharts />
                    <AttendanceCharts />
                </div>
            </div>
        </div>
    );
};

export default TeacherAnalytics;
