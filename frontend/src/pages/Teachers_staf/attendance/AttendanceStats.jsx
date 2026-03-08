import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle, Clock } from 'lucide-react';

const StatCard = ({ label, value, total, color, icon: Icon, delay }) => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
            <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
                    {total > 0 && <span className="text-xs font-medium text-gray-400">/ {total}</span>}
                </div>
                {total > 0 && (
                    <p className={`text-xs font-medium mt-1 ${color}`}>{percentage}%</p>
                )}
            </div>
            <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('600', '50')} ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </motion.div>
    );
};

const AttendanceStats = ({ stats }) => {
    const { total, present, absent, late } = stats;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard
                label="Total Students"
                value={total}
                total={0}
                color="text-gray-600"
                icon={Users}
                delay={0.1}
            />
            <StatCard
                label="Present"
                value={present}
                total={total}
                color="text-emerald-600"
                icon={CheckCircle}
                delay={0.2}
            />
            <StatCard
                label="Absent"
                value={absent}
                total={total}
                color="text-rose-600"
                icon={XCircle}
                delay={0.3}
            />
            <StatCard
                label="Late"
                value={late}
                total={total}
                color="text-amber-600"
                icon={Clock}
                delay={0.4}
            />
        </div>
    );
};

export default AttendanceStats;
