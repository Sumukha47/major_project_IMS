import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { useAttendance } from '../../../context/AttendanceContext';
import AttendanceStats from './components/AttendanceStats';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceTable from './components/AttendanceTable';
import ClassRoster from './components/ClassRoster';
import TakeAttendanceModal from './components/TakeAttendanceModal';

const Attendance = () => {
    const { attendanceRecords } = useAttendance();
    const [isTakeAttendanceOpen, setIsTakeAttendanceOpen] = useState(false);
    const [activeSession, setActiveSession] = useState(null); // { class, subject, date }
    const [filters, setFilters] = useState({
        date: '',
        class: 'All',
        subject: 'All',
        status: 'All'
    });

    // Filter Logic
    const filteredRecords = attendanceRecords.filter(record => {
        const matchesDate = !filters.date || record.date === filters.date;
        const matchesClass = filters.class === 'All' || record.class === filters.class;
        const matchesSubject = filters.subject === 'All' || record.subject === filters.subject;
        const matchesStatus = filters.status === 'All' || record.status === filters.status;

        return matchesDate && matchesClass && matchesSubject && matchesStatus;
    });

    const handleStartAttendance = (sessionData) => {
        setActiveSession(sessionData);
    };

    const handleAttendanceSuccess = () => {
        setActiveSession(null);
        // Optionally show success toast
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage student attendance</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        <Download size={20} />
                        <span>Export Report</span>
                    </button>
                    <button
                        onClick={() => setIsTakeAttendanceOpen(true)}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium"
                    >
                        <Plus size={20} />
                        <span>Take Attendance</span>
                    </button>
                </div>
            </div>

            {/* Active Session (Taking Attendance) */}
            {activeSession ? (
                <ClassRoster
                    selectedClass={activeSession.class}
                    selectedSubject={activeSession.subject}
                    date={activeSession.date}
                    onCancel={() => setActiveSession(null)}
                    onSuccess={handleAttendanceSuccess}
                />
            ) : (
                <>
                    {/* Stats */}
                    <AttendanceStats />

                    {/* Filters */}
                    <AttendanceFilters filters={filters} setFilters={setFilters} />

                    {/* Table */}
                    <AttendanceTable records={filteredRecords} />
                </>
            )}

            {/* Modal */}
            <TakeAttendanceModal
                isOpen={isTakeAttendanceOpen}
                onClose={() => setIsTakeAttendanceOpen(false)}
                onStart={handleStartAttendance}
            />
        </div>
    );
};

export default Attendance;
