import React from 'react';

const AttendanceCharts = () => {
    // Mock Data
    const data = [
        { label: 'Present', value: 85, color: 'text-green-500', bg: 'bg-green-500', stroke: '#22c55e' },
        { label: 'Absent', value: 10, color: 'text-red-500', bg: 'bg-red-500', stroke: '#ef4444' },
        { label: 'Late', value: 5, color: 'text-yellow-500', bg: 'bg-yellow-500', stroke: '#eab308' },
    ];

    // SVG Pie Chart logic
    let accumulatedAngle = 0;
    const radius = 80;
    const centerX = 150;
    const centerY = 150;

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Attendance Overview</h3>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Pie Chart */}
                <svg width="300" height="300" viewBox="0 0 300 300">
                    {data.map((slice, i) => {
                        const angle = (slice.value / 100) * 360;
                        const startAngle = accumulatedAngle;
                        const endAngle = accumulatedAngle + angle;
                        accumulatedAngle += angle;

                        const x1 = centerX + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
                        const y1 = centerY + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
                        const x2 = centerX + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
                        const y2 = centerY + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

                        const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;

                        return (
                            <path
                                key={i}
                                d={pathData}
                                fill="none"
                                stroke={slice.stroke}
                                strokeWidth="40"
                                className="transition-all hover:brightness-90"
                            />
                        );
                    })}
                    <circle cx={centerX} cy={centerY} r={radius - 20} fill="white" />
                    <text x={centerX} y={centerY} textAnchor="middle" dy="0.3em" className="text-2xl font-bold fill-gray-800">
                        85%
                    </text>
                    <text x={centerX} y={centerY + 20} textAnchor="middle" className="text-xs fill-gray-500">
                        Avg. Present
                    </text>
                </svg>

                {/* Legend */}
                <div className="flex flex-col gap-4 w-full">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.bg}`}></div>
                                <span className="text-gray-600 font-medium">{item.label}</span>
                            </div>
                            <span className="font-bold text-gray-900">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttendanceCharts;
