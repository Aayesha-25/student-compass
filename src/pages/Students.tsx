import { useStudents } from '@/store/students';
import StudentTable from '@/components/dashboard/StudentTable';
import { useAuth } from '@/store/auth';
import { calculateRisk } from '@/utils/risk';

const Students = () => {
  const students = useStudents((s) => s.students);
  const user = useAuth((s) => s.user);
  const scoped = user?.role === 'mentor'
    ? students.filter((s) => calculateRisk(s).level !== 'LOW')
    : students;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Students</h2>
        <p className="text-sm text-muted-foreground">All students with multi-factor risk analysis.</p>
      </div>
      <StudentTable students={scoped} />
    </div>
  );
};

export default Students;
