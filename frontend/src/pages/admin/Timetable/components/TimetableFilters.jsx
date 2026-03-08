import React from 'react';
import { Filter } from 'lucide-react';
import { useTimetable } from '../../../../context/TimetableContext';

const TimetableFilters = ({ filters, setFilters }) => {
    const { departments } = useTimetable();

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-500 mr-2">
                <Filter size={20} />
                <span className="font-medium">Filters:</span>
            </div>

            <select
                value={filters.departmentId}
                onChange={(e) => setFilters({ ...filters, departmentId: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[180px]"
            >
                <option value="">Select Department</option>
                {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
            </select>

            <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[120px]"
            >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
            </select>

            <select
                value={filters.semester}
                onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[120px]"
            >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                ))}
            </select>

            <select
                value={filters.section}
                onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[120px]"
            >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
            </select>
        </div>
    );
};

export default TimetableFilters;
