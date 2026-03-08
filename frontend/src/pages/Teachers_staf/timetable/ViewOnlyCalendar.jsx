import React from 'react';

// Accept schedule and timeSlots as props so it remains a pure presentation component
// or we can consume context inside if we want it coupled. 
// Given the existing Admin one consumes context, let's keep this one accepting props for flexibility 
// or match patterns. 
// Actually, to ensure it "reflects same timetable", consuming context is safer.
// But the Admin `WeekViewCalendar` consumes context. 
// Let's modify this to accept data passed from parent who consumes context, 
// OR consume context directly. 
// TeacherTimetable will fetch from context and pass down.

const ViewOnlyCalendar = ({ schedule, timeSlots, days }) => {

    // Fallback if data not ready
    if (!timeSlots || !days) return null;

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
                                        <td key={index} className="p-2 border-r border-gray-100 last:border-r-0 h-32 align-top relative">
                                            {slot ? (
                                                <div className={`h-full rounded-lg p-3 text-left border ${slot.type === 'Lab'
                                                    ? 'bg-purple-50 border-purple-100 text-purple-900'
                                                    : 'bg-blue-50 border-blue-100 text-blue-900'
                                                    }`}>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-bold uppercase tracking-wider opacity-70">{slot.type}</span>
                                                    </div>
                                                    <p className="font-bold text-sm leading-tight mb-1">{slot.subject}</p>
                                                    <p className="text-xs opacity-80">{slot.teacher}</p>
                                                    <p className="text-xs opacity-80 mt-1 font-mono bg-white/50 inline-block px-1 rounded">{slot.room}</p>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-200 text-xs">
                                                    -
                                                </div>
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

export default ViewOnlyCalendar;
