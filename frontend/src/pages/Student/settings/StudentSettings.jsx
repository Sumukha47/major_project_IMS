import React, { useState } from 'react';
import {
    User, Lock, Bell, Shield, Moon, Globe, LogOut, Camera,
    Mail, Phone, MapPin, ChevronRight, Smartphone, Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { studentProfileData } from '../../../services/studentMockData';
import { useSettings } from '../../../context/SettingsContext';

const StudentSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState(studentProfileData);
    const { theme, setTheme } = useSettings(); // Use global theme
    const [isEditing, setIsEditing] = useState(false);

    // Mock notification state
    const [notifications, setNotifications] = useState(studentProfileData.preferences);

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
        { id: 'account', label: 'Account & Security', icon: <Lock size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
        { id: 'preferences', label: 'App Preferences', icon: <Moon size={20} /> },
    ];

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // In a real app, API call here
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <img
                                    src={profile.avatar}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-100"
                                />
                                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition space-x-0">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                                <p className="text-gray-500">{profile.program} • {profile.semester}</p>
                                <p className="text-xs text-gray-400 font-mono mt-1">ID: {profile.id}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-indigo-600 font-medium hover:text-indigo-700"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Details'}
                                </button>
                            </div>

                            <form onSubmit={handleSaveProfile} className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={profile.name}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Residing Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                        <textarea
                                            value={profile.address}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            rows="1"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 outline-none resize-none"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="md:col-span-2 flex justify-end">
                                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition">
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                );
            case 'account':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Password & Security</h3>
                            <form className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <button className="px-5 py-2 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition">
                                    Update Password
                                </button>
                            </form>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Login History</h3>
                            <div className="space-y-3">
                                {profile.loginHistory.map((login, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                                                {login.device.includes('iPhone') ? <Smartphone size={20} /> : <Laptop size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{login.device}</p>
                                                <p className="text-xs text-gray-500">{login.location} • {login.time}</p>
                                            </div>
                                        </div>
                                        {login.active ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">Active Now</span>
                                        ) : (
                                            <button className="text-gray-400 hover:text-red-500 transition">
                                                <LogOut size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
                        <div className="space-y-6">
                            {[
                                { id: 'emails', label: 'Email Notifications', desc: 'Receive updates about exams, results, and events via email.' },
                                { id: 'alerts', label: 'Push Notifications', desc: 'Get instant alerts on your mobile device for urgent notices.' },
                                { id: 'news', label: 'Campus Newsletter', desc: 'Weekly digest of campus news and upcoming activities.' }
                            ].map((setting) => (
                                <div key={setting.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{setting.label}</p>
                                        <p className="text-sm text-gray-500">{setting.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications[setting.id] !== false}
                                            onChange={() => setNotifications({ ...notifications, [setting.id]: !notifications[setting.id] })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default: // preferences
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">App Preferences</h3>
                        <div className="space-y-6 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Light', 'Dark', 'System'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTheme(t)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium border ${theme === t
                                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                    <option>English (US)</option>
                                    <option>Hindi</option>
                                    <option>Marathi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar Menu */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm sticky top-24">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all mb-1 ${activeTab === tab.id
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {tab.icon}
                                        {tab.label}
                                    </div>
                                    {activeTab === tab.id && <ChevronRight size={16} />}
                                </button>
                            ))}

                            <div className="my-2 border-t border-gray-100"></div>

                            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                                <LogOut size={20} />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Right Content Panel */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSettings;
