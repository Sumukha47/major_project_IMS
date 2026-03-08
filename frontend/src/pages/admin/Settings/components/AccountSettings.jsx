import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, Key, Lock, Fingerprint, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSettings } from '../../../../context/SettingsContext';

const AccountSettings = () => {
    const { updatePassword } = useSettings();
    const [mfaEnabled, setMfaEnabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleUpdatePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            setStatus('error');
            setMessage('New passwords do not match');
            return;
        }

        setUpdating(true);
        setStatus(null);

        const result = await updatePassword(passwords.current, passwords.new);

        setUpdating(false);
        if (result.success) {
            setStatus('success');
            setPasswords({ current: '', new: '', confirm: '' });
            setTimeout(() => setStatus(null), 3000);
        } else {
            setStatus('error');
            setMessage(result.message);
            setTimeout(() => setStatus(null), 3000);
        }
    };

    return (
        <div className="p-10 max-w-4xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Account & Security</h2>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage your credentials and access level</p>
                </div>
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-lg shadow-rose-100/50">
                    <Shield size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Password Change Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Key size={14} />
                        </div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Credential Update</h3>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/20 space-y-8">
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Current Security Key</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-900 font-bold"
                                    placeholder="••••••••"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">New Password choice</label>
                                <input
                                    type="password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    placeholder="Create complex key"
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-900 font-bold"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Verify new entry</label>
                                <input
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    placeholder="Repeat complex key"
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-900 font-bold"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={16} /> Credential Updated
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                    >
                                        <AlertCircle size={16} /> {message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleUpdatePassword}
                                disabled={updating}
                                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-black transition-all flex items-center gap-3"
                            >
                                {updating ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Lock size={14} />}
                                Change Password
                            </motion.button>
                        </div>
                    </div>
                </section>

                {/* MFA Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
                            <Fingerprint size={16} />
                        </div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Advanced Validation</h3>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center text-blue-100 border border-white/20">
                                    <Smartphone size={32} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black tracking-tight">Multi-Factor Authentication</h4>
                                    <p className="text-xs text-blue-100/70 font-bold mt-1 max-w-xs uppercase tracking-widest leading-loose">Add an extra layer of protection to your campus node.</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setMfaEnabled(!mfaEnabled)}
                                className={`w-16 h-10 rounded-full p-1 cursor-pointer transition-colors duration-500 border-2 ${mfaEnabled ? 'bg-white border-white' : 'bg-transparent border-white/30'}`}
                            >
                                <motion.div
                                    animate={{ x: mfaEnabled ? 24 : 0 }}
                                    className={`w-6 h-6 rounded-full shadow-lg ${mfaEnabled ? 'bg-blue-600' : 'bg-white'}`}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AccountSettings;
