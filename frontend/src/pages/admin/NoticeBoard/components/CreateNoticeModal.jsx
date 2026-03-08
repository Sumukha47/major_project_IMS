import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Calendar, FileText, Tag, Flag, Users, Send } from 'lucide-react';
import { useNotices } from '../../../../context/NoticeContext';

const CreateNoticeModal = ({ isOpen, onClose }) => {
    const { addNotice, categories } = useNotices();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: categories[0] || 'General',
        priority: 'Normal',
        audience: 'All',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNotice(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white"
            >
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <Send size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Post Announcement</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Reach the whole campus</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                    <div className="space-y-6">
                        {/* Title Input */}
                        <div className="space-y-2 group">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                                <FileText size={12} className="text-blue-500" />
                                Announcement Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-900 font-bold placeholder:text-gray-300"
                                placeholder="What's happening?"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category Select */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                                    <Tag size={12} className="text-purple-500" />
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-sm font-bold text-gray-600 cursor-pointer"
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            {/* Priority Select */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                                    <Flag size={12} className="text-rose-500" />
                                    Priority Level
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-sm font-bold text-gray-600 cursor-pointer"
                                >
                                    <option>Normal</option>
                                    <option>Important</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                        </div>

                        {/* Audience Select */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                                <Users size={12} className="text-amber-500" />
                                Target Audience
                            </label>
                            <select
                                value={formData.audience}
                                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-sm font-bold text-gray-600 cursor-pointer"
                            >
                                <option value="All">Everyone (Campus-wide)</option>
                                <option value="Student">Students Only</option>
                                <option value="Teacher">Faculty Members Only</option>
                            </select>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                                <FileText size={12} className="text-gray-400" />
                                Detailed Content
                            </label>
                            <textarea
                                required
                                rows="5"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-6 py-6 bg-gray-50 border border-transparent rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-medium placeholder:text-gray-300 resize-none"
                                placeholder="Describe the announcement details here..."
                            ></textarea>
                        </div>

                        {/* Attachment Area */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                                <Upload size={12} />
                                Attachments
                            </label>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="border-2 border-dashed border-gray-100 bg-gray-50/50 rounded-[2rem] p-8 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500/30 hover:bg-blue-50/30 hover:text-blue-500 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-3">
                                    <Upload size={20} />
                                </div>
                                <span className="text-sm font-black uppercase tracking-widest">Select Files</span>
                                <span className="text-xs font-bold text-gray-300 mt-1">PDF, Images or Documents (Max 10MB)</span>
                            </motion.div>
                        </div>
                    </div>
                </form>

                <div className="p-8 bg-gray-50/30 border-t border-gray-100 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        Save as Draft
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        onClick={handleSubmit}
                        className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
                    >
                        Publish Notice
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateNoticeModal;
