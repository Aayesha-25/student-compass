import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialStudents, Student } from '@/data/students';

export interface Intervention {
  id: string;
  studentId: string;
  type: 'Counselling Done' | 'Extra Class Given' | 'Assignment Extended';
  notes: string;
  date: string;
  by: string;
}

interface StudentsState {
  students: Student[];
  interventions: Intervention[];
  addStudent: (s: Student) => void;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  addIntervention: (i: Intervention) => void;
  reset: () => void;
}

export const useStudents = create<StudentsState>()(
  persist(
    (set) => ({
      students: initialStudents,
      interventions: [],
      addStudent: (s) => set((st) => ({ students: [...st.students, s] })),
      updateStudent: (id, patch) =>
        set((st) => ({ students: st.students.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      addIntervention: (i) => set((st) => ({ interventions: [i, ...st.interventions] })),
      reset: () => set({ students: initialStudents, interventions: [] }),
    }),
    { name: 'sssis-students' }
  )
);
