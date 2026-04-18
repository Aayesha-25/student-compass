import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'danger' | 'warning' | 'success';
}

const variantStyles = {
  default: 'bg-primary-soft text-primary',
  danger: 'bg-danger-soft text-danger',
  warning: 'bg-warning-soft text-warning',
  success: 'bg-success-soft text-success',
};

const StatCard = ({ title, value, subtitle, icon: Icon, active, onClick, variant = 'default' }: StatCardProps) => (
  <Card
    onClick={onClick}
    className={cn(
      'p-5 cursor-pointer transition-all hover:shadow-elevated hover:-translate-y-0.5 border',
      active ? 'ring-2 ring-primary border-primary shadow-elevated' : 'border-border',
    )}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center', variantStyles[variant])}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="text-2xl font-bold text-foreground">{value}</div>
    <div className="text-sm font-medium text-foreground/80 mt-0.5">{title}</div>
    {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
  </Card>
);

export default StatCard;
