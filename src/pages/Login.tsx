import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useAuth, MOCK_CREDENTIALS, Role } from '@/store/auth';
import { toast } from 'sonner';

const roleLabels: Record<Role, string> = {
  student: 'Student',
  teacher: 'Teacher',
  mentor: 'Mentor',
  class_teacher: 'Class Teacher',
};

const Login = () => {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const [role, setRole] = useState<Role>('class_teacher');
  const [email, setEmail] = useState(MOCK_CREDENTIALS.class_teacher.email);
  const [password, setPassword] = useState(MOCK_CREDENTIALS.class_teacher.password);

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setEmail(MOCK_CREDENTIALS[r].email);
    setPassword(MOCK_CREDENTIALS[r].password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cred = MOCK_CREDENTIALS[role];
    if (email === cred.email && password === cred.password) {
      login({ email, name: cred.name, role, studentId: cred.studentId });
      toast.success(`Welcome, ${cred.name}`);
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials. Use the demo credentials shown.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-soft via-background to-background p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-medium">
            <ShieldCheck className="h-4 w-4" /> Student Compass MVP
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Student<br />
            <span className="text-primary">Compass System</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A comprehensive system for multi-factor risk detection and intervention tracking, designed to help faculty support student success through data-driven insights.
          </p>
        </div>

        <Card className="p-8 shadow-elevated border-border/50 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elevated">
              <Compass className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Sign in</h2>
              <p className="text-sm text-muted-foreground">Choose your role to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(v) => handleRoleChange(v as Role)}>
                <SelectTrigger id="role"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(roleLabels) as Role[]).map((r) => (
                    <SelectItem key={r} value={r}>{roleLabels[r]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold shadow-elevated">
              Sign In
            </Button>
            <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 mt-3">
              <strong className="text-foreground">Demo credentials</strong> are auto-filled when you change role.
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
