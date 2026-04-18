import { useMemo, useState } from 'react';
import { useStudents } from '@/store/students';
import { useAuth } from '@/store/auth';
import { calculateRisk } from '@/utils/risk';
import StatCard from '@/components/dashboard/StatCard';
import StudentTable from '@/components/dashboard/StudentTable';
import AlertBanner from '@/components/dashboard/AlertBanner';
import StudentSelfView from '@/components/dashboard/StudentSelfView';
import { AlertTriangle, BookOpen, Calendar, FileText, Sparkles, Users } from 'lucide-react';

type FilterMode = 'overall' | 'marks' | 'attendance' | 'assignments' | 'skill';

const Dashboard = () => {
  const user = useAuth((s) => s.user);
  const students = useStudents((s) => s.students);
  const [mode, setMode] = useState<FilterMode>('overall');

  const stats = useMemo(() => {
    const withRisk = students.map((s) => ({ ...s, risk: calculateRisk(s) }));
    return {
      total: students.length,
      high: withRisk.filter((s) => s.risk.level === 'HIGH').length,
      medium: withRisk.filter((s) => s.risk.level === 'MEDIUM').length,
      low: withRisk.filter((s) => s.risk.level === 'LOW').length,
      lowMarks: students.filter((s) => s.marks < 40).length,
      lowAttendance: students.filter((s) => s.attendance < 60).length,
      pendingAssignments: students.filter((s) => s.assignmentsPending > 2).length,
      lowSkill: students.filter((s) => s.skillPoints < 60).length,
    };
  }, [students]);

  // Student self-view
  if (user?.role === 'student' && user.studentId) {
    return <StudentSelfView studentId={user.studentId} />;
  }

  // Filter the visible students for teacher (just demo: show all; could be class-scoped)
  let scoped = students;
  if (user?.role === 'mentor') {
    // mentor sees only at-risk
    scoped = students.filter((s) => calculateRisk(s).level !== 'LOW');
  }

  return (
    <div className="space-y-6">
      <AlertBanner count={stats.high} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Overall Risk"
          value={`${stats.high}H · ${stats.medium}M · ${stats.low}L`}
          subtitle={`${stats.total} total students`}
          icon={Users}
          variant="default"
          active={mode === 'overall'}
          onClick={() => setMode('overall')}
        />
        <StatCard
          title="Marks-wise Risk"
          value={stats.lowMarks}
          subtitle="Marks < 40%"
          icon={BookOpen}
          variant="danger"
          active={mode === 'marks'}
          onClick={() => setMode('marks')}
        />
        <StatCard
          title="Attendance Risk"
          value={stats.lowAttendance}
          subtitle="Attendance < 60%"
          icon={Calendar}
          variant="warning"
          active={mode === 'attendance'}
          onClick={() => setMode('attendance')}
        />
        <StatCard
          title="Assignment Risk"
          value={stats.pendingAssignments}
          subtitle="More than 2 pending"
          icon={FileText}
          variant="warning"
          active={mode === 'assignments'}
          onClick={() => setMode('assignments')}
        />
        <StatCard
          title="Skill Score Impact"
          value={stats.lowSkill}
          subtitle="Skill points < 60"
          icon={Sparkles}
          variant="success"
          active={mode === 'skill'}
          onClick={() => setMode('skill')}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            {mode === 'overall' ? 'All Students' :
             mode === 'marks' ? 'Students with Low Marks' :
             mode === 'attendance' ? 'Students with Low Attendance' :
             mode === 'assignments' ? 'Students with Pending Assignments' :
             'Students with Low Skill Points'}
          </h2>
          <p className="text-sm text-muted-foreground">Click any analytics card above to filter the list.</p>
        </div>
      </div>

      <StudentTable students={scoped} filterMode={mode} />
    </div>
  );
};

export default Dashboard;
