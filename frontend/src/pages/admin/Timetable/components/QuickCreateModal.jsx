import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useTimetable } from '../../../../context/TimetableContext';

const QuickCreateModal = ({ isOpen, onClose, initialData }) => {
    const { rooms, teachers, subjects, timeSlots, days, addSlot, updateSlot, checkConflict } = useTimetable();

    const [formData, setFormData] = useState({
        day: 'Monday',
        time: '10:00 - 11:00',
        subject: '',
        teacher: '',
        room: '',
        type: 'Lecture'
    });

    const [conflict, setConflict] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(prev => ({ ...prev, ...initialData })); // Merge if partial data passed (like day/time)
        }
    }, [initialData]);

    useEffect(() => {
        if (isOpen) {
            setConflict(checkConflict(formData));
        }
    }, [formData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData?.id) {
            updateSlot(initialData.id, formData);
        } else {
            addSlot(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData?.id ? 'Edit Time Slot' : 'Add Time Slot'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {conflict && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                            <AlertTriangle size={16} />
                            <span>Warning: Room or Teacher conflict detected!</span>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                            <select
                                value={formData.day}
                                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <select
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select
                            value={formData.subjectId || formData.subject}
                            onChange={(e) => setFormData({ ...formData, subjectId: e.target.value, subject: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                            <select
                                value={formData.teacherId || formData.teacher}
                                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value, teacher: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map(t => (
                                    <option key={t.id} value={t.id}>{t.User?.name || t.name || 'Unknown'}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                            <select
                                value={formData.room}
                                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Room</option>
                                {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Lecture"
                                    checked={formData.type === 'Lecture'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="text-blue-600"
                                />
                                Lecture
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Lab"
                                    checked={formData.type === 'Lab'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="text-blue-600"
                                />
                                Lab
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-lg shadow-blue-600/20"
                        >
                            {initialData?.id ? 'Update Slot' : 'Add Slot'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuickCreateModal;
