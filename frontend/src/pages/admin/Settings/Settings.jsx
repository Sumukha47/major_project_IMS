import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Bell, Building, Users, Database, Code, FileText, Settings as SettingsIcon, ChevronRight, Globe } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import InstitutionSettings from './components/InstitutionSettings';
import RoleSettings from './components/RoleSettings';
import BackupSettings from './components/BackupSettings';
import DeveloperSettings from './components/DeveloperSettings';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const menuItems = [
        { id: 'profile', label: 'Personal Profile', sub: 'Public identity and avatar', icon: User, color: 'text-blue-500', bg: 'bg-blue-50', component: ProfileSettings },
        { id: 'account', label: 'Account & Security', sub: 'Password and authentication', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-50', component: AccountSettings },
        { id: 'notifications', label: 'Notifications', sub: 'Preferences and alerts', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50', component: NotificationSettings },
        { id: 'institution', label: 'Institution Info', sub: 'Branding and location', icon: Building, color: 'text-emerald-500', bg: 'bg-emerald-50', component: InstitutionSettings },
        { id: 'roles', label: 'Roles & Permissions', sub: 'Access control system', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50', component: RoleSettings },
        { id: 'backup', label: 'Backup & Restore', sub: 'Database snapshots', icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-50', component: BackupSettings },
        { id: 'developer', label: 'Developer / API', sub: 'Webhooks and keys', icon: Code, color: 'text-gray-500', bg: 'bg-gray-50', component: DeveloperSettings },
        { id: 'logs', label: 'Audit Logs', sub: 'System activity history', icon: FileText, color: 'text-cyan-500', bg: 'bg-cyan-50', component: () => <div className="p-12 text-center text-gray-400 font-bold">Audit Logs Coming Soon</div> },
    ];

    const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component || ProfileSettings;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-140px)]"
        >
            {/* Redesigned Glass Sidebar */}
            <div className="w-full lg:w-80 shrink-0 space-y-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-xl shadow-gray-200/20 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <SettingsIcon size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Settings</h2>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Configuration Panel</p>
                        </div>
                    </div>

                    <nav className="p-4 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.id === 'institution') {
                                        window.open('https://nit.edu.in', '_blank');
                                    } else {
                                        setActiveTab(item.id);
                                    }
                                }}
                                className={`w-full group flex items-center justify-between p-4 rounded-3xl transition-all duration-300 ${activeTab === item.id
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200'
                                    : 'hover:bg-gray-50 text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                <div className="flex items-center gap-4 text-left">
                                    <div className={`p-2 rounded-xl transition-colors ${activeTab === item.id ? 'bg-white/20' : item.bg
                                        }`}>
                                        <item.icon size={20} strokeWidth={2.5} className={activeTab === item.id ? 'text-white' : item.color} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black tracking-tight">{item.label}</p>
                                        <p className={`text-[10px] font-bold ${activeTab === item.id ? 'text-blue-100' : 'text-gray-400'}`}>{item.sub}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.id === 'institution' && <Globe size={14} className="opacity-40" />}
                                    <ChevronRight size={16} className={`transition-transform duration-300 ${activeTab === item.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                        }`} />
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                    <h3 className="text-lg font-black tracking-tight relative z-10">Premium Control</h3>
                    <p className="text-xs text-gray-400 mt-2 font-medium leading-relaxed relative z-10">Need help with advanced configurations? Check our developer documentation.</p>
                    <button className="mt-6 text-xs font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all relative z-10">Read Docs</button>
                </div>
            </div>

            {/* Redesigned Glass Content Area */}
            <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-2xl shadow-gray-200/20 overflow-hidden min-h-[600px] flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 overflow-y-auto no-scrollbar"
                    >
                        <ActiveComponent />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Settings;
