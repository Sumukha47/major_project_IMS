import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutGrid, List, Bell, Zap, Archive, Clock } from 'lucide-react';
import { useNotices } from '../../../context/NoticeContext';
import NoticeStats from './components/NoticeStats';
import NoticeFilters from './components/NoticeFilters';
import NoticeCard from './components/NoticeCard';
import NoticeDetailDrawer from './components/NoticeDetailDrawer';
import CreateNoticeModal from './components/CreateNoticeModal';

const NoticeBoard = () => {
    const { notices } = useNotices();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('feed');
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        priority: 'All'
    });

    const filteredNotices = notices.filter(notice => {
        const matchesSearch = notice.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            notice.content.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'All' || notice.category === filters.category;
        const matchesPriority = filters.priority === 'All' || notice.priority === filters.priority;

        let matchesTab = true;
        if (activeTab === 'feed') matchesTab = notice.status === 'Published';
        if (activeTab === 'pending') matchesTab = notice.status === 'Pending Approval';
        if (activeTab === 'archived') matchesTab = notice.status === 'Archived';

        return matchesSearch && matchesCategory && matchesPriority && matchesTab;
    });

    const getTabIcon = (tab) => {
        switch (tab) {
            case 'feed': return <Zap size={16} />;
            case 'pending': return <Clock size={16} />;
            case 'archived': return <Archive size={16} />;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10"
        >
            {/* Premium Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200 rotate-3 transition-transform hover:rotate-0">
                        <Bell size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Notice Board</h1>
                        <p className="text-gray-500 font-bold flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Managing {notices.length} active announcements
                        </p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(59 130 246 / 0.1), 0 8px 10px -6px rgb(59 130 246 / 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] shadow-lg shadow-blue-200 transition-all font-black text-xs uppercase tracking-widest"
                >
                    <Plus size={20} strokeWidth={3} />
                    <span>Create Announcement</span>
                </motion.button>
            </div>

            {/* Redesigned Stats Component */}
            <NoticeStats />

            {/* Advanced Navigation & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/50 backdrop-blur-xl p-3 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {['feed', 'pending', 'archived'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all z-10 ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {getTabIcon(tab)}
                            {tab === 'feed' ? 'Live Feed' : tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="active-notice-tab"
                                    className="absolute inset-0 bg-blue-50 border border-blue-100/50 rounded-2xl -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            {/* Filtering System */}
            <NoticeFilters filters={filters} setFilters={setFilters} />

            {/* Content Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${activeTab}-${viewMode}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
                >
                    {filteredNotices.length > 0 ? (
                        filteredNotices.map((notice, index) => (
                            <NoticeCard
                                key={notice.id}
                                notice={notice}
                                index={index}
                                viewMode={viewMode}
                                onClick={() => setSelectedNotice(notice)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 text-gray-200">
                                <Bell size={48} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Quiet for now...</h3>
                            <p className="text-gray-500 font-medium mt-2">Try adjusting your filters or check another category.</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreateNoticeModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedNotice && (
                    <NoticeDetailDrawer
                        notice={selectedNotice}
                        onClose={() => setSelectedNotice(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default NoticeBoard;
