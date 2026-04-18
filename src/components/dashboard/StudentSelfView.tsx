import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStudents } from '@/store/students';
import { calculateRisk, suggestActions } from '@/utils/risk';
import RiskBadge from './RiskBadge';
import { BookOpen, Calendar, FileText, Sparkles, TrendingUp } from 'lucide-react';

const StudentSelfView = ({ studentId }: { studentId: string }) => {
  const students = useStudents((s) => s.students);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Student profile not found.</p>
      </Card>
    );
  }

  const risk = calculateRisk(student);
  const suggestions = suggestActions(student);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary-soft to-card border-primary/10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Your profile</div>
            <h2 className="text-2xl font-bold text-foreground mt-1">{student.name}</h2>
            <div className="text-sm text-muted-foreground">{student.rollNo} · {student.className}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <RiskBadge level={risk.level} />
            <div className="text-xs text-muted-foreground">Risk score: <strong className="text-foreground">{risk.score}</strong></div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <Calendar className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground">{student.attendance}%</div>
          <div className="text-sm text-muted-foreground">Attendance</div>
        </Card>
        <Card className="p-5">
          <BookOpen className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground">{student.marks}%</div>
          <div className="text-sm text-muted-foreground">Marks</div>
        </Card>
        <Card className="p-5">
          <FileText className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground">{student.assignmentsPending}</div>
          <div className="text-sm text-muted-foreground">Pending Assignments</div>
        </Card>
        <Card className="p-5">
          <Sparkles className="h-5 w-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground">{student.skillPoints}</div>
          <div className="text-sm text-muted-foreground">Skill Points</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Suggestions to improve
        </h3>
        <ul className="space-y-2">
          {suggestions.map((s, i) => (
            <li key={i} className="flex gap-3 items-start text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-foreground">{s}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Button asChild variant="outline">
        <Link to={`/students/${student.id}`}>View full report</Link>
      </Button>
    </div>
  );
};

export default StudentSelfView;
