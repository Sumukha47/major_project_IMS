import React, { useState } from 'react';
import { Search, Filter, Pin, Calendar, BookOpen, Clock, MoreVertical, Trash2 } from 'lucide-react';

const NoticeList = ({ notices, onDelete }) => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredNotices = notices.filter(notice => {
        const matchesFilter = filter === 'All' || notice.category === filter;
        const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase()) ||
            notice.content.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const categories = ['All', 'Academic', 'Events', 'Exams', 'General'];

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 p-1 bg-white rounded-lg border border-gray-200 overflow-x-auto max-w-full">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${filter === cat
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search notices..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* List */}
            <div className="grid gap-4">
                {filteredNotices.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500">No notices found.</p>
                    </div>
                ) : (
                    filteredNotices.map(notice => (
                        <div key={notice.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${notice.priority === 'Urgent' ? 'bg-red-50 text-red-600' :
                                            notice.priority === 'Important' ? 'bg-amber-50 text-amber-600' :
                                                'bg-blue-50 text-blue-600'
                                            }`}>
                                            {notice.priority}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            {notice.category}
                                        </span>
                                        {notice.pinned && (
                                            <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                                                <Pin size={12} className="fill-gray-500" /> Pinned
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{notice.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{notice.content}</p>

                                    <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{notice.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen size={14} />
                                            <span>By {notice.author?.name || 'Unknown'}</span>
                                        </div>
                                    </div>
                                </div>
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(notice.id)}
                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NoticeList;
