import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, User, Calendar, BookOpen,
    FileText, MessageSquare, Briefcase, Settings, LogOut, IndianRupee
} from 'lucide-react';
import { motion } from 'framer-motion';

const StudentSidebar = ({ isOpen, isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
        { icon: Calendar, label: 'Timetable', path: '/student/timetable' },
        { icon: User, label: 'Attendance', path: '/student/attendance' },
        { icon: BookOpen, label: 'Marks', path: '/student/marks' },
        { icon: IndianRupee, label: 'Fees', path: '/student/fees' },
        { icon: MessageSquare, label: 'Notices', path: '/student/notices' },
        { icon: Briefcase, label: 'Resources', path: '/student/resources' },
        { icon: FileText, label: 'Requests', path: '/student/requests' },
        { icon: Settings, label: 'Settings', path: '/student/settings' },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <aside
            className={`fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
            ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            <div className={`h-16 flex items-center border-b border-gray-100 ${isCollapsed ? 'justify-center p-0' : 'px-6 gap-3'}`}>
                <img src="/images/Nit_logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h1 className="font-bold text-gray-900 leading-tight whitespace-nowrap">Student Portal</h1>
                        <p className="text-xs text-gray-500">NIT Nagpur</p>
                    </motion.div>
                )}
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                {!isCollapsed && (
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2 transition-opacity">Menu</p>
                )}
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={isCollapsed ? item.label : ''}
                        className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3'} rounded-xl transition-all duration-200 group relative ${isActive
                            ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <item.icon size={20} className={`transition-transform duration-200 ${!isCollapsed && 'group-hover:scale-110'}`} />
                        {!isCollapsed && (
                            <span className="whitespace-nowrap overflow-hidden transition-all">{item.label}</span>
                        )}
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 w-full rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors font-medium group`}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;
