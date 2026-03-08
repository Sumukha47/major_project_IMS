import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Award, Percent } from 'lucide-react';

const StatCardButton = ({ label, value, subtext, color, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
    >
        <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
            {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.bg} ${color.text}`}>
            <Icon className="w-6 h-6" />
        </div>
    </motion.div>
);

const MarksStats = ({ stats }) => {
    const { average, highest, lowest, passPercentage } = stats;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCardButton
                label="Class Average"
                value={average}
                subtext="Out of 100"
                color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
                icon={TrendingUp}
                delay={0.1}
            />
            <StatCardButton
                label="Highest Score"
                value={highest}
                subtext="Top Performer"
                color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
                icon={Award}
                delay={0.2}
            />
            <StatCardButton
                label="Lowest Score"
                value={lowest}
                subtext="Need Support"
                color={{ bg: 'bg-rose-50', text: 'text-rose-600' }}
                icon={TrendingDown}
                delay={0.3}
            />
            <StatCardButton
                label="Pass %"
                value={`${passPercentage}%`}
                subtext="Overall Result"
                color={{ bg: 'bg-violet-50', text: 'text-violet-600' }}
                icon={Percent}
                delay={0.4}
            />
        </div>
    );
};

export default MarksStats;
