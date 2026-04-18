import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useStudents } from '@/store/students';
import { toast } from 'sonner';

const AddStudent = () => {
  const navigate = useNavigate();
  const addStudent = useStudents((s) => s.addStudent);
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    className: 'CSE-A',
    email: '',
    attendance: 75,
    marks: 60,
    assignmentsPending: 0,
    skillPoints: 70,
    medicalLeave: false,
  });

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      id: `s${Date.now()}`,
      ...form,
      attendance: Number(form.attendance),
      marks: Number(form.marks),
      assignmentsPending: Number(form.assignmentsPending),
      skillPoints: Number(form.skillPoints),
      subjects: [
        { name: 'Mathematics', marks: Number(form.marks) },
        { name: 'Physics', marks: Number(form.marks) },
        { name: 'Programming', marks: Number(form.marks) },
      ],
      history: [{ week: 'Week 1', risk: 'MEDIUM' }],
    });
    toast.success(`${form.name} added successfully`);
    navigate('/students');
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-foreground mb-1">Add Student</h2>
      <p className="text-sm text-muted-foreground mb-6">Create a new student profile to track risk and progress.</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label>Full Name</Label>
            <Input required value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div className="space-y-2"><Label>Roll No</Label><Input required value={form.rollNo} onChange={(e) => set('rollNo', e.target.value)} /></div>
          <div className="space-y-2"><Label>Class</Label><Input required value={form.className} onChange={(e) => set('className', e.target.value)} /></div>
          <div className="space-y-2 sm:col-span-2"><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
          <div className="space-y-2"><Label>Attendance (%)</Label><Input type="number" min={0} max={100} value={form.attendance} onChange={(e) => set('attendance', e.target.value)} /></div>
          <div className="space-y-2"><Label>Marks (%)</Label><Input type="number" min={0} max={100} value={form.marks} onChange={(e) => set('marks', e.target.value)} /></div>
          <div className="space-y-2"><Label>Assignments Pending</Label><Input type="number" min={0} value={form.assignmentsPending} onChange={(e) => set('assignmentsPending', e.target.value)} /></div>
          <div className="space-y-2"><Label>Skill Points</Label><Input type="number" min={0} max={100} value={form.skillPoints} onChange={(e) => set('skillPoints', e.target.value)} /></div>
          <div className="flex items-center justify-between sm:col-span-2 p-3 rounded-lg bg-muted/40">
            <div>
              <div className="font-medium text-foreground text-sm">Medical Leave</div>
              <div className="text-xs text-muted-foreground">Reduces risk score by 1</div>
            </div>
            <Switch checked={form.medicalLeave} onCheckedChange={(v) => set('medicalLeave', v)} />
          </div>
          <div className="sm:col-span-2 flex gap-3 mt-2">
            <Button type="submit" className="flex-1">Add Student</Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddStudent;
