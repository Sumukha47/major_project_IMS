export const studentTimetableData = {
    Monday: [
        { time: "09:00 - 10:00", subject: "Compiler Design", type: "Lecture", room: "LT-2", faculty: "Prof. S. Gupta" },
        { time: "10:00 - 11:00", subject: "Web Technology", type: "Lecture", room: "LT-2", faculty: "Prof. R. Mehta" },
        { time: "11:00 - 11:15", subject: "Break", type: "Break" },
        { time: "11:15 - 01:15", subject: "Web Technology Lab", type: "Lab", room: "Lab-4", faculty: "Prof. R. Mehta" }
    ],
    Tuesday: [
        { time: "09:00 - 10:00", subject: "AI & ML", type: "Lecture", room: "LT-1", faculty: "Dr. A. Kumar" },
        { time: "10:00 - 12:00", subject: "AI & ML Lab", type: "Lab", room: "Lab-2", faculty: "Dr. A. Kumar" }
    ],
    Wednesday: [
        { time: "10:00 - 11:00", subject: "Data Analytics", type: "Lecture", room: "LT-3", faculty: "Prof. P. Singh" },
        { time: "11:00 - 12:00", subject: "Information Security", type: "Lecture", room: "LT-3", faculty: "Prof. K. Verma" }
    ],
    Thursday: [
        { time: "09:00 - 11:00", subject: "Project Phase I", type: "Lab", room: "Lab-1", faculty: "All Faculty" },
        { time: "12:00 - 01:00", subject: "Soft Skills", type: "Lecture", room: "Sem-Hall", faculty: "Mrs. J. Doe" }
    ],
    Friday: [
        { time: "09:00 - 10:00", subject: "Compiler Design", type: "Lecture", room: "LT-2", faculty: "Prof. S. Gupta" },
        { time: "10:00 - 11:00", subject: "Web Technology", type: "Lecture", room: "LT-2", faculty: "Prof. R. Mehta" },
        { time: "02:00 - 04:00", subject: "Sports / Extra Curricular", type: "Activity", room: "Ground" }
    ],
    Saturday: [
        { time: "09:00 - 11:00", subject: "Mentoring Session", type: "Meeting", room: "Dept Library", faculty: "Assigned Mentor" }
    ]
};

export const studentAttendanceData = {
    stats: {
        totalClasses: 120,
        present: 102,
        absent: 18,
        percentage: 85,
        late: 5
    },
    history: [
        { date: "2024-03-20", status: "Present", subjects: ["CD", "WT", "WT-Lab"] },
        { date: "2024-03-19", status: "Present", subjects: ["AI", "AI-Lab"] },
        { date: "2024-03-18", status: "Absent", subjects: ["DA", "IS"], reason: "Sick Leave" },
        { date: "2024-03-15", status: "Present", subjects: ["CD", "WT", "Sports"] },
        { date: "2024-03-14", status: "Late", subjects: ["Project", "Soft Skills"] }
    ],
    subjectWise: [
        { subject: "Compiler Design", attended: 20, total: 24, percentage: 83 },
        { subject: "Web Technology", attended: 22, total: 24, percentage: 91 },
        { subject: "AI & ML", attended: 18, total: 22, percentage: 81 },
        { subject: "Information Security", attended: 15, total: 18, percentage: 83 },
        { subject: "Data Analytics", attended: 16, total: 18, percentage: 88 }
    ]
};

export const studentMarksData = {
    semester: "6th Semester",
    cgpa: 8.4,
    prevSemCgpa: 8.1,
    subjects: [
        {
            id: 'sub1',
            name: "Compiler Design",
            code: "CS-601",
            faculty: "Prof. S. Gupta",
            credits: 4,
            overall: 85,
            totalMax: 100,
            grade: "A",
            status: "Pass",
            trend: [
                { name: 'UT1', score: 90 },
                { name: 'Mid', score: 84 },
                { name: 'Int', score: 83 }
            ],
            assessments: [
                { type: "Unit Test 1", date: "Feb 20, 2024", obtained: 18, max: 20, grade: "A", remarks: "Excellent concept clarity" },
                { type: "Mid Semester", date: "Mar 15, 2024", obtained: 42, max: 50, grade: "A", remarks: "Good formatting" },
                { type: "Internal", date: "Apr 10, 2024", obtained: 25, max: 30, grade: "A", remarks: "Timely submissions" }
            ],
            facultyComments: "Demonstrates strong understanding of parsing algorithms. Needs to focus slightly more on code optimization techniques."
        },
        {
            id: 'sub2',
            name: "Web Technology",
            code: "CS-602",
            faculty: "Prof. R. Mehta",
            credits: 4,
            overall: 92,
            totalMax: 100,
            grade: "A+",
            status: "Pass",
            trend: [
                { name: 'UT1', score: 95 },
                { name: 'Mid', score: 90 },
                { name: 'Int', score: 94 }
            ],
            assessments: [
                { type: "Unit Test 1", date: "Feb 20, 2024", obtained: 19, max: 20, grade: "A+", remarks: "Flawless code" },
                { type: "Mid Semester", date: "Mar 15, 2024", obtained: 45, max: 50, grade: "A+", remarks: "Great project work" },
                { type: "Internal", date: "Apr 10, 2024", obtained: 28, max: 30, grade: "A+", remarks: "Interactive UI design" }
            ],
            facultyComments: "Exceptional performance in practicals. One of the top scorers in the class."
        },
        {
            id: 'sub3',
            name: "AI & ML",
            code: "CS-603",
            faculty: "Dr. A. Kumar",
            credits: 3,
            overall: 76,
            totalMax: 100,
            grade: "B+",
            status: "Pass",
            trend: [
                { name: 'UT1', score: 75 },
                { name: 'Mid', score: 76 },
                { name: 'Int', score: 77 }
            ],
            assessments: [
                { type: "Unit Test 1", date: "Feb 21, 2024", obtained: 15, max: 20, grade: "B+", remarks: "Concepts need revision" },
                { type: "Mid Semester", date: "Mar 16, 2024", obtained: 38, max: 50, grade: "B+", remarks: "Mathematical errors" },
                { type: "Internal", date: "Apr 11, 2024", obtained: 23, max: 30, grade: "B+", remarks: "Good effort in lab" }
            ],
            facultyComments: "Struggles with the mathematical foundations of ML algorithms. Recommend attending extra tutorial sessions."
        },
        {
            id: 'sub4',
            name: "Information Security",
            code: "CS-604",
            faculty: "Prof. K. Verma",
            credits: 3,
            overall: 82,
            totalMax: 100,
            grade: "A",
            status: "Pass",
            trend: [
                { name: 'UT1', score: 85 },
                { name: 'Mid', score: 80 },
                { name: 'Int', score: 82 }
            ],
            assessments: [
                { type: "Unit Test 1", date: "Feb 22, 2024", obtained: 17, max: 20, grade: "A", remarks: "Good answers" },
                { type: "Mid Semester", date: "Mar 17, 2024", obtained: 40, max: 50, grade: "A", remarks: "Detailed explanations" },
                { type: "Internal", date: "Apr 12, 2024", obtained: 25, max: 30, grade: "A", remarks: "Cryptography project logic is sound" }
            ],
            facultyComments: "Solid performance. Writing style is very clear and concise."
        }
    ],
    insights: {
        strengths: ["Web Technology", "information Security"],
        improvementAreas: ["AI & ML (Regression Models)"],
        attendanceImpact: "High attendance in Web Tech correlates with top grades."
    }
};

export const studentNoticesData = [
    {
        id: 1,
        title: "End Semester Examination Schedule",
        category: "Exam",
        priority: "High",
        date: "2024-04-10",
        preview: "The final schedule for the Spring 2024 End Semester Examinations has been released. Exams will commence from...",
        content: "The final schedule for the Spring 2024 End Semester Examinations has been released. Exams will commence from April 25th, 2024. Students are advised to download the detailed timetable attached below. Admit cards will be available for download from the student portal starting April 20th. Please ensure all dues are cleared before this date.",
        isRead: false,
        isBookmarked: true,
        department: "Examination Cell",
        attachments: [
            { name: "Final_Schedule_Spring2024.pdf", size: "2.5 MB", type: "pdf" }
        ]
    },
    {
        id: 2,
        title: "Guest Lecture on AI Ethics",
        category: "Event",
        priority: "Medium",
        date: "2024-04-08",
        preview: "Join us for an insightful session with Dr. A. Rao on the ethical implications of Artificial Intelligence...",
        content: "Join us for an insightful session with Dr. A. Rao on the ethical implications of Artificial Intelligence. The lecture will cover bias in ML models, data privacy, and the future of responsible AI. Attendance is mandatory for 3rd-year CS students.",
        isRead: true,
        isBookmarked: false,
        department: "Computer Science",
        attachments: []
    },
    {
        id: 3,
        title: "Library Maintenance Downtime",
        category: "General",
        priority: "Low",
        date: "2024-04-05",
        preview: "The digital library portal will be undergoing scheduled maintenance on...",
        content: "The digital library portal will be undergoing scheduled maintenance on Sunday, April 14th, from 10:00 AM to 4:00 PM. Access to e-journals and the book renewal system will be unavailable during this period.",
        isRead: true,
        isBookmarked: false,
        department: "Library",
        attachments: []
    },
    {
        id: 4,
        title: "Hackathon 2024 Registration",
        category: "Event",
        priority: "Medium",
        date: "2024-04-12",
        preview: "Registrations are now open for the Annual Institute Hackathon. Win prizes worth...",
        content: "Registrations are now open for the Annual Institute Hackathon. Teams can consist of 2-4 members. The theme for this year is 'Sustainable Tech'. Win prizes worth ₹50,000! Submit your ideas by April 18th.",
        isRead: false,
        isBookmarked: true,
        department: "Student Council",
        attachments: [
            { name: "Rulebook_2024.pdf", size: "1.2 MB", type: "pdf" },
            { name: "Theme_Details.docx", size: "500 KB", type: "doc" }
        ]
    },
    {
        id: 5,
        title: "Academic Calendar Revised",
        category: "Academic",
        priority: "High",
        date: "2024-04-01",
        preview: "Please note the changes in the academic calendar regarding the upcoming summer break...",
        content: "Due to the upcoming general elections, the academic calendar has been slightly revised. The summer break will now begin from May 15th instead of May 10th. The last working day for the semester is May 14th.",
        isRead: true,
        isBookmarked: false,
        department: "Dean Academics",
        attachments: [
            { name: "Revised_Calendar_v2.pdf", size: "800 KB", type: "pdf" }
        ]
    }
];

export const studentResourcesData = [
    {
        id: 1,
        title: "Compiler Design - Complete Notes",
        subject: "Compiler Design",
        type: "PDF",
        faculty: "Prof. S. Gupta",
        date: "2024-03-15",
        size: "4.2 MB",
        downloads: 125,
        description: "Comprehensive notes covering Lexical Analysis, Parsing, and Code Optimization techniques. Includes solved previous year questions.",
        tags: ["Notes", "Unit 1-5"]
    },
    {
        id: 2,
        title: "Web Technology Lab Manual",
        subject: "Web Technology",
        type: "PDF",
        faculty: "Prof. R. Mehta",
        date: "2024-02-10",
        size: "2.8 MB",
        downloads: 89,
        description: "Official lab manual for CS-602. Contains all problem statements for HTML, CSS, JS, and React experiments.",
        tags: ["Lab", "Practical"]
    },
    {
        id: 3,
        title: "Introduction to Neural Networks",
        subject: "AI & ML",
        type: "Video",
        faculty: "Dr. A. Kumar",
        date: "2024-03-20",
        size: "15 mins",
        downloads: 210,
        description: "Video lecture explaining the architecture of Perceptrons and Multi-Layer Perceptrons (MLP).",
        tags: ["Lecture", "Deep Learning"]
    },
    {
        id: 4,
        title: "Cryptography Algorithms Presentation",
        subject: "Information Security",
        type: "PPT",
        faculty: "Prof. K. Verma",
        date: "2024-03-25",
        size: "5.5 MB",
        downloads: 45,
        description: "Slides covering RSA, AES, and DES algorithms with step-by-step encryption/decryption examples.",
        tags: ["Slides", "Encryption"]
    },
    {
        id: 5,
        title: "Regression Analysis Dataset",
        subject: "AI & ML",
        type: "Link",
        faculty: "Dr. A. Kumar",
        date: "2024-03-22",
        size: "External",
        downloads: 56,
        description: "Kaggle dataset link for the linear regression assignment. Cleaned CSV format.",
        tags: ["Dataset", "Assignment"]
    },
    {
        id: 6,
        title: "React Hooks Cheat Sheet",
        subject: "Web Technology",
        type: "Image",
        faculty: "Prof. R. Mehta",
        date: "2024-03-01",
        size: "1.2 MB",
        downloads: 340,
        description: "Quick reference guide for standard React Hooks (useState, useEffect, useContext).",
        tags: ["Reference", "React"]
    }
];

export const studentRequestsData = [
    {
        id: 1,
        type: "Bonafide Certificate",
        purpose: "Scholarship Application",
        date: "2024-04-12",
        status: "Approved",
        department: "Admin Office",
        description: "Need bonafide certificate for State Government Scholarship application.",
        timeline: [
            { status: "Submitted", date: "2024-04-12 10:00 AM", by: "You" },
            { status: "Approved", date: "2024-04-13 02:30 PM", by: "Registrar" }
        ],
        comments: "Certificate is ready for collection at the counter."
    },
    {
        id: 2,
        type: "Gate Pass",
        purpose: "Medical Emergency",
        date: "2024-04-14",
        status: "Pending",
        department: "Warden / HOD",
        description: "Going to visit dentist for urgent appointment.",
        timeline: [
            { status: "Submitted", date: "2024-04-14 09:15 AM", by: "You" }
        ],
        comments: null
    },
    {
        id: 3,
        type: "Leave Application",
        purpose: "Family Function",
        date: "2024-04-05",
        status: "Rejected",
        department: "HOD - CSE",
        description: "Requesting leave for 2 days to attend sister's wedding.",
        timeline: [
            { status: "Submitted", date: "2024-04-05 11:00 AM", by: "You" },
            { status: "Rejected", date: "2024-04-06 10:00 AM", by: "HOD" }
        ],
        comments: "Low attendance. Cannot grant leave at this time."
    },
    {
        id: 4,
        type: "Bus Pass Renewal",
        purpose: "Semester Renewal",
        date: "2024-04-10",
        status: "Approved",
        department: "Transport Dept",
        description: "Renewal for Sem 6.",
        timeline: [
            { status: "Submitted", date: "2024-04-10 03:00 PM", by: "You" },
            { status: "Approved", date: "2024-04-11 11:20 AM", by: "Transport Officer" }
        ],
        comments: "Pass renewed till June 2024."
    }
];

export const studentProfileData = {
    name: "Rahul Sharma",
    role: "Student",
    id: "CS21045",
    program: "B.Tech Computer Science",
    semester: "6th Semester",
    email: "rahul.sharma@nit.edu",
    phone: "+91 98765 43210",
    dob: "2002-08-15",
    address: "Room 304, Boys Hostel, NIT Campus",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    stats: {
        attendance: 85,
        cgpa: 8.4,
        credits: 22
    },
    preferences: {
        theme: "Light",
        language: "English",
        emails: true,
        alerts: true
    },
    loginHistory: [
        { device: "MacBook Pro", location: "Campus WiFi", time: "Just now", active: true },
        { device: "iPhone 13", location: "4G Network", time: "Yesterday, 10:30 PM", active: false },
        { device: "Lab PC-04", location: "Lab 2", time: "2 days ago", active: false }
    ]
};
