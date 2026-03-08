import React, { createContext, useContext, useState } from 'react';

const SecurityContext = createContext();

export const useSecurity = () => useContext(SecurityContext);

export const SecurityProvider = ({ children }) => {
    // Mock Audit Logs
    const [auditLogs, setAuditLogs] = useState([
        { id: 1, timestamp: '2024-03-10 10:30:00', user: 'admin@nit.edu', action: 'Login', ip: '192.168.1.1', status: 'Success', details: 'Successful login via Web' },
        { id: 2, timestamp: '2024-03-10 10:35:00', user: 'staff1@nit.edu', action: 'Update Grades', ip: '192.168.1.5', status: 'Success', details: 'Updated grades for CS101' },
        { id: 3, timestamp: '2024-03-10 11:00:00', user: 'unknown', action: 'Login', ip: '45.33.22.11', status: 'Failed', details: 'Invalid password attempt' },
        { id: 4, timestamp: '2024-03-10 11:15:00', user: 'admin@nit.edu', action: 'Change Role', ip: '192.168.1.1', status: 'Success', details: 'Changed role for user ID 5' },
        { id: 5, timestamp: '2024-03-10 12:00:00', user: 'student1@nit.edu', action: 'View Profile', ip: '10.0.0.5', status: 'Success', details: 'Viewed own profile' },
    ]);

    // Mock Active Sessions
    const [sessions, setSessions] = useState([
        { id: 1, user: 'Admin User', email: 'admin@nit.edu', device: 'MacBook Pro - Chrome', ip: '192.168.1.1', loginTime: '2 hrs ago', status: 'Active' },
        { id: 2, user: 'Rahul Staff', email: 'rahul@nit.edu', device: 'Windows 11 - Firefox', ip: '192.168.1.5', loginTime: '45 mins ago', status: 'Active' },
        { id: 3, user: 'Priya Student', email: 'priya@nit.edu', device: 'iPhone 13 - Safari', ip: '10.0.0.5', loginTime: '10 mins ago', status: 'Active' },
    ]);

    // Mock Roles
    const [roles, setRoles] = useState([
        { id: 1, name: 'Super Admin', users: 2, description: 'Full system access' },
        { id: 2, name: 'Admin', users: 5, description: 'Department management access' },
        { id: 3, name: 'Staff', users: 45, description: 'Class and student management' },
        { id: 4, name: 'Student', users: 1200, description: 'View only access' },
    ]);

    const terminateSession = (sessionId) => {
        setSessions(sessions.filter(s => s.id !== sessionId));
    };

    const getStats = () => {
        return {
            activeSessions: sessions.length,
            failedLogins: auditLogs.filter(l => l.status === 'Failed').length,
            criticalAlerts: 2, // Mock
            mfaAdoption: 85 // Mock percentage
        };
    };

    return (
        <SecurityContext.Provider value={{
            auditLogs,
            sessions,
            roles,
            terminateSession,
            getStats
        }}>
            {children}
        </SecurityContext.Provider>
    );
};
