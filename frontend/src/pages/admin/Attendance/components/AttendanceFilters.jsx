import React from 'react';
import { Calendar, Filter } from 'lucide-react';
import { useAttendance } from '../../../../context/AttendanceContext';

const AttendanceFilters = ({ filters, setFilters }) => {
    const { classes, subjects } = useAttendance();

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-3 w-full">
                <div className="flex items-center gap-2 text-gray-500 mr-2">
                    <Filter size={20} />
                    <span className="text-sm font-medium">Filters:</span>
                </div>

                <div className="relative">
                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                <select
                    value={filters.class}
                    onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                >
                    <option value="All">All Classes</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select
                    value={filters.subject}
                    onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                >
                    <option value="All">All Subjects</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                >
                    <option value="All">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                </select>
            </div>
        </div>
    );
};

export default AttendanceFilters;
