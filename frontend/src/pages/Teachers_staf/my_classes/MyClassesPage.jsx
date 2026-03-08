import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useClasses } from './hooks/useClasses';
import FiltersPanel from './components/FiltersPanel';
import ClassCard from './components/ClassCard';
import ClassDetailDrawer from './components/ClassDetailDrawer';
import TakeAttendanceModal from '../T_Dashboard/components/TakeAttendanceModal';

// Create a client
const queryClient = new QueryClient();

const MyClassesContent = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [filters, setFilters] = useState({
        search: '',
        semester: 'All',
        department: 'All',
    });
    const [selectedClass, setSelectedClass] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

    const { data: classes, isLoading, error } = useClasses(filters);

    const handleTakeAttendance = (cls) => {
        setSelectedClass(cls);
        setIsAttendanceModalOpen(true);
    };

    const handleViewDetails = (cls) => {
        setSelectedClass(cls);
        setIsDrawerOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
                <p className="text-gray-500 mt-2">Manage your courses, attendance, and students.</p>
            </div>

            <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">
                    Failed to load classes. Please try again.
                </div>
            ) : (
                <div className={`grid gap-6 ${viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                    }`}>
                    {classes.map((cls) => (
                        <ClassCard
                            key={cls.id}
                            classData={cls}
                            onTakeAttendance={handleTakeAttendance}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            )}

            <ClassDetailDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                classData={selectedClass}
            />

            <TakeAttendanceModal
                isOpen={isAttendanceModalOpen}
                onClose={() => setIsAttendanceModalOpen(false)}
                classData={selectedClass}
            />
        </div>
    );
};

const MyClassesPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MyClassesContent />
        </QueryClientProvider>
    );
};

export default MyClassesPage;
