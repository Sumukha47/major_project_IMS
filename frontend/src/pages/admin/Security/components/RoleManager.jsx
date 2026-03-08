import React from 'react';
import { Shield, Edit2, Users } from 'lucide-react';
import { useSecurity } from '../../../../context/SecurityContext';

const RoleManager = () => {
    const { roles } = useSecurity();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
                <div key={role.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Shield size={24} />
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Edit2 size={18} />
                        </button>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1">{role.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 h-10">{role.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                        <Users size={16} />
                        <span>{role.users} Users assigned</span>
                    </div>
                </div>
            ))}

            {/* Add Role Card */}
            <button className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors group">
                <div className="p-3 bg-gray-50 rounded-full mb-3 group-hover:bg-blue-50 transition-colors">
                    <Shield size={24} />
                </div>
                <span className="font-medium">Create New Role</span>
            </button>
        </div>
    );
};

export default RoleManager;
