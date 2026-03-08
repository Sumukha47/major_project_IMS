import React from 'react';
import { Shield, AlertTriangle, Users, Lock } from 'lucide-react';
import { useSecurity } from '../../../../context/SecurityContext';

const SecurityStats = () => {
    const { getStats } = useSecurity();
    const stats = getStats();

    const statCards = [
        { label: 'Active Sessions', value: stats.activeSessions, icon: Users, color: 'bg-blue-50 text-blue-600' },
        { label: 'Failed Logins (24h)', value: stats.failedLogins, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
        { label: 'Critical Alerts', value: stats.criticalAlerts, icon: Shield, color: 'bg-orange-50 text-orange-600' },
        { label: 'MFA Adoption', value: `${stats.mfaAdoption}%`, icon: Lock, color: 'bg-green-50 text-green-600' },
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

export default SecurityStats;
