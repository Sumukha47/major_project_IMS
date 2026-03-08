import React, { useState, useMemo } from 'react';
import {
    Search, Filter, Bookmark, CheckCheck, X, FileText,
    Calendar, AlertCircle, BookmarkCheck, ChevronRight,
    Megaphone, Hash, Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotices } from '../../../context/NoticeContext';

const StudentNotices = () => {
    const { notices, fetchNotices, loading } = useNotices();
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [filterCategory, setFilterCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewOnlyUnread, setViewOnlyUnread] = useState(false);

    // Fetch real notices on mount
    React.useEffect(() => {
        fetchNotices('Student');
    }, []);

    // Derived stats
    const unreadCount = notices.filter(n => !n.isRead).length; // Note: isRead needs backend support or local storage tracking
    const categories = ["All", ...new Set(notices.map(n => n.category))];

    // Filter Logic
    const filteredNotices = useMemo(() => {
        return notices.filter(notice => {
            const matchesCategory = filterCategory === "All" || notice.category === filterCategory;
            // Handle potentially missing fields safely
            const titleMatch = notice.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
            const deptMatch = notice.audience?.toLowerCase().includes(searchQuery.toLowerCase()) || false; // Using audience/content instead of department if missing
            const matchesSearch = titleMatch || deptMatch;

            // isRead handling is simplified for now as backend doesn't track per-user read status yet
            const matchesUnread = viewOnlyUnread ? false : true;
            return matchesCategory && matchesSearch && matchesUnread;
        });
    }, [notices, filterCategory, searchQuery, viewOnlyUnread]);

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice);
        // Mark as read when opened
        if (!notice.isRead) {
            setNotices(prev => prev.map(n => n.id === notice.id ? { ...n, isRead: true } : n));
        }
    };

    const toggleBookmark = (e, id) => {
        e.stopPropagation();
        setNotices(prev => prev.map(n => n.id === id ? { ...n, isBookmarked: !n.isBookmarked } : n));
    };

    const markAllRead = () => {
        setNotices(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-50 text-red-600 border-red-200';
            case 'Medium': return 'bg-orange-50 text-orange-600 border-orange-200';
            default: return 'bg-blue-50 text-blue-600 border-blue-200';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Exam': return <FileText size={16} />;
            case 'Event': return <Calendar size={16} />;
            case 'Academic': return <Hash size={16} />;
            default: return <Megaphone size={16} />;
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50 flex">
            {/* Main Content - Notice Board */}
            <div className={`flex-1 p-4 md:p-8 transition-all duration-300 ${selectedNotice ? 'md:pr-[450px]' : ''}`}>

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notice Board</h1>
                        <p className="text-gray-500">Stay updated with the latest announcements.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                    <Megaphone size={20} />
                                </div>
                                <div>
                                    <span className="block text-xl font-bold text-gray-900 leading-none">{unreadCount}</span>
                                    <span className="text-xs text-gray-500 font-medium uppercase">Unread</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 sticky top-0 z-20 md:z-10 bg-gray-50/95 backdrop-blur-sm py-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search notices by title or department..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${filterCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setViewOnlyUnread(!viewOnlyUnread)}
                        className={`p-3 rounded-xl border transition-colors flex-shrink-0 ${viewOnlyUnread ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-200 text-gray-400'
                            }`}
                        title="Show only unread"
                    >
                        <BookmarkCheck size={20} />
                    </button>
                </div>

                {/* Notices Feed */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredNotices.length > 0 ? filteredNotices.map((notice) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={notice.id}
                                onClick={() => handleNoticeClick(notice)}
                                className={`group bg-white rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md relative overflow-hidden ${selectedNotice?.id === notice.id ? 'ring-2 ring-indigo-500 border-transparent' : 'border-gray-200'
                                    }`}
                            >
                                {/* Unread Indicator */}
                                {!notice.isRead && (
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                                )}

                                <div className="flex justify-between items-start mb-3 pl-3">
                                    <div className="flex gap-2 flex-wrap">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${getPriorityColor(notice.priority)}`}>
                                            <AlertCircle size={12} /> {notice.priority} Priority
                                        </span>
                                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1.5">
                                            {getCategoryIcon(notice.category)} {notice.category}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => toggleBookmark(e, notice.id)}
                                            className={`p-2 rounded-full transition-colors hover:bg-gray-100 ${notice.isBookmarked ? 'text-indigo-600' : 'text-gray-400'}`}
                                        >
                                            <Bookmark size={18} fill={notice.isBookmarked ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                </div>

                                <div className="pl-3">
                                    <h3 className={`text-lg font-bold mb-1 group-hover:text-indigo-600 transition-colors text-gray-900`}>
                                        {notice.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                        {notice.content}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
                                        <div className="flex items-center gap-4">
                                            <span>By {notice.author?.name || 'Admin'}</span>
                                            <span>•</span>
                                            {/* Format date if needed, assuming backend sends readable string or ISO */}
                                            <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-indigo-500 font-medium">
                                            Read More <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <Search size={48} className="mb-4 text-gray-200" />
                                <p className="text-lg font-medium">No notices found</p>
                                <p className="text-sm">Try adjusting filters or search query</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Slide-in Detail View (Desktop) */}
            <AnimatePresence>
                {selectedNotice && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-white shadow-2xl border-l border-gray-200 flex flex-col"
                    >
                        {/* Detail Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                            <div>
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notice Details</h2>
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                    {selectedNotice.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedNotice(null)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Detail Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* Meta Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedNotice.priority)}`}>
                                    {selectedNotice.priority} Level
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                    {selectedNotice.category}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
                                    {selectedNotice.department}
                                </span>
                            </div>

                            {/* Main Body */}
                            <div className="prose prose-indigo prose-sm text-gray-600 leading-relaxed">
                                <p>{selectedNotice.content}</p>
                            </div>

                            {/* Attachments */}
                            {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Paperclip size={16} /> Attachments
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedNotice.attachments.map((file, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors cursor-pointer group">
                                                <div className="bg-white p-2 rounded-lg text-red-500 shadow-sm">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-indigo-700">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{file.size} • {file.type.toUpperCase()}</p>
                                                </div>
                                                <button className="text-xs font-bold text-indigo-600 px-3 py-1.5 bg-white rounded-lg shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-medium">
                                Published on {selectedNotice.date}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedNotice(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedNotice.isBookmarked
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Bookmark size={16} fill={selectedNotice.isBookmarked ? "currentColor" : "none"} />
                                    {selectedNotice.isBookmarked ? 'Saved' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay for Mobile */}
            {selectedNotice && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSelectedNotice(null)}
                ></div>
            )}
        </div>
    );
};

export default StudentNotices;
