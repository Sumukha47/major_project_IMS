import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { marksService } from '../../../services/marks.service';
import MarksFilterBar from './MarksFilterBar';
import MarksStats from './MarksStats';
import MarksTable from './MarksTable';
import MarksActionBar from './MarksActionBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';

const MarksPage = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [filterOptions, setFilterOptions] = useState({});
    const [filters, setFilters] = useState({
        academicSession: '',
        department: '',
        studentYear: '',
        section: '',
        semester: '',
        subjectId: '',
        examType: '' // Stores examId
    });
    const [students, setStudents] = useState([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Initial Load of Filters
    useEffect(() => {
        const loadFilters = async () => {
            if (!token) return;
            try {
                const data = await marksService.getFilters(token);
                setFilterOptions(data);
                if (data.academicSessions?.length) setFilters(f => ({ ...f, academicSession: data.academicSessions[0] }));
                if (data.departments?.length) setFilters(f => ({ ...f, department: data.departments[0] }));
            } catch (error) {
                toast.error('Failed to load filter data');
            }
        };
        loadFilters();
    }, [token]);

    // Fetch Marks when relevant filters change
    useEffect(() => {
        if (!filters.department || !filters.subjectId || !filters.examType || !filters.studentYear || !token) return;

        const fetchMarks = async () => {
            setLoading(true);
            try {
                const data = await marksService.getStudentMarks(filters, token);
                setStudents(data);
                setHasUnsavedChanges(false);
            } catch (error) {
                toast.error('Failed to load marks');
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, [filters.department, filters.subjectId, filters.examType, filters.studentYear, filters.section, filters.semester, token]);

    // Handle Mark Updates
    const handleMarkChange = useCallback((id, field, value) => {
        setStudents(prev => prev.map(student => {
            if (student.id !== id) return student;

            const updated = { ...student, [field]: value };

            // Auto-calculate Total & Grade if marks change
            if (field === 'internalMarks' || field === 'externalMarks') {
                const internal = field === 'internalMarks' ? parseInt(value) || 0 : student.internalMarks;
                const external = field === 'externalMarks' ? parseInt(value) || 0 : student.externalMarks;

                // Cap values
                const validInternal = Math.min(internal, student.maxInternal);
                const validExternal = Math.min(external, student.maxExternal);

                const total = validInternal + validExternal;
                const pass = total >= 40; // Passing logic

                updated.internalMarks = validInternal;
                updated.externalMarks = validExternal;
                updated.total = total;
                updated.status = pass ? 'Pass' : 'Fail';
                updated.grade = pass ? (total >= 90 ? 'O' : total >= 80 ? 'A+' : total >= 70 ? 'A' : total >= 60 ? 'B' : 'C') : 'F';
            }
            return updated;
        }));
        setHasUnsavedChanges(true);
    }, []);

    const handleSave = async () => {
        if (!filters.examType || !filters.subjectId || !token) return;
        setSaving(true);
        try {
            await marksService.saveMarks(filters.examType, filters.subjectId, students, token);
            setHasUnsavedChanges(false);
            toast.success('Marks saved successfully');
        } catch (error) {
            toast.error('Failed to save marks');
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!filters.examType || !token) return;
        if (!window.confirm('Are you sure you want to PUBLISH these marks? This will make them visible to students.')) return;

        setSaving(true);
        try {
            await marksService.publishMarks(filters.examType, token);
            setHasUnsavedChanges(false);
            toast.success('Marks published successfully!');
        } catch (error) {
            toast.error('Failed to publish');
        } finally {
            setSaving(false);
        }
    };

    const handleExport = () => {
        toast.info('Exporting data...');
        // Mock export
        setTimeout(() => toast.success('Marks exported to CSV'), 1000);
    };

    const handleImport = (e) => {
        if (e.target.files.length > 0) {
            toast.info('Processing file...');
            setTimeout(() => toast.success('Marks imported successfully'), 1500);
        }
    };

    // Calculate Stats
    const stats = {
        average: students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.total, 0) / students.length) : 0,
        highest: students.length > 0 ? Math.max(...students.map(s => s.total)) : 0,
        lowest: students.length > 0 ? Math.min(...students.map(s => s.total)) : 0,
        passPercentage: students.length > 0 ? Math.round((students.filter(s => s.status === 'Pass').length / students.length) * 100) : 0
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Marks Management</h1>
                    <p className="text-gray-500 text-sm">Input, edit, and publish student examination marks.</p>
                </div>

                <MarksFilterBar
                    filters={filterOptions}
                    selected={filters}
                    onChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))}
                />

                {loading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {students.length > 0 ? (
                            <>
                                <MarksStats stats={stats} />
                                <MarksTable
                                    students={students}
                                    onMarkChange={handleMarkChange}
                                />
                            </>
                        ) : (
                            <div className="text-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <p className="text-gray-400">Select Class, Subject, and Exam to view marks sheet.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            <MarksActionBar
                onSave={handleSave}
                onPublish={handlePublish}
                onExport={handleExport}
                onImport={handleImport}
                isSaving={saving}
                hasUnsavedChanges={hasUnsavedChanges}
            />
        </div>
    );
};

export default MarksPage;
