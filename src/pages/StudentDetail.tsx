import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, FileText, Sparkles, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useStudents, Intervention } from '@/store/students';
import { useAuth } from '@/store/auth';
import { calculateRisk, suggestActions } from '@/utils/risk';
import RiskBadge from '@/components/dashboard/RiskBadge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const { students, interventions, addIntervention } = useStudents();
  const student = students.find((s) => s.id === id);

  const [notes, setNotes] = useState('');

  if (!student) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Student not found.</p>
        <Button asChild variant="link"><Link to="/students">Back to students</Link></Button>
      </div>
    );
  }

  const risk = calculateRisk(student);
  const suggestions = suggestActions(student);
  const studentInterventions = interventions.filter((i) => i.studentId === student.id);
  const canIntervene = user?.role === 'mentor' || user?.role === 'teacher' || user?.role === 'class_teacher';

  const handleAddIntervention = (type: Intervention['type']) => {
    if (!notes.trim()) { toast.error('Please add notes about this intervention.'); return; }
    addIntervention({
      id: `i${Date.now()}`,
      studentId: student.id,
      type,
      notes: notes.trim(),
      date: new Date().toISOString(),
      by: user?.name || 'Unknown',
    });
    setNotes('');
    toast.success(`Intervention recorded: ${type}`);
  };

  const stats = [
    { icon: Calendar, label: 'Attendance', value: `${student.attendance}%`, danger: student.attendance < 60 },
    { icon: BookOpen, label: 'Marks', value: `${student.marks}%`, danger: student.marks < 40 },
    { icon: FileText, label: 'Pending Assignments', value: student.assignmentsPending, danger: student.assignmentsPending > 2 },
    { icon: Sparkles, label: 'Skill Points', value: student.skillPoints, danger: false },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Button>

      {/* Profile header */}
      <Card className="p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {student.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
              <div className="text-sm text-muted-foreground">{student.rollNo} · {student.className} · {student.email}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <RiskBadge level={risk.level} />
            <div className="text-xs text-muted-foreground">Risk score: <strong className="text-foreground">{risk.score}</strong></div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <s.icon className={cn('h-5 w-5 mb-2', s.danger ? 'text-danger' : 'text-primary')} />
            <div className={cn('text-2xl font-bold', s.danger ? 'text-danger' : 'text-foreground')}>{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Explainable insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-danger" /> Why this risk level?
          </h3>
          {risk.reasons.length === 0 && <p className="text-sm text-muted-foreground">No risk factors detected — this student is performing well.</p>}
          <ul className="space-y-2">
            {risk.reasons.map((r, i) => (
              <li key={i} className="flex gap-2 items-start text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-danger shrink-0" />
                <span className="text-foreground">{r}</span>
              </li>
            ))}
          </ul>
          {risk.adjustments.length > 0 && (
            <>
              <div className="mt-4 pt-4 border-t border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">Adjustments</div>
              <ul className="space-y-2 mt-2">
                {risk.adjustments.map((a, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                    <span className="text-muted-foreground">{a}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" /> Suggested Actions
          </h3>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex gap-2 items-start text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-foreground">{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Performance timeline */}
      <Card className="p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Performance Over Time
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {student.history.map((h) => (
            <div key={h.week} className="p-4 rounded-xl border border-border text-center bg-muted/30">
              <div className="text-xs text-muted-foreground mb-2">{h.week}</div>
              <RiskBadge level={h.risk} />
            </div>
          ))}
          <div className="p-4 rounded-xl border-2 border-primary text-center bg-primary-soft">
            <div className="text-xs text-primary font-semibold mb-2">Current</div>
            <RiskBadge level={risk.level} />
          </div>
        </div>
      </Card>

      {/* Subjects */}
      <Card className="p-6">
        <h3 className="font-bold text-foreground mb-4">Subject Breakdown</h3>
        <div className="space-y-3">
          {student.subjects.map((sub) => (
            <div key={sub.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground font-medium">{sub.name}</span>
                <span className={cn('font-semibold', sub.marks < 40 ? 'text-danger' : sub.marks < 60 ? 'text-warning' : 'text-success')}>{sub.marks}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={cn('h-full rounded-full transition-all', sub.marks < 40 ? 'bg-danger' : sub.marks < 60 ? 'bg-warning' : 'bg-success')} style={{ width: `${sub.marks}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Interventions */}
      {canIntervene && (
        <Card className="p-6">
          <h3 className="font-bold text-foreground mb-1">Record Intervention</h3>
          <p className="text-sm text-muted-foreground mb-4">Document actions taken to support this student.</p>
          <Textarea
            placeholder="Add notes about what was discussed or planned…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mb-3"
            rows={3}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => handleAddIntervention('Counselling Done')}>Counselling Done</Button>
            <Button size="sm" variant="secondary" onClick={() => handleAddIntervention('Extra Class Given')}>Extra Class Given</Button>
            <Button size="sm" variant="outline" onClick={() => handleAddIntervention('Assignment Extended')}>Assignment Extended</Button>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="font-bold text-foreground mb-4">Intervention History</h3>
        {studentInterventions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No interventions recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {studentInterventions.map((i) => (
              <div key={i.id} className="p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-foreground text-sm">{i.type}</div>
                  <div className="text-xs text-muted-foreground">{new Date(i.date).toLocaleDateString()}</div>
                </div>
                <p className="text-sm text-muted-foreground">{i.notes}</p>
                <div className="text-xs text-muted-foreground mt-1">By {i.by}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentDetail;
