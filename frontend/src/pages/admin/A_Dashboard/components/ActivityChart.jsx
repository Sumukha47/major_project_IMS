import React from 'react';

const ActivityChart = () => {
    // Mock data for the chart
    const data = [40, 65, 45, 80, 55, 90, 70];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const max = Math.max(...data);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">User Activity</h2>
                    <p className="text-sm text-gray-500">Weekly active users overview</p>
                </div>
                <select className="text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                </select>
            </div>

            <div className="relative h-64 flex items-end justify-between gap-2 pt-8">
                {/* Y-Axis Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400 pointer-events-none">
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                </div>

                {/* Bars */}
                {data.map((value, index) => (
                    <div key={index} className="relative flex-1 flex flex-col items-center group">
                        <div
                            className="w-full max-w-[40px] bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 relative group-hover:shadow-lg"
                            style={{ height: `${(value / max) * 100}%` }}
                        >
                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {value} Users
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 font-medium">{days[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityChart;
