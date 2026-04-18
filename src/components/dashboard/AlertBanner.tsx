import { AlertTriangle } from 'lucide-react';

const AlertBanner = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-danger-soft border border-danger/20 mb-6 animate-fade-in">
      <div className="h-10 w-10 rounded-lg bg-danger/10 flex items-center justify-center shrink-0">
        <AlertTriangle className="h-5 w-5 text-danger" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-danger">⚠️ {count} HIGH-RISK STUDENT{count > 1 ? 'S' : ''} REQUIRE ATTENTION</div>
        <div className="text-sm text-danger/80">Immediate intervention recommended for these students.</div>
      </div>
    </div>
  );
};

export default AlertBanner;
