import React from 'react';
import { Save } from 'lucide-react';

const SecuritySettings = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Security Policies</h2>
                <p className="text-sm text-gray-500">Configure global security settings</p>
            </div>

            <div className="p-6 space-y-8">
                {/* Password Policy */}
                <section>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Password Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Length</label>
                            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>8 characters</option>
                                <option>10 characters</option>
                                <option>12 characters</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
                            <div className="space-y-2 mt-2">
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                                    Require uppercase letters
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                                    Require numbers
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                                    Require special characters
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* Session Settings */}
                <section>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Session Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (Minutes)</label>
                            <input type="number" defaultValue="30" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Concurrent Sessions</label>
                            <input type="number" defaultValue="3" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
