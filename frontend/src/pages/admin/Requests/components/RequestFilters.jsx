import React from 'react';
import { Search, Filter } from 'lucide-react';

const RequestFilters = ({ filters, setFilters }) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by ID, Subject or Requester..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-2 text-gray-500">
                    <Filter size={20} />
                    <span className="text-sm font-medium">Filters:</span>
                </div>

                <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                >
                    <option value="All">All Types</option>
                    <option value="Leave">Leave</option>
                    <option value="Bonafide">Bonafide</option>
                    <option value="Gate Pass">Gate Pass</option>
                    <option value="Equipment">Equipment</option>
                </select>

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <select
                    value={filters.department}
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                >
                    <option value="All">All Depts</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Tech">Information Tech</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electronics">Electronics</option>
                </select>
            </div>
        </div>
    );
};

export default RequestFilters;
