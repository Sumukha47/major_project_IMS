import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Eye, Download, CheckCircle, Clock, FileText, Share2, Printer, Bookmark } from 'lucide-react';

const NoticeDetailDrawer = ({ notice, onClose }) => {
    if (!notice) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />

            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
            >
                {/* Modern Header */}
                <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-600">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Notice Details</h2>
                            <p className="text-[10px] font-bold text-gray-400">REFERENCE: #{notice.id?.slice(0, 8)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100">
                            <Printer size={18} />
                        </button>
                        <div className="w-px h-6 bg-gray-200 mx-2" />
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
                    {/* Title and Category */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                                {notice.category}
                            </span>
                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${notice.priority === 'Urgent' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                                }`}>
                                {notice.priority} Priority
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">
                            {notice.title}
                        </h1>
                    </div>

                    {/* Meta Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Published</p>
                            <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Calendar size={14} className="text-blue-500" /> {notice.date}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Author</p>
                            <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <User size={14} className="text-purple-500" /> {notice.author?.name || 'Admin'}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Audience</p>
                            <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Bookmark size={14} className="text-amber-500" /> {notice.audience || 'All'}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Views</p>
                            <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Eye size={14} className="text-gray-400" /> {notice.views}
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] px-1">Announcement Body</h3>
                        <div className="text-lg text-gray-600 leading-relaxed font-medium bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm whitespace-pre-wrap">
                            {notice.content}
                        </div>
                    </div>

                    {/* Attachments Section */}
                    {notice.attachments && notice.attachments.length > 0 && (
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] px-1">Enclosed Files</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {notice.attachments.map((file, index) => (
                                    <div key={index} className="group p-5 bg-white border border-gray-100 rounded-[1.5rem] flex items-center justify-between hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">{file.name}</p>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">{file.size}</p>
                                            </div>
                                        </div>
                                        <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timeline History */}
                    <div className="space-y-8 pt-8 border-t border-gray-50">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Audit Trail</h3>
                        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-0 w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                                    <CheckCircle size={14} />
                                </div>
                                <p className="text-sm font-black text-gray-900">Successfully Published</p>
                                <p className="text-xs font-bold text-gray-400 mt-1">Verified and released to campus on {notice.date}</p>
                            </div>
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                                    <Clock size={14} />
                                </div>
                                <p className="text-sm font-black text-gray-900">Submission Received</p>
                                <p className="text-xs font-bold text-gray-400 mt-1">Initial draft created by system on {notice.date}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
                    <button className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 transition-all shadow-sm">
                        Mark as Read
                    </button>
                    <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                        Acknowledge
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default NoticeDetailDrawer;
