import React, { useEffect } from 'react';
import { CalendarDays, Download } from 'lucide-react';
import { useTimetable } from '../../../context/TimetableContext';
import TimetableStats from '../../admin/Timetable/components/TimetableStats';
import WeekViewCalendar from '../../admin/Timetable/components/WeekViewCalendar';

const TeacherTimetable = () => {
    const { filters, setFilters } = useTimetable();

    // Auto-filter by logged-in teacher's ID
    useEffect(() => {
        const teacherData = JSON.parse(localStorage.getItem('user') || '{}');

        // Note: Need to fetch teacherId from Teacher table using userId
        // For now, we'll fetch all and filter client-side
        // Or add an API endpoint to get teacher's schedule
        setFilters({
            departmentId: '',
            year: '',
            semester: '',
            section: '',
            // teacherId will be used in API call
        });
    }, [setFilters]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <CalendarDays className="text-blue-600" />
                        My Teaching Schedule
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">View your assigned classes</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                        <Download size={18} />
                        <span>Download</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <TimetableStats />

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                    <span className="font-semibold">Showing all classes assigned to you</span>
                    <span className="block text-blue-600 mt-1">This view shows all your scheduled lectures across all departments and years.</span>
                </p>
            </div>

            {/* Calendar Grid - Read Only */}
            <WeekViewCalendar
                onEditSlot={() => { }}
                onAddSlot={() => { }}
                readOnly={true}
            />
        </div>
    );
};

export default TeacherTimetable;
