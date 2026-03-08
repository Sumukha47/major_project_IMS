// Mock data and service for Classes

const MOCK_CLASSES = [
    {
        id: 'c1',
        subject: 'Advanced Mathematics',
        code: 'MATH301',
        section: 'A',
        semester: '5th',
        department: 'Computer Science',
        room: 'Room 301',
        schedule: [
            { day: 'Monday', time: '10:00 AM - 11:30 AM' },
            { day: 'Wednesday', time: '10:00 AM - 11:30 AM' }
        ],
        enrolled: 45,
        attendance: 88,
        nextLecture: 'Monday, 10:00 AM',
        color: 'bg-blue-500',
        students: Array.from({ length: 45 }, (_, i) => ({
            id: `s${i + 1}`,
            name: `Student ${i + 1}`,
            rollNo: `CS2023${100 + i}`,
            attendance: Math.floor(Math.random() * 30) + 70,
            status: 'Present'
        }))
    },
    {
        id: 'c2',
        subject: 'Database Management Systems',
        code: 'CS304',
        section: 'B',
        semester: '5th',
        department: 'Computer Science',
        room: 'Lab 2',
        schedule: [
            { day: 'Tuesday', time: '02:00 PM - 03:30 PM' },
            { day: 'Thursday', time: '02:00 PM - 03:30 PM' }
        ],
        enrolled: 42,
        attendance: 75,
        nextLecture: 'Tuesday, 02:00 PM',
        color: 'bg-purple-500',
        students: Array.from({ length: 42 }, (_, i) => ({
            id: `s${i + 1}`,
            name: `Student ${i + 1}`,
            rollNo: `CS2023${200 + i}`,
            attendance: Math.floor(Math.random() * 30) + 60,
            status: 'Present'
        }))
    },
    {
        id: 'c3',
        subject: 'Software Engineering',
        code: 'CS305',
        section: 'A',
        semester: '5th',
        department: 'Computer Science',
        room: 'Room 305',
        schedule: [
            { day: 'Friday', time: '09:00 AM - 10:30 AM' }
        ],
        enrolled: 48,
        attendance: 92,
        nextLecture: 'Friday, 09:00 AM',
        color: 'bg-green-500',
        students: Array.from({ length: 48 }, (_, i) => ({
            id: `s${i + 1}`,
            name: `Student ${i + 1}`,
            rollNo: `CS2023${300 + i}`,
            attendance: Math.floor(Math.random() * 20) + 80,
            status: 'Present'
        }))
    },
    {
        id: 'c4',
        subject: 'Data Structures',
        code: 'CS201',
        section: 'C',
        semester: '3rd',
        department: 'Information Technology',
        room: 'Room 201',
        schedule: [
            { day: 'Monday', time: '02:00 PM - 03:30 PM' },
            { day: 'Wednesday', time: '02:00 PM - 03:30 PM' }
        ],
        enrolled: 50,
        attendance: 85,
        nextLecture: 'Monday, 02:00 PM',
        color: 'bg-orange-500',
        students: Array.from({ length: 50 }, (_, i) => ({
            id: `s${i + 1}`,
            name: `Student ${i + 1}`,
            rollNo: `IT2023${100 + i}`,
            attendance: Math.floor(Math.random() * 30) + 70,
            status: 'Present'
        }))
    }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const classesService = {
    getClasses: async (filters = {}) => {
        await delay(600); // Simulate network latency
        let filtered = [...MOCK_CLASSES];

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(c =>
                c.subject.toLowerCase().includes(searchLower) ||
                c.code.toLowerCase().includes(searchLower)
            );
        }

        if (filters.semester && filters.semester !== 'All') {
            filtered = filtered.filter(c => c.semester === filters.semester);
        }

        if (filters.department && filters.department !== 'All') {
            filtered = filtered.filter(c => c.department === filters.department);
        }

        return filtered;
    },

    getClassById: async (id) => {
        await delay(600);
        return MOCK_CLASSES.find(c => c.id === id);
    },

    markAttendance: async (classId, attendanceData) => {
        await delay(800);
        console.log(`Marking attendance for class ${classId}`, attendanceData);
        return { success: true, message: 'Attendance marked successfully' };
    }
};
