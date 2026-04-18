import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'student' | 'teacher' | 'mentor' | 'class_teacher';

export interface AuthUser {
  email: string;
  name: string;
  role: Role;
  studentId?: string; // for student role
}

interface AuthState {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

export const MOCK_CREDENTIALS: Record<Role, { email: string; password: string; name: string; studentId?: string }> = {
  student: { email: 'student@demo.com', password: 'student123', name: 'Aarav Sharma', studentId: 's1' },
  teacher: { email: 'teacher@demo.com', password: 'teacher123', name: 'Dr. Mehul Kapoor' },
  mentor: { email: 'mentor@demo.com', password: 'mentor123', name: 'Ms. Riya Desai' },
  class_teacher: { email: 'classteacher@demo.com', password: 'class123', name: 'Prof. Anil Kumar' },
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'sssis-auth' }
  )
);
