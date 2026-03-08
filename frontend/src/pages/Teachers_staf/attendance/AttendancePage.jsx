import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { attendanceService } from '../../../services/attendance.service';
import AttendanceHeader from './AttendanceHeader';
import AttendanceStats from './AttendanceStats';
import AttendanceTable from './AttendanceTable';
import ActionBar from './ActionBar';
import { ToastContainer, toast } from 'react-toastify'; // Assume react-toastify is installed or add it
import 'react-toastify/dist/ReactToastify.css';

const AttendancePage = () => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Initial Data Load
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await attendanceService.getClasses();
                setClasses(data);
                if (data.length > 0) setSelectedClass(data[0]);
            } catch (error) {
                toast.error('Failed to load classes');
            }
        };
        fetchClasses();
    }, []);

    // Fetch Students when Class or Date changes
    useEffect(() => {
        if (!selectedClass) return;

        const fetchStudents = async () => {
            setLoading(true);
            try {
                // selectedClass in our new service is the department object
                const data = await attendanceService.getStudents(selectedClass.id, selectedDate, selectedClass.name);
                setStudents(data);
                setHasUnsavedChanges(false);
            } catch (error) {
                console.error('Failed to load student list');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [selectedClass, selectedDate]);

    // Derived Stats
    const stats = useCallback(() => {
        const total = students.length;
        const present = students.filter(s => s.status === 'present').length;
        const absent = students.filter(s => s.status === 'absent').length;
        const late = students.filter(s => s.status === 'late').length;
        return { total, present, absent, late };
    }, [students]);

    // Handlers
    const handleStatusChange = (id, newStatus) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, status: newStatus } : s
        ));
        setHasUnsavedChanges(true);
    };

    const handleNoteChange = (id, note) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, note } : s
        ));
        setHasUnsavedChanges(true);
    };

    const handleMarkAllPresent = () => {
        setStudents(prev => prev.map(s => ({ ...s, status: 'present' })));
        setHasUnsavedChanges(true);
    };

    const handleClearAll = () => {
        if (!selectedClass) return;
        setLoading(true);
        attendanceService.getStudents(selectedClass.id, selectedDate, selectedClass.name)
            .then(data => {
                setStudents(data);
                setHasUnsavedChanges(false);
            })
            .finally(() => setLoading(false));
    };

    const handleSaveDraft = async () => {
        setSubmitting(true);
        try {
            await attendanceService.saveDraft({
                classId: selectedClass.id,
                date: selectedDate,
                students
            });
            setHasUnsavedChanges(false);
            alert('Draft saved locally');
        } catch (error) {
            alert('Failed to save draft');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        const { absent } = stats();
        if (absent > 0 && !window.confirm(`You are marking ${absent} students as ABSENT. Continue?`)) {
            return;
        }

        setSubmitting(true);
        try {
            await attendanceService.submitAttendance({
                className: selectedClass.name,
                date: selectedDate,
                students,
                subject: selectedClass.subject || 'General'
            });
            setHasUnsavedChanges(false);
            alert('Attendance synchronized with database!');
        } catch (error) {
            alert('Failed to submit attendance');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Attendance</h1>
                    <p className="text-gray-500 text-sm">Manage attendance records for your scheduled classes.</p>
                </div>

                <AttendanceHeader
                    classes={classes}
                    selectedClass={selectedClass}
                    onClassChange={setSelectedClass}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
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
                        <AttendanceStats stats={stats()} />

                        <AttendanceTable
                            students={students}
                            onStatusChange={handleStatusChange}
                            onNoteChange={handleNoteChange}
                        />
                    </motion.div>
                )}
            </div>

            <ActionBar
                onMarkAllPresent={handleMarkAllPresent}
                onClearAll={handleClearAll}
                onSaveDraft={handleSaveDraft}
                onSubmit={handleSubmit}
                isSubmitting={submitting}
                hasUnsavedChanges={hasUnsavedChanges}
            />
        </div>
    );
};

export default AttendancePage;
