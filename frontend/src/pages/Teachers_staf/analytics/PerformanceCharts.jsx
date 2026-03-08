import React from 'react';

const PerformanceCharts = () => {
    // Mock Data for Class Average Trends
    const data = [
        { exam: 'Unit Test 1', avg: 72 },
        { exam: 'Mid Term', avg: 68 },
        { exam: 'Unit Test 2', avg: 75 },
        { exam: 'Pre-University', avg: 82 },
    ];

    const maxScore = 100;
    const chartHeight = 200;
    const chartWidth = 500;
    const padding = 40;

    // Calculate points
    const points = data.map((d, i) => {
        const x = padding + (i * ((chartWidth - padding * 2) / (data.length - 1)));
        const y = chartHeight - padding - ((d.avg / maxScore) * (chartHeight - padding * 2));
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Class Performance Trend</h3>
            <div className="w-full overflow-x-auto">
                <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
                    {/* Grid Lines */}
                    {[0, 25, 50, 75, 100].map((tick) => {
                        const y = chartHeight - padding - ((tick / maxScore) * (chartHeight - padding * 2));
                        return (
                            <g key={tick}>
                                <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#e5e7eb" strokeDasharray="4" />
                                <text x={padding - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-400">{tick}%</text>
                            </g>
                        );
                    })}

                    {/* Line */}
                    <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={points} />

                    {/* Dots */}
                    {data.map((d, i) => {
                        const x = padding + (i * ((chartWidth - padding * 2) / (data.length - 1)));
                        const y = chartHeight - padding - ((d.avg / maxScore) * (chartHeight - padding * 2));
                        return (
                            <g key={i} className="group cursor-pointer">
                                <circle cx={x} cy={y} r="5" className="fill-blue-600 stroke-white stroke-2" />
                                {/* Tooltip */}
                                <rect x={x - 20} y={y - 30} width="40" height="20" rx="4" className="fill-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <text x={x} y={y - 16} textAnchor="middle" className="text-xs fill-white opacity-0 group-hover:opacity-100 font-bold transition-opacity">{d.avg}%</text>
                                {/* X Axis Labels */}
                                <text x={x} y={chartHeight - 10} textAnchor="middle" className="text-xs fill-gray-500">{d.exam}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default PerformanceCharts;
