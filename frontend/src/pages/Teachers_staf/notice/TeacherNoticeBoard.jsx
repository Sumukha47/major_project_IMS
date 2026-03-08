import React, { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { useNotices } from '../../../context/NoticeContext';
import NoticeList from './NoticeList';
import CreateNoticeModal from './CreateNoticeModal';
import { toast } from 'react-toastify';

const TeacherNoticeBoard = () => {
    const { notices, addNotice, deleteNotice } = useNotices();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my'

    const categories = ['General', 'Exam', 'Event', 'Holiday', 'Urgent'];

    const handleCreateNotice = async (formData) => {
        // Map frontend form data to backend expected format
        const response = await addNotice({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            audience: formData.target // Mapping 'target' to 'audience'
        });

        if (response.success) {
            toast.success("Notice published successfully!");
            // setIsModalOpen(false) is handled by the modal's internal logic/props usually, 
            // but here checking if we need to close it manually or if the modal calls onSubmit then closes.
            // The modal calls onSubmit then setFormData then onClose. So we are good.
        } else {
            toast.error(response.message || "Failed to publish notice");
        }
    };

    // Filter logic
    // Backend returns 'author' object included. We need to check if the current user is the author.
    // Since we don't have user ID readily avail in this component without useAuth, 
    // we might rely on the backend to filter 'my' notices or just filter by author name/role if available.
    // For now, let's just show all.
    const displayedNotices = notices;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Bell className="text-blue-600" />
                            Notice Board
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Stay updated with institute announcements.</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold transition-all shadow-md shadow-blue-200 hover:shadow-lg"
                    >
                        <Plus size={20} />
                        <span>Post Notice</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'all'
                            ? 'bg-gray-100 text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        All Notices
                    </button>
                    {/* <button
                        onClick={() => setActiveTab('my')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'my'
                                ? 'bg-gray-100 text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        My Notices
                    </button> */}
                </div>

                {/* Content */}
                <NoticeList notices={displayedNotices} onDelete={deleteNotice} />

                {/* Modal */}
                <CreateNoticeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateNotice}
                    categories={categories}
                />
            </div>
        </div>
    );
};

export default TeacherNoticeBoard;
