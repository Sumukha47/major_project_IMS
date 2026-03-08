import React from 'react';
import { Save, Send, CheckSquare, Square, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ActionBar = ({
    onSaveDraft,
    onSubmit,
    onMarkAllPresent,
    onClearAll,
    isSubmitting,
    hasUnsavedChanges
}) => {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-gray-200 p-4 shadow-lg z-20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                    onClick={onMarkAllPresent}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all"
                >
                    <CheckSquare className="w-4 h-4" />
                    Mark All Present
                </button>
                <button
                    onClick={onClearAll}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all"
                >
                    <RotateCw className="w-4 h-4" />
                    Reset
                </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                {hasUnsavedChanges && (
                    <span className="text-xs text-amber-600 font-medium hidden sm:inline-block animate-pulse">
                        Unsaved Changes
                    </span>
                )}
                <button
                    onClick={onSaveDraft}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                >
                    <Save className="w-4 h-4" />
                    Save Draft
                </button>
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                    Submit Attendance
                </button>
            </div>
        </motion.div>
    );
};

export default ActionBar;
