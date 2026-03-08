import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Trash2, Check, Filter } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';

const Notifications = () => {
    const { systemNotifications, markAsRead, markAllAsRead, deleteNotification } = useSettings();
    const [filter, setFilter] = useState('all'); // all, unread, critical

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} className="text-green-500" />;
            case 'warning': return <AlertTriangle size={20} className="text-orange-500" />;
            case 'info': return <Info size={20} className="text-blue-500" />;
            default: return <Bell size={20} className="text-gray-500" />;
        }
    };

    const filteredNotifications = systemNotifications.filter(n => {
        if (filter === 'unread') return !n.read;
        if (filter === 'critical') return n.type === 'warning' || n.type === 'error';
        return true;
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Bell className="text-blue-600" />
                        Notifications
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Stay updated with system alerts and activities.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                    >
                        <Check size={16} />
                        Mark all read
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    All Notifications
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Unread
                </button>
                <button
                    onClick={() => setFilter('critical')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === 'critical' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Critical Alerts
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-md ${notification.read ? 'bg-white border-gray-100' : 'bg-blue-50/30 border-blue-100'
                                }`}
                        >
                            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 shrink-0">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`text-base font-semibold ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                                        {notification.title}
                                    </h3>
                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{notification.message}</p>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0 ml-2">
                                {!notification.read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="Mark as read"
                                    >
                                        <Check size={16} />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Bell size={24} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No notifications found</h3>
                        <p className="text-gray-500 mt-1">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
