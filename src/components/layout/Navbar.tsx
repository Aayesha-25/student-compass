import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, ClipboardList, LayoutDashboard, LogOut, Menu, UserPlus, Users, X } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { useStudents } from '@/store/students';
import { calculateRisk } from '@/utils/risk';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student', 'teacher', 'mentor', 'class_teacher'] },
  { to: '/students', label: 'Students', icon: Users, roles: ['teacher', 'mentor', 'class_teacher'] },
  { to: '/students/new', label: 'Add Student', icon: UserPlus, roles: ['class_teacher'] },
  { to: '/interventions', label: 'Interventions', icon: ClipboardList, roles: ['mentor', 'teacher', 'class_teacher'] },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const students = useStudents((s) => s.students);
  const highRiskCount = students.filter((s) => calculateRisk(s).level === 'HIGH').length;
  const [menuOpen, setMenuOpen] = useState(false);

  const canGoBack = location.pathname !== '/dashboard';
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border h-16 flex items-center px-4 sm:px-6 justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {canGoBack && (
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-foreground truncate">
              Welcome back, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-xs text-muted-foreground capitalize truncate">{user?.role.replace('_', ' ')} dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative p-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {highRiskCount > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-danger text-danger-foreground text-[10px] font-bold flex items-center justify-center">
                {highRiskCount}
              </span>
            )}
          </div>
          <div className="hidden sm:flex h-9 w-9 rounded-full bg-gradient-primary items-center justify-center text-primary-foreground font-semibold text-sm">
            {user?.name?.[0]}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[80vw] bg-sidebar border-r border-sidebar-border flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
              <div className="font-bold text-sidebar-foreground">Menu</div>
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.filter((i) => user && i.roles.includes(user.role)).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  onClick={() => setMenuOpen(false)}
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
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
