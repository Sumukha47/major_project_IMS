import React from 'react';
import {
    Calendar as CalendarIcon, MapPin, User, Clock,
    MoreHorizontal, ArrowRight, Video, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { studentTimetableData } from '../../../services/studentMockData';

const DayView = ({ selectedDay, onDayChange, days }) => {
    const schedule = studentTimetableData[selectedDay] || [];

    // Helper to get time progress (mock)
    const getProgress = (timeRange) => {
        // In real app, calculate based on current time vs start/end time
        return 0;
    };

    return (
        <div className="space-y-6">
            {/* Day Selector (Horizontal Scroll) */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => onDayChange(day)}
                            className={`flex-shrink-0 flex flex-col items-center justify-center p-4 min-w-[100px] rounded-xl transition-all border-2 ${selectedDay === day
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                                    : 'bg-transparent border-transparent hover:bg-gray-50 text-gray-500'
                                }`}
                        >
                            <span className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">{day.slice(0, 3)}</span>
                            <span className="text-2xl font-bold">
                                {10 + days.indexOf(day)} <span className="text-xs font-normal opacity-60">Dec</span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline View */}
            <div className="relative pl-8 md:pl-0">
                {/* Vertical Line for Desktop */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block"></div>

                {schedule.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No classes today</h3>
                        <p className="text-gray-500">Take a break or catch up on assignments!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {schedule.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative flex flex-col md:flex-row gap-6 group"
                            >
                                {/* Time Column (Desktop) */}
                                <div className="hidden md:flex flex-col items-end w-32 pt-2 gap-1 text-right pr-6 relative">
                                    <span className="text-lg font-bold text-gray-900">{item.time.split(' - ')[0]}</span>
                                    <span className="text-sm text-gray-500">{item.time.split(' - ')[1]}</span>

                                    {/* Dot on Timeline */}
                                    <div className={`absolute right-[-5px] top-4 w-2.5 h-2.5 rounded-full border-2 border-white ${item.type === 'Lecture' ? 'bg-indigo-600' :
                                            item.type === 'Lab' ? 'bg-purple-600' :
                                                item.type === 'Break' ? 'bg-orange-400' : 'bg-emerald-500'
                                        }`}></div>
                                </div>

                                {/* Mobile Time Label */}
                                <div className="md:hidden flex items-center gap-2 text-sm font-bold text-gray-500 mb-[-10px]">
                                    <Clock size={16} />
                                    {item.time}
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${item.type === 'Break' ? 'bg-orange-50/50 border-orange-100/50' : 'bg-white border-gray-100'
                                    }`}>

                                    {/* Accent Bar */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.type === 'Lecture' ? 'bg-indigo-500' :
                                            item.type === 'Lab' ? 'bg-purple-500' :
                                                item.type === 'Break' ? 'bg-orange-400' : 'bg-emerald-500'
                                        }`}></div>

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${item.type === 'Lecture' ? 'bg-indigo-100 text-indigo-700' :
                                                        item.type === 'Lab' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                                <span className="text-xs text-gray-400 hidden group-hover:inline-block transition-opacity">
                                                    Code: CS-10{idx}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {item.subject}
                                            </h3>
                                        </div>
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>

                                    {item.type !== 'Break' && (
                                        <div className="flex flex-wrap gap-4 md:gap-8">
                                            {/* Faculty */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{item.faculty}</p>
                                                    <p className="text-xs text-gray-500">Instructor</p>
                                                </div>
                                            </div>

                                            {/* Room */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <MapPin size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{item.room}</p>
                                                    <p className="text-xs text-gray-500">Location</p>
                                                </div>
                                            </div>

                                            {/* Materials Access */}
                                            <div className="flex items-center gap-2 ml-auto">
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-sm font-medium">
                                                    <BookOpen size={16} />
                                                    <span className="hidden sm:inline">Notes</span>
                                                </button>
                                                {item.type === 'Lecture' && (
                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-sm font-medium">
                                                        <Video size={16} />
                                                        <span className="hidden sm:inline">Join</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Legend / Info */}
            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-500"></span> Lecture
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span> Lab
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Activity
                </div>
            </div>
        </div>
    );
};

export default DayView;
