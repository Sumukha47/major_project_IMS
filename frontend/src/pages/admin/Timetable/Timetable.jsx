import React, { useState } from 'react';
import { CalendarDays, Plus, Download } from 'lucide-react';
import { useTimetable } from '../../../context/TimetableContext';
import TimetableStats from './components/TimetableStats';
import TimetableFilters from './components/TimetableFilters';
import WeekViewCalendar from './components/WeekViewCalendar';
import QuickCreateModal from './components/QuickCreateModal';

const Timetable = () => {
    const { filters, setFilters } = useTimetable();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleAddSlot = (day, time) => {
        setModalData({ day, time, subject: '', teacher: '', room: '', type: 'Lecture' });
        setIsModalOpen(true);
    };

    const handleEditSlot = (slot) => {
        setModalData(slot);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <CalendarDays className="text-blue-600" />
                        Class Timetable
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and update class schedules</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                        <Download size={18} />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => handleAddSlot('Monday', '10:00 - 11:00')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 font-medium transition-colors"
                    >
                        <Plus size={18} />
                        <span>Add Slot</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <TimetableStats />

            {/* Filters */}
            <TimetableFilters filters={filters} setFilters={setFilters} />

            {/* Calendar Grid */}
            <WeekViewCalendar onEditSlot={handleEditSlot} onAddSlot={handleAddSlot} />

            {/* Modal */}
            <QuickCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={modalData}
            />
        </div>
    );
};

export default Timetable;
