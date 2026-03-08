import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, User } from 'lucide-react';

const StudentHeader = ({ toggleSidebar }) => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={24} />
                </button>
                <div className="hidden md:block">
                    {/* Breadcrumbs or Page Title could go here */}
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                {/* Search Mock */}
                <div className="hidden md:flex relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile */}
                <Link to="/student/settings" className="flex items-center gap-3 pl-3 md:border-l md:border-gray-200 group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Rahul Sharma</p>
                        <p className="text-xs text-gray-500">Student</p>
                    </div>
                    <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer group-hover:shadow-lg transition-all transform group-hover:scale-105">
                        <User size={18} />
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default StudentHeader;
