import React from 'react';
import { Filter, Search, Tag, Flag } from 'lucide-react';
import { useNotices } from '../../../../context/NoticeContext';

const NoticeFilters = ({ filters, setFilters }) => {
    const { categories } = useNotices();

    return (
        <div className="bg-white/70 backdrop-blur-xl p-4 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/20 flex flex-col lg:flex-row gap-6 justify-between items-center px-6">
            <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                {/* Search Bar */}
                <div className="relative w-full lg:w-96 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-transparent rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-gray-900 font-semibold placeholder:text-gray-300 shadow-inner"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                        <Filter size={18} />
                    </div>

                    {/* Category Filter */}
                    <div className="relative group">
                        <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 pointer-events-none" />
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="pl-12 pr-10 py-3.5 bg-gray-50/50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold text-gray-600 appearance-none cursor-pointer shadow-sm hover:bg-gray-100"
                        >
                            <option value="All">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-gray-400 pointer-events-none" />
                    </div>

                    {/* Priority Filter */}
                    <div className="relative group">
                        <Flag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 pointer-events-none" />
                        <select
                            value={filters.priority}
                            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                            className="pl-12 pr-10 py-3.5 bg-gray-50/50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold text-gray-600 appearance-none cursor-pointer shadow-sm hover:bg-gray-100"
                        >
                            <option value="All">All Priorities</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Important">Important</option>
                            <option value="Normal">Normal</option>
                            <option value="Low">Low</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeFilters;
