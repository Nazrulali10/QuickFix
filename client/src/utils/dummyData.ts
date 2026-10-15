import type { ServiceRequestItem, TechnicianProfile } from '../types'

export const DUMMY_TECHNICIAN: TechnicianProfile = {
    id: '1',
    name: 'Alex Smith',
    email: 'alex.smith@quickfix.com',
    phone: '+1 555-0192',
    role: 'TECHNICIAN',
    status: 'ACTIVE',
    skills: ['AC Repair & Service', 'Electrical Repair'],
}

export const DUMMY_TECHNICIANS: TechnicianProfile[] = [
    DUMMY_TECHNICIAN,
    {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria.garcia@quickfix.com',
        phone: '+1 555-0234',
        role: 'TECHNICIAN',
        status: 'BUSY',
        skills: ['Plumbing', 'Washing Machine Repair'],
    },
    {
        id: '3',
        name: 'David Chen',
        email: 'david.chen@quickfix.com',
        phone: '+1 555-0311',
        role: 'TECHNICIAN',
        status: 'OFFLINE',
        skills: ['Refrigerator Repair'],
    },
]

export const DUMMY_REQUESTS: ServiceRequestItem[] = [
    {
        id: 'REQ-101',
        userName: 'John Doe',
        technicianName: 'Alex Smith',
        skillName: 'AC Repair & Service',
        description: 'AC is not cooling properly and blowing warm air continuously. Needs gas checking and coil inspection.',
        location: 'Building A, Flat 402, Downtown',
        status: 'COMPLETED',
        createdAt: '2026-10-08 10:30 AM',
    },
    {
        id: 'REQ-102',
        userName: 'Jane Miller',
        technicianName: 'Alex Smith',
        skillName: 'Electrical Repair',
        description: 'Main breaker switches tripping repeatedly when heavy appliances are turned on in kitchen.',
        location: 'Suite 204, Tech Park Row',
        status: 'ASSIGNED',
        createdAt: '2026-10-08 11:45 AM',
    },
    {
        id: 'REQ-103',
        userName: 'Robert Brown',
        technicianName: 'Unassigned',
        skillName: 'Plumbing',
        description: 'Leaking pipe under kitchen sink.',
        location: 'Building C, Flat 105',
        status: 'CREATED',
        createdAt: '2026-10-08 02:15 PM',
    },
]
