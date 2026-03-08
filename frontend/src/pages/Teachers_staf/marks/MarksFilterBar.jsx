import React from 'react';
import { Filter, Calendar, Layers, BookOpen, GraduationCap, ChevronDown, ListFilter, Hash } from 'lucide-react';

const MarksFilterBar = ({
    filters,
    selected,
    onChange
}) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 sticky top-0 z-20 backdrop-blur-md bg-white/90">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Filter className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-900 block">Examination Filters</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Refine Student Selection</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                    {/* Academic Session */}
                    <div className="relative group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Academic Session</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
                            <select
                                value={selected.academicSession}
                                onChange={(e) => onChange('academicSession', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 appearance-none"
                            >
                                <option value="">Select Session</option>
                                {filters.academicSessions?.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Department */}
                    <div className="relative group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Department</label>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
                            <select
                                value={selected.department}
                                onChange={(e) => onChange('department', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 appearance-none"
                            >
                                <option value="">Select Dept</option>
                                {filters.departments?.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Student Year */}
                    <div className="relative group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Year</label>
                        <div className="relative">
                            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
                            <select
                                value={selected.studentYear}
                                onChange={(e) => onChange('studentYear', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 appearance-none"
                            >
                                <option value="">Select Year</option>
                                {filters.studentYears?.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Section */}
                    <div className="relative group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Section</label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
                            <select
                                value={selected.section}
                                onChange={(e) => onChange('section', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 appearance-none"
                            >
                                <option value="">Select Section</option>
                                {filters.sections?.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="relative group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Subject</label>
                        <div className="relative">
                            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
                            <select
                                value={selected.subjectId}
                                onChange={(e) => onChange('subjectId', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 appearance-none"
                            >
                                <option value="">Select Subject</option>
                                {filters.subjects?.filter(s => !selected.department || s.department === selected.department).map(s => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Exam Type */}
                    <div className="relative group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Exam Type</label>
                        <div className="relative">
                            <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
                            <select
                                value={selected.examType}
                                onChange={(e) => onChange('examType', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 appearance-none"
                            >
                                <option value="">Select Exam</option>
                                {filters.examTypes?.filter(e => !selected.academicSession || e.academicYear === selected.academicSession).map(e => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarksFilterBar;
