import React, { useState } from 'react';
import { Shield, Activity, Users, Lock, Settings } from 'lucide-react';
import SecurityStats from './components/SecurityStats';
import AuditLogTable from './components/AuditLogTable';
import ActiveSessions from './components/ActiveSessions';
import RoleManager from './components/RoleManager';
import SecuritySettings from './components/SecuritySettings';

const Security = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Shield },
        { id: 'audit', label: 'Audit Logs', icon: Activity },
        { id: 'sessions', label: 'Active Sessions', icon: Users },
        { id: 'roles', label: 'Roles & Permissions', icon: Lock },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SecurityStats />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ActiveSessions />
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Alerts</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex gap-3">
                                        <Shield className="text-red-600 shrink-0" size={20} />
                                        <div>
                                            <p className="text-sm font-bold text-red-900">Multiple Failed Login Attempts</p>
                                            <p className="text-xs text-red-700 mt-1">IP 45.33.22.11 attempted to login 5 times in 1 minute.</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg flex gap-3">
                                        <Activity className="text-orange-600 shrink-0" size={20} />
                                        <div>
                                            <p className="text-sm font-bold text-orange-900">Unusual Traffic Spike</p>
                                            <p className="text-xs text-orange-700 mt-1">Detected high volume of requests from unknown subnet.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'audit':
                return <AuditLogTable />;
            case 'sessions':
                return <ActiveSessions />;
            case 'roles':
                return <RoleManager />;
            case 'settings':
                return <SecuritySettings />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Security Center</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor and manage system security</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 bg-white rounded-t-xl px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[500px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default Security;
