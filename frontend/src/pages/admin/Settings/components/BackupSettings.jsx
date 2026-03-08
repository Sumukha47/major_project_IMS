import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Download, Clock, RefreshCw, HardDrive, ShieldCheck, Trash2 } from 'lucide-react';

const BackupSettings = () => {
    const [backingUp, setBackingUp] = useState(false);
    const [backups, setBackups] = useState([
        { id: 1, type: 'Automated Daily', date: 'Oct 28, 2024', time: '04:00 AM', size: '450.2 MB', health: 'Healthy' },
        { id: 2, type: 'Automated Daily', date: 'Oct 27, 2024', time: '04:00 AM', size: '448.9 MB', health: 'Healthy' },
        { id: 3, type: 'Manual Trigger', date: 'Oct 26, 2024', time: '03:15 PM', size: '445.4 MB', health: 'Healthy' },
    ]);

    const handleBackup = () => {
        setBackingUp(true);
        setTimeout(() => {
            const newBackup = {
                id: Date.now(),
                type: 'Manual Trigger',
                date: 'Oct 29, 2024',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                size: '452.1 MB',
                health: 'Healthy'
            };
            setBackups([newBackup, ...backups]);
            setBackingUp(false);
        }, 3000);
    };

    return (
        <div className="p-10 max-w-5xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Data Preservation</h2>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage snapshots and disaster recovery</p>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shadow-lg shadow-indigo-100/50">
                    <Database size={24} />
                </div>
            </div>

            {/* Main Stats Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
                <div className="absolute right-10 top-10 w-20 h-20 bg-white/10 rounded-full blur-3xl" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                    <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-white shadow-2xl shadow-indigo-900/50 rounded-[2rem] flex items-center justify-center text-indigo-600">
                            <HardDrive size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-100 uppercase tracking-[0.3em]">Operational Status</div>
                            <h3 className="text-3xl font-black mt-1">Snapshot Alpha</h3>
                            <p className="text-sm font-bold text-indigo-100/70 mt-1 uppercase tracking-widest flex items-center gap-2">
                                <Clock size={14} /> Last Sync: 4 Hours Ago
                            </p>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBackup}
                        disabled={backingUp}
                        className="px-10 py-5 bg-white text-indigo-600 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-3"
                    >
                        {backingUp ? <RefreshCw size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                        {backingUp ? 'Capturing Snapshot...' : 'Trigger Backup'}
                    </motion.button>
                </div>
            </div>

            {/* History Table-like Cards */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Snapshot Registry</h3>
                    <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck size={14} /> Redundant Storage Active
                    </div>
                </div>

                <div className="grid gap-4">
                    <AnimatePresence>
                        {backups.map((backup, idx) => (
                            <motion.div
                                key={backup.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-900/5 transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                        <Database size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-base font-black text-gray-900 tracking-tight">{backup.type}</h4>
                                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-md border border-emerald-100">{backup.health}</span>
                                        </div>
                                        <p className="text-xs font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{backup.date} • {backup.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12 mt-4 md:mt-0">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Volume Size</p>
                                        <p className="text-sm font-black text-gray-700">{backup.size}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                            <Download size={18} />
                                        </button>
                                        <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Retention Notice */}
            <div className="p-8 bg-gray-900 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-full h-full bg-[radial-gradient(circle_at_70%_120%,#4338ca55,transparent)]" />
                <div className="relative z-10">
                    <p className="text-sm font-black text-white tracking-tight">Data Retention Policy</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Snapshots are automatically purged after 30 days of inactivity.</p>
                </div>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all relative z-10 border border-white/10">Configure Policy</button>
            </div>
        </div>
    );
};

export default BackupSettings;
