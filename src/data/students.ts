export interface Student {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  email: string;
  attendance: number; // percentage
  marks: number; // percentage
  assignmentsPending: number;
  skillPoints: number;
  medicalLeave: boolean;
  subjects: { name: string; marks: number }[];
  history: { week: string; risk: 'HIGH' | 'MEDIUM' | 'LOW' }[];
}

export const initialStudents: Student[] = [
  {
    id: 's1',
    name: 'Aarav Sharma',
    rollNo: 'CS-101',
    className: 'CSE-A',
    email: 'aarav@school.edu',
    attendance: 52,
    marks: 38,
    assignmentsPending: 4,
    skillPoints: 45,
    medicalLeave: false,
    subjects: [
      { name: 'Mathematics', marks: 35 },
      { name: 'Physics', marks: 42 },
      { name: 'Programming', marks: 38 },
    ],
    history: [
      { week: 'Week 1', risk: 'HIGH' },
      { week: 'Week 2', risk: 'HIGH' },
      { week: 'Week 3', risk: 'MEDIUM' },
    ],
  },
  {
    id: 's2',
    name: 'Priya Patel',
    rollNo: 'CS-102',
    className: 'CSE-A',
    email: 'priya@school.edu',
    attendance: 88,
    marks: 82,
    assignmentsPending: 0,
    skillPoints: 92,
    medicalLeave: false,
    subjects: [
      { name: 'Mathematics', marks: 85 },
      { name: 'Physics', marks: 80 },
      { name: 'Programming', marks: 90 },
    ],
    history: [
      { week: 'Week 1', risk: 'LOW' },
      { week: 'Week 2', risk: 'LOW' },
      { week: 'Week 3', risk: 'LOW' },
    ],
  },
  {
    id: 's3',
    name: 'Rohan Verma',
    rollNo: 'CS-103',
    className: 'CSE-B',
    email: 'rohan@school.edu',
    attendance: 65,
    marks: 55,
    assignmentsPending: 3,
    skillPoints: 60,
    medicalLeave: false,
    subjects: [
      { name: 'Mathematics', marks: 52 },
      { name: 'Physics', marks: 58 },
      { name: 'Programming', marks: 60 },
    ],
    history: [
      { week: 'Week 1', risk: 'MEDIUM' },
      { week: 'Week 2', risk: 'MEDIUM' },
      { week: 'Week 3', risk: 'MEDIUM' },
    ],
  },
  {
    id: 's4',
    name: 'Sneha Reddy',
    rollNo: 'CS-104',
    className: 'CSE-B',
    email: 'sneha@school.edu',
    attendance: 45,
    marks: 32,
    assignmentsPending: 5,
    skillPoints: 30,
    medicalLeave: false,
    subjects: [
      { name: 'Mathematics', marks: 28 },
      { name: 'Physics', marks: 35 },
      { name: 'Programming', marks: 33 },
    ],
    history: [
      { week: 'Week 1', risk: 'HIGH' },
      { week: 'Week 2', risk: 'HIGH' },
      { week: 'Week 3', risk: 'HIGH' },
    ],
  },
  {
    id: 's5',
    name: 'Vikram Singh',
    rollNo: 'CS-105',
    className: 'CSE-A',
    email: 'vikram@school.edu',
    attendance: 75,
    marks: 68,
    assignmentsPending: 1,
    skillPoints: 82,
    medicalLeave: false,
    subjects: [
      { name: 'Mathematics', marks: 70 },
      { name: 'Physics', marks: 65 },
      { name: 'Programming', marks: 72 },
    ],
    history: [
      { week: 'Week 1', risk: 'MEDIUM' },
      { week: 'Week 2', risk: 'LOW' },
      { week: 'Week 3', risk: 'LOW' },
    ],
  },
  {
    id: 's6',
    name: 'Anika Gupta',
    rollNo: 'CS-106',
    className: 'CSE-C',
    email: 'anika@school.edu',
    attendance: 58,
    marks: 45,
    assignmentsPending: 2,
    skillPoints: 50,
    medicalLeave: true,
    subjects: [
      { name: 'Mathematics', marks: 42 },
      { name: 'Physics', marks: 48 },
      { name: 'Programming', marks: 46 },
    ],
    history: [
      { week: 'Week 1', risk: 'HIGH' },
      { week: 'Week 2', risk: 'MEDIUM' },
      { week: 'Week 3', risk: 'MEDIUM' },
    ],
  },
  {
    id: 's7',
    name: 'Karan Mehta',
    rollNo: 'CS-107',
    className: 'CSE-C',
    email: 'karan@school.edu',
    attendance: 92,
    marks: 88,
    assignmentsPending: 0,
    skillPoints: 95,
    medicalLeave: false,
    subjects: [
      { name: 'Mathematics', marks: 90 },
      { name: 'Physics', marks: 85 },
      { name: 'Programming', marks: 92 },
    ],
    history: [
      { week: 'Week 1', risk: 'LOW' },
      { week: 'Week 2', risk: 'LOW' },
      { week: 'Week 3', risk: 'LOW' },
    ],
  },
  {
    id: 's8',
    name: 'Divya Nair',
    rollNo: 'CS-108',
    className: 'CSE-B',
    email: 'divya@school.edu',
    attendance: 70,
    marks: 60,
    assignmentsPending: 3,
    skillPoints: 70,
    medicalLeave: false,
    subjects: [
      { name: 'Mathematics', marks: 58 },
      { name: 'Physics', marks: 62 },
      { name: 'Programming', marks: 60 },
    ],
    history: [
      { week: 'Week 1', risk: 'MEDIUM' },
      { week: 'Week 2', risk: 'MEDIUM' },
      { week: 'Week 3', risk: 'LOW' },
    ],
  },
];
