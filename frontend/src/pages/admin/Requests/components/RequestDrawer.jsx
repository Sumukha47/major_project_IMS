import React, { useState } from 'react';
import { X, Check, XCircle, FileText, User, Calendar, Clock, Paperclip, Send } from 'lucide-react';

const RequestDrawer = ({ request, onClose, onUpdateStatus }) => {
    const [comment, setComment] = useState('');

    if (!request) return null;

    const handleAction = (status) => {
        onUpdateStatus(request.id, status, comment);
        setComment('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{request.id}</h2>
                        <p className="text-sm text-gray-500">{request.type} Request</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Status Banner */}
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${request.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-100' :
                        request.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                            'bg-yellow-50 text-yellow-700 border border-yellow-100'
                        }`}>
                        {request.status === 'Approved' ? <Check size={20} /> :
                            request.status === 'Rejected' ? <XCircle size={20} /> :
                                <Clock size={20} />}
                        <span className="font-medium">Status: {request.status}</span>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Request Details</h3>
                        <div>
                            <p className="text-sm text-gray-500">Subject</p>
                            <p className="font-medium text-gray-900">{request.subject}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-gray-700 text-sm leading-relaxed mt-1">{request.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Requester</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <User size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium">{request.creator?.name || 'Unknown'}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="text-sm font-medium mt-1 capitalize">{request.role}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium">{new Date(request.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Comment */}
                    {request.adminComment && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Admin Comment</h3>
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                                <p className="text-sm text-gray-700">{request.adminComment}</p>
                            </div>
                        </div>
                    )}

                    {/* Attachments */}
                    {request.attachments && request.attachments.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Attachments</h3>
                            {request.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                                    <Paperclip size={18} className="text-gray-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-500">{file.size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {request.status === 'Pending' && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                        <textarea
                            placeholder="Add a comment (optional)..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                            rows="2"
                        ></textarea>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleAction('Rejected')}
                                className="flex-1 py-2.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 font-medium transition-colors"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleAction('Approved')}
                                className="flex-1 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-colors shadow-sm"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestDrawer;
