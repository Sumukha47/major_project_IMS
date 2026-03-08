import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Paperclip, AlertCircle, Clock } from 'lucide-react';
import { useNotices } from '../../../context/NoticeContext';

const NoticeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notices } = useNotices();

    // Find notice by ID (handle both string and number types if necessary)
    const notice = notices.find(n => n.id.toString() === id);

    if (!notice) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-900">Notice not found</h2>
                <button
                    onClick={() => navigate('/admin/notice-board')}
                    className="mt-4 text-green-600 hover:underline"
                >
                    Back to Notice Board
                </button>
            </div>
        );
    }

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/notice-board')}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notice Details</h1>
                    <p className="text-gray-500">View full notice information</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Notice Header */}
                <div className="p-8 border-b border-gray-100">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex-1">{notice.title}</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                            {notice.priority} Priority
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{notice.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{notice.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>Posted {notice.time || 'recently'}</span>
                        </div>
                    </div>
                </div>

                {/* Notice Content */}
                <div className="p-8">
                    <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {notice.content}
                    </div>
                </div>

                {/* Attachments Section (Mock) */}
                <div className="px-8 pb-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Paperclip size={16} />
                        Attachments
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {/* Mock attachments if none exist in data */}
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                            <div className="p-2 bg-white rounded-md border border-gray-200 text-red-500">
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">Document.pdf</p>
                                <p className="text-xs text-gray-500">2.4 MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetails;
