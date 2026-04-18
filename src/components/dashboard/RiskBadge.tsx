import { cn } from '@/lib/utils';
import { RiskLevel } from '@/utils/risk';

const styles: Record<RiskLevel, string> = {
  HIGH: 'bg-danger-soft text-danger border-danger/20',
  MEDIUM: 'bg-warning-soft text-warning border-warning/20',
  LOW: 'bg-success-soft text-success border-success/20',
};

const RiskBadge = ({ level, className }: { level: RiskLevel; className?: string }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
      styles[level],
      className
    )}
  >
    <span className={cn('h-1.5 w-1.5 rounded-full',
      level === 'HIGH' ? 'bg-danger' : level === 'MEDIUM' ? 'bg-warning' : 'bg-success'
    )} />
    {level}
  </span>
);

export default RiskBadge;
