import React, { createContext, useContext, useState } from 'react';

const RequestContext = createContext();

export const useRequests = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([
        {
            id: 'REQ-2024-001',
            type: 'Leave',
            requester: 'Rahul Sharma',
            requesterRole: 'Student',
            department: 'Computer Science',
            date: '2024-03-10',
            status: 'Pending',
            subject: 'Medical Leave for 2 days',
            description: 'I am suffering from high fever and need to take rest as per doctor advice.',
            attachments: [{ name: 'Medical_Certificate.pdf', size: '1.2 MB' }],
            timeline: [
                { action: 'Created', by: 'Rahul Sharma', date: '2024-03-10 09:00 AM', comment: 'Request submitted' }
            ]
        },
        {
            id: 'REQ-2024-002',
            type: 'Bonafide',
            requester: 'Priya Patel',
            requesterRole: 'Student',
            department: 'Information Tech',
            date: '2024-03-09',
            status: 'Approved',
            subject: 'Bonafide Certificate for Bank Loan',
            description: 'I need a bonafide certificate to apply for an education loan at SBI.',
            attachments: [],
            timeline: [
                { action: 'Created', by: 'Priya Patel', date: '2024-03-09 10:30 AM', comment: 'Request submitted' },
                { action: 'Approved', by: 'Admin User', date: '2024-03-09 02:00 PM', comment: 'Approved' }
            ]
        },
        {
            id: 'REQ-2024-003',
            type: 'Gate Pass',
            requester: 'Ankit Verma',
            requesterRole: 'Student',
            department: 'Mechanical',
            date: '2024-03-11',
            status: 'Rejected',
            subject: 'Early exit for family function',
            description: 'Need to leave campus at 2 PM for sister\'s engagement.',
            attachments: [],
            timeline: [
                { action: 'Created', by: 'Ankit Verma', date: '2024-03-11 08:00 AM', comment: 'Request submitted' },
                { action: 'Rejected', by: 'HOD Mechanical', date: '2024-03-11 11:00 AM', comment: 'Class hours are mandatory. Permission denied.' }
            ]
        },
        {
            id: 'REQ-2024-004',
            type: 'Equipment',
            requester: 'Prof. Amit Kumar',
            requesterRole: 'Teacher',
            department: 'Electronics',
            date: '2024-03-12',
            status: 'Pending',
            subject: 'New Projector for Lab 2',
            description: 'The existing projector in Lab 2 is malfunctioning. Requesting a replacement.',
            attachments: [{ name: 'Quotation.pdf', size: '2.5 MB' }],
            timeline: [
                { action: 'Created', by: 'Prof. Amit Kumar', date: '2024-03-12 11:15 AM', comment: 'Request submitted' }
            ]
        }
    ]);

    const addRequest = (newRequest) => {
        const request = {
            ...newRequest,
            id: `REQ-2024-${String(requests.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            timeline: [
                { action: 'Created', by: newRequest.requester || 'Current User', date: new Date().toLocaleString(), comment: 'Request submitted' }
            ]
        };
        setRequests([request, ...requests]);
    };

    const updateRequestStatus = (id, newStatus, comment) => {
        setRequests(requests.map(req => {
            if (req.id === id) {
                return {
                    ...req,
                    status: newStatus,
                    timeline: [
                        ...req.timeline,
                        { action: newStatus, by: 'Admin User', date: new Date().toLocaleString(), comment }
                    ]
                };
            }
            return req;
        }));
    };

    return (
        <RequestContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
            {children}
        </RequestContext.Provider>
    );
};
