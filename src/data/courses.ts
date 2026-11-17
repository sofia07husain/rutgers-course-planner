export type Course = {
    code: string; 
    title: string; 
    credits: number; 
    department: string; 
    days: string; 
    time: string;
};

export const COURSES: Course[] = [
    { code: 'CS 111', title: 'Introduction to Computer Science', credits: 4, department: 'CS', days: 'MW', time: '10:20 AM - 11:40 AM' },
  { code: 'CS 112', title: 'Data Structures', credits: 4, department: 'CS', days: 'TH', time: '1:10 PM - 2:30 PM' },
  { code: 'CS 205', title: 'Discrete Structures I', credits: 4, department: 'CS', days: 'MW', time: '1:10 PM - 2:30 PM' },
  { code: 'CS 211', title: 'Computer Architecture', credits: 4, department: 'CS', days: 'TH', time: '10:20 AM - 11:40 AM' },
  { code: 'MATH 151', title: 'Calculus I', credits: 4, department: 'MATH', days: 'MW', time: '8:40 AM - 10:00 AM' },
  { code: 'MATH 152', title: 'Calculus II', credits: 4, department: 'MATH', days: 'TH', time: '3:50 PM - 5:10 PM' },
  { code: 'MATH 250', title: 'Linear Algebra', credits: 3, department: 'MATH', days: 'MW', time: '3:50 PM - 5:10 PM' },
];