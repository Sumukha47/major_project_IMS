import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Bell, Shield, Zap, Volume2 } from 'lucide-react';
import { useSettings } from '../../../../context/SettingsContext';

const NotificationSettings = () => {
    const { notifications, toggleNotification } = useSettings();

    const sections = [
        {
            title: "Campus Communications",
            items: [
                { id: 'emailAlerts', label: 'Email Alerts', desc: 'Critical system alerts and daily digest reports.', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50' },
                { id: 'smsAlerts', label: 'SMS Notifications', desc: 'Real-time security codes and urgent emergency alerts.', icon: MessageSquare, color: 'text-rose-500', bg: 'bg-rose-50' },
            ]
        },
        {
            title: "System Awareness",
            items: [
                { id: 'newsletter', label: 'Updates & News', desc: 'Get notified about new features and campus events.', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50' },
                { id: 'securityAlerts', label: 'Security & Integrity', desc: 'Alerts for suspicious logins or permission changes.', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            ]
        }
    ];

    return (
        <div className="p-10 max-w-4xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Notification Channels</h2>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Configure your digital noise and signal</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-lg shadow-amber-100/50 relative overflow-hidden">
                    <Bell size={24} />
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-amber-500/20 rounded-full"
                    />
                </div>
            </div>

            <div className="space-y-12">
                {sections.map((section, idx) => (
                    <section key={idx} className="space-y-6">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">{section.title}</h3>
                        <div className="grid gap-4">
                            {section.items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.01 }}
                                    className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black text-gray-900 tracking-tight">{item.label}</h4>
                                            <p className="text-xs font-bold text-gray-400 mt-0.5 max-w-sm">{item.desc}</p>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => toggleNotification(item.id)}
                                        className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-500 ${notifications[item.id] ? 'bg-blue-600' : 'bg-gray-100'}`}
                                    >
                                        <motion.div
                                            animate={{ x: notifications[item.id] ? 24 : 0 }}
                                            className="w-6 h-6 rounded-full bg-white shadow-md"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))}

                {/* Extra Utility Banner */}
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-[2.5rem] p-8 text-white flex items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_30%_-20%,#3b82f633,transparent)]" />
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-blue-400">
                            <Zap size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight">Silent Schedule</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Automatic "Do Not Disturb" active after 10 PM</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10">Manage Schedule</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
