import React, { useState } from 'react';
import { FileText, Image, File, Download, Trash2, Folder, Video } from 'lucide-react';

const ResourceList = ({ resources, onDelete }) => {
    // Icons mapping
    const getIcon = (type) => {
        switch (type) {
            case 'pdf': return <FileText className="text-red-500" />;
            case 'image': return <Image className="text-blue-500" />;
            case 'video': return <Video className="text-purple-500" />;
            case 'folder': return <Folder className="text-yellow-500 fill-yellow-500" />;
            default: return <File className="text-gray-500" />;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((file) => (
                <div key={file.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            {getIcon(file.type)}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Download size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(file.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-900 truncate" title={file.name}>
                            {file.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.date}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                {file.subject}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Empty State */}
            {resources.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Folder size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">No resources uploaded yet</p>
                    <p className="text-sm text-gray-400">Upload study materials for your students using the button above.</p>
                </div>
            )}
        </div>
    );
};

export default ResourceList;
