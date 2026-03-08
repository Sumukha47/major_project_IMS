import React from 'react';
import { Monitor, Smartphone, Globe, LogOut } from 'lucide-react';
import { useSecurity } from '../../../../context/SecurityContext';

const ActiveSessions = () => {
    const { sessions, terminateSession } = useSecurity();

    const getDeviceIcon = (device) => {
        if (device.toLowerCase().includes('mobile') || device.toLowerCase().includes('iphone')) return Smartphone;
        return Monitor;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Active Sessions</h2>
                <p className="text-sm text-gray-500">Manage currently active user sessions</p>
            </div>

            <div className="divide-y divide-gray-100">
                {sessions.map((session) => {
                    const DeviceIcon = getDeviceIcon(session.device);
                    return (
                        <div key={session.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <DeviceIcon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">{session.user}</h3>
                                    <p className="text-xs text-gray-500">{session.email}</p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                        <span>{session.device}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Globe size={10} /> {session.ip}</span>
                                        <span>•</span>
                                        <span>Started {session.loginTime}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => terminateSession(session.id)}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all"
                            >
                                <LogOut size={14} />
                                Terminate
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ActiveSessions;
