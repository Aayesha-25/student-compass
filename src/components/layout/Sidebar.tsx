import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, LogOut, Compass, ClipboardList } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student', 'teacher', 'mentor', 'class_teacher'] as const },
    { to: '/students', label: 'Students', icon: Users, roles: ['teacher', 'mentor', 'class_teacher'] as const },
    { to: '/students/new', label: 'Add Student', icon: UserPlus, roles: ['class_teacher'] as const },
    { to: '/interventions', label: 'Interventions', icon: ClipboardList, roles: ['mentor', 'teacher', 'class_teacher'] as const },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold text-sidebar-foreground leading-tight">Student Compass</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Education Intelligence</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.filter(i => user && i.roles.includes(user.role as any)).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="px-3 py-2 mb-2">
          <div className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name}</div>
          <div className="text-xs text-muted-foreground capitalize">{user?.role.replace('_', ' ')}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
