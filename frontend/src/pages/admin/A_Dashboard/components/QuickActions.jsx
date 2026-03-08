import React from 'react';
import { UserPlus, FileText, Bell, Upload, Calendar, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        { label: 'Add User', icon: UserPlus, path: '/admin/users/add_user', color: 'bg-blue-50 text-blue-600' },
        { label: 'Create Notice', icon: Bell, path: '/admin/notice-board/create', color: 'bg-orange-50 text-orange-600' },
        { label: 'Upload Attendance', icon: Upload, path: '/admin/attendance', color: 'bg-green-50 text-green-600' },
        { label: 'Manage Timetable', icon: Calendar, path: '/admin/timetable', color: 'bg-purple-50 text-purple-600' },
        { label: 'View Reports', icon: FileText, path: '/admin/reports', color: 'bg-pink-50 text-pink-600' },
        { label: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-50 text-gray-600' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(action.path)}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                    >
                        <div className={`p-3 rounded-lg mb-3 transition-transform group-hover:scale-110 ${action.color}`}>
                            <action.icon size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
