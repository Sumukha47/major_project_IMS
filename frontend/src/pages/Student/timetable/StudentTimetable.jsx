import React, { useEffect } from 'react';
import { CalendarDays, Download } from 'lucide-react';
import { useTimetable } from '../../../context/TimetableContext';
import TimetableStats from '../../admin/Timetable/components/TimetableStats';
import TimetableFilters from '../../admin/Timetable/components/TimetableFilters';
import WeekViewCalendar from '../../admin/Timetable/components/WeekViewCalendar';

const StudentTimetable = () => {
    const { filters, setFilters } = useTimetable();

    // Auto-set filters based on logged-in student's data
    useEffect(() => {
        const studentData = JSON.parse(localStorage.getItem('user') || '{}');

        if (studentData.departmentId) {
            setFilters({
                departmentId: studentData.departmentId,
                year: studentData.year || 3,
                semester: studentData.semester || 6,
                section: studentData.section || 'A'
            });
        }
    }, [setFilters]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <CalendarDays className="text-blue-600" />
                        My Timetable
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">View your class schedule</p>
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

            {/* Filters - Read-only display */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Schedule For:</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                        <span className="text-gray-500">Year:</span>
                        <span className="ml-2 font-medium">{filters.year}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Semester:</span>
                        <span className="ml-2 font-medium">{filters.semester}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Section:</span>
                        <span className="ml-2 font-medium">{filters.section}</span>
                    </div>
                </div>
            </div>

            {/* Calendar Grid - Read Only (no onEditSlot, no onAddSlot) */}
            <WeekViewCalendar
                onEditSlot={() => { }}
                onAddSlot={() => { }}
                readOnly={true}
            />
        </div>
    );
};

export default StudentTimetable;
