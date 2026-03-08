import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bell, Pin, Clock, TrendingUp } from 'lucide-react';
import { useNotices } from '../../../../context/NoticeContext';

const NoticeStats = () => {
    const { getStats } = useNotices();
    const stats = getStats();

    const statCards = [
        { label: 'Total Volume', value: stats.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-600/5', border: 'border-blue-100', shadow: 'shadow-blue-900/5' },
        { label: 'Unread Alerts', value: stats.unread, icon: Bell, color: 'text-rose-600', bg: 'bg-rose-600/5', border: 'border-rose-100', shadow: 'shadow-rose-900/5' },
        { label: 'High Priority', value: stats.pinned, icon: Pin, color: 'text-amber-600', bg: 'bg-amber-600/5', border: 'border-amber-100', shadow: 'shadow-amber-900/5' },
        { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-600/5', border: 'border-purple-100', shadow: 'shadow-purple-900/5' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {statCards.map((stat, index) => (
                <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`bg-white rounded-[2rem] border ${stat.border} p-6 shadow-xl ${stat.shadow} flex items-center justify-between group overflow-hidden relative transition-all duration-300`}
                >
                    <div className={`absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-0 scale-150 ${stat.color}`}>
                        <stat.icon size={80} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-gray-900 font-serif italic">{stat.value}</h3>
                            <TrendingUp size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    <div className={`relative z-10 p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 shadow-sm`}>
                        <stat.icon size={22} strokeWidth={2.5} />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default NoticeStats;
