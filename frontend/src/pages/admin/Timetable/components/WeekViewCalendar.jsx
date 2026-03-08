import React from 'react';
import { Plus, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { useTimetable } from '../../../../context/TimetableContext';

const WeekViewCalendar = ({ onEditSlot, onAddSlot, readOnly = false }) => {
    const { schedule, timeSlots, days, deleteSlot } = useTimetable();

    const getSlotContent = (day, time) => {
        return schedule.find(s => s.day === day && s.time === time);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                                Day / Time
                            </th>
                            {timeSlots.map((slot, index) => (
                                <th key={index} className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-100 last:border-r-0">
                                    {slot}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {days.map((day) => (
                            <tr key={day} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 sticky left-0 bg-white border-r border-gray-200 z-10">
                                    {day}
                                </td>
                                {timeSlots.map((time, index) => {
                                    const slot = getSlotContent(day, time);
                                    return (
                                        <td key={index} className="p-2 border-r border-gray-100 last:border-r-0 h-32 align-top relative group">
                                            {slot ? (
                                                <div className={`h-full rounded-lg p-3 text-left border transition-all hover:shadow-md ${slot.type === 'Lab'
                                                    ? 'bg-purple-50 border-purple-100 text-purple-900'
                                                    : 'bg-blue-50 border-blue-100 text-blue-900'
                                                    }`}>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-bold uppercase tracking-wider opacity-70">{slot.type}</span>
                                                        {!readOnly && (
                                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                                <button onClick={() => onEditSlot(slot)} className="p-1 hover:bg-white/50 rounded">
                                                                    <Edit2 size={12} />
                                                                </button>
                                                                <button onClick={() => deleteSlot(slot.id)} className="p-1 hover:bg-white/50 rounded text-red-600">
                                                                    <Trash2 size={12} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="font-bold text-sm leading-tight mb-1">{slot.subject}</p>
                                                    <p className="text-xs opacity-80">{slot.teacher}</p>
                                                    <p className="text-xs opacity-80 mt-1 font-mono bg-white/50 inline-block px-1 rounded">{slot.room}</p>
                                                </div>
                                            ) : (
                                                !readOnly && (
                                                    <button
                                                        onClick={() => onAddSlot(day, time)}
                                                        className="w-full h-full rounded-lg border-2 border-dashed border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-center text-gray-300 hover:text-blue-400 transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Plus size={20} />
                                                    </button>
                                                )
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeekViewCalendar;
