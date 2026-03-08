import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TeacherContext = createContext();

export const useTeacher = () => useContext(TeacherContext);

export const TeacherProvider = ({ children }) => {
    const { user } = useAuth();

    const [teacherProfile, setTeacherProfile] = useState(null);

    useEffect(() => {
        if (user && (user.role === 'teacher' || user.role === 'Teacher')) {
            setTeacherProfile({
                id: user.id,
                name: user.name,
                department: user.department || 'General',
                designation: user.designation || 'Lecturer',
                avatar: user.avatar,
                email: user.email
            });
        }
    }, [user]);

    const [schedule, setSchedule] = useState([
        { id: 1, time: '09:00 AM', subject: 'Data Structures', class: 'CS-A', room: 'LH-101', status: 'upcoming' },
        { id: 2, time: '11:00 AM', subject: 'Algorithms', class: 'CS-B', room: 'LH-102', status: 'upcoming' },
        { id: 3, time: '02:00 PM', subject: 'Project Lab', class: 'CS-Final', room: 'Lab-3', status: 'upcoming' }
    ]);

    const [stats, setStats] = useState({
        todayClasses: 3,
        pendingAttendance: 1,
        ungradedSubmissions: 12,
        totalStudents: 145
    });

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'HOD Meeting', message: 'Department meeting at 4 PM', type: 'info', read: false },
        { id: 2, title: 'Submission Deadline', message: 'DS Assignment due today', type: 'warning', read: false }
    ]);

    // Mock Actions
    const markAttendance = (classId, students) => {
        console.log(`Marking attendance for class ${classId}`, students);
        return Promise.resolve({ success: true, message: 'Attendance marked successfully' });
    };

    const updateMarks = (classId, examId, marksData) => {
        console.log(`Updating marks for class ${classId}, exam ${examId}`, marksData);
        return Promise.resolve({ success: true, message: 'Marks updated successfully' });
    };

    const fetchTeacherData = () => {
        // Simulate API call
        setTimeout(() => {
            // Data is already set in initial state for mock
        }, 500);
    };

    useEffect(() => {
        fetchTeacherData();
    }, []);

    return (
        <TeacherContext.Provider value={{
            teacherProfile,
            schedule,
            stats,
            notifications,
            markAttendance,
            updateMarks
        }}>
            {children}
        </TeacherContext.Provider>
    );
};
