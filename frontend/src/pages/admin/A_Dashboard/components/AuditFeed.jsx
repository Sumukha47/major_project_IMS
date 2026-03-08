import React from 'react';
import { Shield, Key, LogIn, AlertTriangle } from 'lucide-react';

const AuditFeed = () => {
    const logs = [
        { id: 1, action: 'System Login', user: 'Admin', time: 'Just now', icon: LogIn, color: 'text-blue-500 bg-blue-50' },
        { id: 2, action: 'Password Changed', user: 'Staff (John)', time: '15 mins ago', icon: Key, color: 'text-orange-500 bg-orange-50' },
        { id: 3, action: 'Failed Login Attempt', user: 'Unknown IP', time: '45 mins ago', icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
        { id: 4, action: 'Role Updated', user: 'Super Admin', time: '2 hours ago', icon: Shield, color: 'text-purple-500 bg-purple-50' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Security Audit</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">View Log</button>
            </div>

            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                {logs.map((log) => (
                    <div key={log.id} className="relative flex items-start gap-4">
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white ${log.color}`}>
                            <log.icon size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{log.action}</p>
                            <p className="text-xs text-gray-500">{log.user} • {log.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuditFeed;
