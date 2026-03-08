import React from 'react';
import { motion } from 'framer-motion';
import { Pin, MoreVertical, Eye, Calendar, User, Tag, ChevronRight, CheckCircle, Trash2, Archive, Ghost } from 'lucide-react';
import { useNotices } from '../../../../context/NoticeContext';

const NoticeCard = ({ notice, index, viewMode, onClick }) => {
    const { togglePin, deleteNotice, archiveNotice, approveNotice } = useNotices();

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'Urgent': return { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', accent: 'bg-rose-500' };
            case 'Important': return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', accent: 'bg-amber-500' };
            case 'Normal': return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', accent: 'bg-blue-500' };
            default: return { text: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100', accent: 'bg-gray-500' };
        }
    };

    const pStyles = getPriorityStyles(notice.priority);

    const handleAction = (e, action) => {
        e.stopPropagation();
        action();
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: index * 0.05
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={onClick}
            className={`bg-white rounded-[2rem] border border-gray-100 p-2 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group cursor-pointer relative ${notice.pinned ? 'ring-2 ring-blue-500/20' : ''
                }`}
        >
            <div className={`bg-gray-50/50 rounded-[1.8rem] p-6 h-full border border-gray-50/50 transition-colors group-hover:bg-white group-hover:border-blue-100 relative overflow-hidden`}>

                {/* Priority Indicator Stripe */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${pStyles.accent} opacity-20 group-hover:opacity-100 transition-opacity`} />

                <div className="flex justify-between items-start mb-6 relative">
                    <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${pStyles.bg} ${pStyles.text} border ${pStyles.border}`}>
                            {notice.priority}
                        </span>
                        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white text-gray-400 border border-gray-100 flex items-center gap-1.5 shadow-sm">
                            <Tag size={10} strokeWidth={3} /> {notice.category}
                        </span>
                        {notice.status !== 'Published' && (
                            <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100">
                                {notice.status}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {notice.pinned && (
                            <motion.div
                                initial={{ rotate: -45, scale: 0.5 }}
                                animate={{ rotate: 0, scale: 1 }}
                                className="text-blue-500 bg-blue-50 p-1.5 rounded-lg border border-blue-100"
                            >
                                <Pin size={14} fill="currentColor" strokeWidth={2} />
                            </motion.div>
                        )}

                        <div className="relative group/menu">
                            <button
                                className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
                            >
                                <MoreVertical size={18} />
                            </button>

                            <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-2 hidden group-hover/menu:block z-50">
                                <button onClick={(e) => handleAction(e, () => togglePin(notice.id))} className="w-full text-left px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3">
                                    <Pin size={14} /> {notice.pinned ? 'Unpin' : 'Pin to Top'}
                                </button>
                                {notice.status === 'Pending Approval' && (
                                    <button onClick={(e) => handleAction(e, () => approveNotice(notice.id))} className="w-full text-left px-5 py-2.5 text-xs font-bold text-green-600 hover:bg-green-50 flex items-center gap-3">
                                        <CheckCircle size={14} /> Approve
                                    </button>
                                )}
                                <button onClick={(e) => handleAction(e, () => archiveNotice(notice.id))} className="w-full text-left px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                    <Archive size={14} /> Archive
                                </button>
                                <div className="h-px bg-gray-50 my-1 mx-2" />
                                <button onClick={(e) => handleAction(e, () => deleteNotice(notice.id))} className="w-full text-left px-5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-3">
                                    <Trash2 size={14} /> Delete permanently
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">
                    {notice.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                    {notice.content}
                </p>

                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 border-t border-gray-100/50 pt-4 mt-auto">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 transition-colors group-hover:text-gray-600">
                            <Calendar size={14} strokeWidth={2.5} /> {notice.date}
                        </span>
                        <span className="flex items-center gap-1.5 transition-colors group-hover:text-gray-600">
                            <User size={14} strokeWidth={2.5} /> {notice.author?.name?.split(' ')[0] || 'Admin'}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 transition-colors group-hover:text-gray-600">
                            <Eye size={14} strokeWidth={2.5} /> {notice.views}
                        </span>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 text-blue-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NoticeCard;
