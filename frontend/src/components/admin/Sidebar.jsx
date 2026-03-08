import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, Building2, BookOpen,
    FileText, Calendar, Settings, LogOut, Shield, ClipboardList, CalendarDays, IndianRupee
} from 'lucide-react';

import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, isCollapsed, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'User Management', path: '/admin/users' },
        { icon: Building2, label: 'Departments', path: '/admin/departments' },
        { icon: BookOpen, label: 'Academics', path: '/admin/academics' },
        { icon: FileText, label: 'Requests', path: '/admin/requests' },
        { icon: Calendar, label: 'Attendance', path: '/admin/attendance' },
        { icon: IndianRupee, label: 'Fees', path: '/admin/fees' },
        { icon: Shield, label: 'Security', path: '/admin/security' },
        { icon: ClipboardList, label: 'Notice Board', path: '/admin/notice-board' },
        { icon: CalendarDays, label: 'Timetable', path: '/admin/timetable' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        // Add any logout logic here (clearing tokens, etc.)
        navigate('/login');
    };

    return (
        <aside
            className={`bg-green-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            <div className={`flex items-center border-b border-green-800 ${isCollapsed ? 'justify-center p-0 h-16' : 'p-6 gap-3'}`}>
                <div
                    className={`bg-white/10 p-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors ${isCollapsed ? '' : ''}`}
                    onClick={toggleSidebar}
                    title="Click to toggle"
                >
                    <img
                        src="/images/Nit_logo.png"
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                    />
                </div>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h1 className="font-bold text-lg leading-tight whitespace-nowrap">IMS Admin</h1>
                        <p className="text-xs text-green-300">NIT Nagpur</p>
                    </motion.div>
                )}
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={isCollapsed ? item.label : ''}
                            className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-lg transition-all group relative ${isActive
                                ? 'bg-green-800 text-white shadow-lg shadow-green-900/20'
                                : 'text-green-100 hover:bg-green-800/50 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={`transition-transform duration-200 ${!isCollapsed && 'group-hover:scale-110'}`} />
                            {!isCollapsed && (
                                <span className="font-medium whitespace-nowrap overflow-hidden">{item.label}</span>
                            )}
                            {/* Tooltip */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg border border-green-800/50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-green-800">
                <button
                    onClick={handleLogout}
                    title={isCollapsed ? "Logout" : ""}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 w-full rounded-lg text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-colors group relative`}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-medium whitespace-nowrap">Logout</span>}
                    {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
