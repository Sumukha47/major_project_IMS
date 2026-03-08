import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTeacher } from '../context/TeacherContext';
import Sidebar from '../components/teacher_staf/Sidebar';
import Header from '../components/teacher_staf/Header';

const TeacherLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile
    const [isCollapsed, setIsCollapsed] = useState(false); // Desktop
    const { teacherProfile } = useTeacher();

    const toggleSidebar = () => {
        if (window.innerWidth >= 768) {
            setIsCollapsed(!isCollapsed);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 relative">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                toggleSidebar={toggleSidebar}
            />

            <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                <Header teacherProfile={teacherProfile} toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default TeacherLayout;
