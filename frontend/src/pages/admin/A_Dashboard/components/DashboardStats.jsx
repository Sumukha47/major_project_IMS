import React from 'react';
import { Users, GraduationCap, Building2, AlertCircle, Activity, TrendingUp, TrendingDown } from 'lucide-react';

const DashboardStats = () => {
    const stats = [
        {
            label: 'Total Students',
            value: '2,543',
            icon: GraduationCap,
            color: 'bg-blue-500',
            trend: '+12%',
            trendUp: true,
            subtext: 'vs last month'
        },
        {
            label: 'Active Staff',
            value: '145',
            icon: Users,
            color: 'bg-green-500',
            trend: '+4%',
            trendUp: true,
            subtext: 'vs last month'
        },
        {
            label: 'Pending Requests',
            value: '12',
            icon: AlertCircle,
            color: 'bg-orange-500',
            trend: '-2%',
            trendUp: false,
            subtext: 'vs yesterday'
        },
        {
            label: 'System Health',
            value: '98%',
            icon: Activity,
            color: 'bg-purple-500',
            trend: 'Stable',
            trendUp: true,
            subtext: 'All systems operational'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                            <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {stat.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {stat.trend}
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-xs text-gray-400 mt-2">{stat.subtext}</p>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
