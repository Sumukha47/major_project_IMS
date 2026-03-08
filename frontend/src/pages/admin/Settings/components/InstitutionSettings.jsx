import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Globe, Mail, MapPin, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSettings } from '../../../../context/SettingsContext';

const InstitutionSettings = () => {
    const { institution, updateInstitution } = useSettings();
    const [formData, setFormData] = useState(institution);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        setFormData(institution);
    }, [institution]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const result = await updateInstitution(formData);

        setLoading(false);
        if (result.success) {
            setStatus('success');
            setTimeout(() => setStatus(null), 3000);
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="p-10 max-w-4xl mx-auto space-y-10">
            {/* Header section with branding feel */}
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] border-2 border-dashed border-blue-200 flex items-center justify-center text-blue-500 overflow-hidden relative group cursor-pointer">
                    <Building size={32} />
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <p className="text-[10px] font-black uppercase text-blue-600">Change</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Institution Details</h2>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Global branding and contact information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Institute Name - Full Width */}
                <div className="md:col-span-2 space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                        <Building size={12} className="text-blue-500" />
                        Full Institution Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-900 font-bold placeholder:text-gray-300"
                        placeholder="e.g. Nagpur Institute of Technology"
                    />
                </div>

                {/* Address - Full Width */}
                <div className="md:col-span-2 space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                        <MapPin size={12} className="text-rose-500" />
                        Physical Address
                    </label>
                    <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-medium placeholder:text-gray-300 resize-none"
                        placeholder="Enter the full campus address..."
                    />
                </div>

                {/* Email */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                        <Mail size={12} className="text-amber-500" />
                        Official Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-900 font-bold placeholder:text-gray-300"
                        placeholder="info@institute.edu"
                    />
                </div>

                {/* Website */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                        <Globe size={12} className="text-emerald-500" />
                        Web Domain
                    </label>
                    <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-900 font-bold placeholder:text-gray-300"
                        placeholder="www.institute.edu"
                    />
                </div>

                {/* Save Section */}
                <div className="md:col-span-2 pt-6 flex items-center justify-between">
                    <div>
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
                                >
                                    <CheckCircle2 size={18} />
                                    Settings saved permanently
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-center gap-2 text-rose-600 font-bold text-sm"
                                >
                                    <AlertCircle size={18} />
                                    Failed to sync with database
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save size={18} />
                                Update Configuration
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default InstitutionSettings;
