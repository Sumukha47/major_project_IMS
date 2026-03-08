import React, { useState } from 'react';
import { User, Shield, Bell, Lock } from 'lucide-react';
import Profile from './Profile';

const AccountSettings = () => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Security</h2>
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Lock size={20} /></div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your account password</p>
                    </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Update
                </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Shield size={20} /></div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Two-Factor Auth</h3>
                        <p className="text-sm text-gray-500">Secure your account with 2FA</p>
                    </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Enable
                </button>
            </div>
        </div>
    </div>
);

const NotificationSettings = () => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>
        <div className="space-y-4">
            {['Email Notifications', 'Push Notifications', 'SMS Alerts', 'New Request Alerts'].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                    <span className="text-gray-700 font-medium">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            ))}
        </div>
    </div>
);

const TeacherSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const menuItems = [
        { id: 'profile', label: 'Profile Settings', icon: User, component: Profile },
        { id: 'account', label: 'Account & Security', icon: Shield, component: AccountSettings },
        { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationSettings },
    ];

    const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component || Profile;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900">Settings</h2>
                            <p className="text-xs text-gray-500">Manage your account</p>
                        </div>
                        <nav className="p-2 space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <ActiveComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherSettings;
