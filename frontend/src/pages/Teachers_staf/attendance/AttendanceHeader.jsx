import React, { memo } from 'react';
import { Calendar, BookOpen, Layers } from 'lucide-react';

const AttendanceHeader = ({
    classes,
    selectedClass,
    onClassChange,
    selectedDate,
    onDateChange
}) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex gap-4 flex-1 w-full md:w-auto">
                {/* Class Selector */}
                <div className="relative flex-1 md:max-w-xs">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Class & Subject</label>
                    <div className="relative">
                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={selectedClass?.id || ''}
                            onChange={(e) => {
                                const cls = classes.find(c => c.id === e.target.value);
                                onClassChange(cls);
                            }}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm font-medium text-gray-700"
                        >
                            <option value="" disabled>Select Class</option>
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name} - {cls.subject}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Date Picker */}
                <div className="relative flex-1 md:max-w-xs">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => onDateChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700"
                        />
                    </div>
                </div>
            </div>

            {/* Subject Badge (Display only) */}
            {selectedClass && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-semibold">{selectedClass.subject}</span>
                </div>
            )}
        </div>
    );
};

export default memo(AttendanceHeader);
