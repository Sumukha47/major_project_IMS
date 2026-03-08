import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, MapPin, MoreVertical, CheckCircle, FileText, FolderOpen } from 'lucide-react';

const ClassCard = ({ classData, onTakeAttendance, onViewDetails }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
        >
            {/* Header with Color Accent */}
            <div className={`h-2 ${classData.color}`}></div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-600 mb-2">
                            {classData.code} • {classData.section}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                            {classData.subject}
                        </h3>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <MoreVertical size={20} />
                    </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span>{classData.enrolled} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{classData.room}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>Next: {classData.nextLecture}</span>
                    </div>
                </div>

                {/* Attendance Sparkline (Mock) */}
                <div className="mb-6">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Attendance Rate</span>
                        <span className="font-bold text-green-600">{classData.attendance}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${classData.color}`}
                            style={{ width: `${classData.attendance}%` }}
                        ></div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => onTakeAttendance(classData)}
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100 transition-colors"
                    >
                        <CheckCircle size={18} />
                        <span>Attendance</span>
                    </button>
                    <button
                        onClick={() => onViewDetails(classData)}
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        <FileText size={18} />
                        <span>Details</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ClassCard;
