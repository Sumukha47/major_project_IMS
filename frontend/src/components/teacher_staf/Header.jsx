import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, CheckCircle, AlertTriangle, Info, Menu } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Header = ({ teacherProfile, toggleSidebar }) => {
    const navigate = useNavigate();
    const { systemNotifications, markAllAsRead, markAsRead } = useSettings();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    const unreadCount = systemNotifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={16} className="text-green-500" />;
            case 'warning': return <AlertTriangle size={16} className="text-orange-500" />;
            case 'info': return <Info size={16} className="text-blue-500" />;
            default: return <Bell size={16} className="text-gray-500" />;
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={24} />
                </button>
                <div className="relative w-64 md:w-96 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search students, classes..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative text-gray-500 hover:text-indigo-600 transition-colors p-1"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Mark all as read
                                </button>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {systemNotifications.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <p className="text-sm">No new notifications</p>
                                    </div>
                                ) : (
                                    systemNotifications.slice(0, 5).map((notification) => (
                                        <div
                                            key={notification.id}
                                            onClick={() => markAsRead(notification.id)}
                                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-indigo-50/30' : ''}`}
                                        >
                                            <div className="flex gap-3">
                                                <div className="mt-1 flex-shrink-0">
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 leading-tight">{notification.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notification.message}</p>
                                                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Click */}
                <div
                    onClick={() => navigate('/teacher/settings')}
                    className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group"
                >
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{teacherProfile?.name}</p>
                        <p className="text-xs text-gray-500">{teacherProfile?.designation}</p>
                    </div>
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 border border-indigo-200 group-hover:border-indigo-300 transition-colors">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
