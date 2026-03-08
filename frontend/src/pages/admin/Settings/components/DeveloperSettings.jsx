import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Plus, Trash2, Copy, Eye, EyeOff, Terminal, Key, Cpu, Globe } from 'lucide-react';
import { useSettings } from '../../../../context/SettingsContext';

const DeveloperSettings = () => {
    const { apiKeys, generateApiKey, deleteApiKey } = useSettings();
    const [showKey, setShowKey] = useState({});
    const [copying, setCopying] = useState(null);

    const toggleShow = (id) => {
        setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopying(id);
        setTimeout(() => setCopying(null), 2000);
    };

    return (
        <div className="p-10 max-w-5xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">API Infrastructure</h2>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Connect and extend campus systems</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => generateApiKey('Interface Key')}
                    className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-400/20"
                >
                    <Plus size={18} />
                    Provision New Key
                </motion.button>
            </div>

            {/* API Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Latency', value: '14ms', icon: Cpu, color: 'text-emerald-500' },
                    { label: 'Uptime', value: '99.98%', icon: Globe, color: 'text-blue-500' },
                    { label: 'Requests', value: '8.4k', icon: Terminal, color: 'text-purple-500' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Active Access tokens</h3>

                <div className="grid gap-6">
                    {apiKeys.map((key, idx) => (
                        <motion.div
                            key={key.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/20 group overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all">
                                        <Key size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-gray-900 tracking-tight">{key.name}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Created: {key.created} • Usage: {key.lastUsed}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteApiKey(key.id)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="relative group/key">
                                <div className="flex items-center gap-4 bg-gray-900 p-6 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
                                    <Code size={18} className="text-blue-400 shrink-0" />
                                    <code className="flex-1 text-sm font-mono text-gray-300 truncate tracking-wider">
                                        {showKey[key.id] ? key.key : '•'.repeat(32)}
                                    </code>

                                    <div className="flex items-center gap-2 relative z-10">
                                        <button
                                            onClick={() => toggleShow(key.id)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showKey[key.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                        <button
                                            onClick={() => handleCopy(key.id, key.key)}
                                            className={`w-8 h-8 flex items-center justify-center transition-all ${copying === key.id ? 'text-emerald-400' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            {copying === key.id ? <Copy size={16} className="text-emerald-400 scale-125" /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {copying === key.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -top-12 right-0 bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-lg shadow-lg"
                                        >
                                            COPIED TO CLIPBOARD
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}

                    {apiKeys.length === 0 && (
                        <div className="p-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
                                <Code size={32} />
                            </div>
                            <p className="text-lg font-black text-gray-900">No active keys</p>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Provision a key to start integrating campus tools</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Integration Banner */}
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_20%_-20%,#ffffff33,transparent)]" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                        <Terminal size={28} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black tracking-tight">Postman Documentation</h4>
                        <p className="text-xs text-blue-100/70 font-bold mt-1 uppercase tracking-widest">Auto-generated schemas for your custom integrations.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all relative z-10 hover:scale-105">View API Docs</button>
            </div>
        </div>
    );
};

export default DeveloperSettings;
