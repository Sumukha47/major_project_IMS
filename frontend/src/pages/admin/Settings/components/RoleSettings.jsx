import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Edit2, Plus, ArrowRight, Command } from 'lucide-react';
import { useSettings } from '../../../../context/SettingsContext';

const RoleSettings = () => {
    const { roles } = useSettings();

    return (
        <div className="p-10 max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Access Control</h2>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Defined roles and logical permission sets</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200"
                >
                    <Plus size={18} />
                    New Authority Level
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {roles.map((role, idx) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/20 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-blue-600 hover:text-white">
                                <Edit2 size={16} />
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-8">
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg ${role.name.includes('Super') ? 'bg-gray-900 text-white' : 'bg-blue-50 text-blue-600'
                                }`}>
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">{role.name}</h3>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                    <Users size={12} />
                                    {role.users} Active Users
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Authority Bounds</h4>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.map((perm, pidx) => (
                                    <span key={pidx} className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-700 text-[10px] font-black uppercase tracking-widest rounded-xl border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/50 transition-colors">
                                        <Command size={10} className="text-blue-500" />
                                        {perm.replace('_', ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                            <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-4 transition-all">
                                View Full Policy <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Permission Logic Tip */}
            <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                        <Command size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900">Permission Hierarchy</p>
                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Permissions are additive and roles can be inherited.</p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:shadow-md transition-all">Learn More</button>
            </div>
        </div>
    );
};

export default RoleSettings;
