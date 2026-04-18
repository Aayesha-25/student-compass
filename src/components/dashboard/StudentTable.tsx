import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Student } from '@/data/students';
import { calculateRisk, RiskLevel } from '@/utils/risk';
import RiskBadge from './RiskBadge';
import { cn } from '@/lib/utils';

interface StudentTableProps {
  students: Student[];
  filterMode?: 'overall' | 'marks' | 'attendance' | 'assignments' | 'skill';
}

const StudentTable = ({ students, filterMode = 'overall' }: StudentTableProps) => {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'ALL'>('ALL');

  const filtered = useMemo(() => {
    let list = students.map((s) => ({ ...s, risk: calculateRisk(s) }));

    if (filterMode === 'marks') list = list.filter((s) => s.marks < 40);
    else if (filterMode === 'attendance') list = list.filter((s) => s.attendance < 60);
    else if (filterMode === 'assignments') list = list.filter((s) => s.assignmentsPending > 2);
    else if (filterMode === 'skill') list = list.filter((s) => s.skillPoints < 60);

    if (riskFilter !== 'ALL') list = list.filter((s) => s.risk.level === riskFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) =>
        s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q) || s.className.toLowerCase().includes(q)
      );
    }
    return list;
  }, [students, search, riskFilter, filterMode]);

  return (
    <Card className="border-border overflow-hidden">
      <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, roll, class…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={riskFilter} onValueChange={(v) => setRiskFilter(v as RiskLevel | 'ALL')}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All risk levels</SelectItem>
            <SelectItem value="HIGH">High risk</SelectItem>
            <SelectItem value="MEDIUM">Medium risk</SelectItem>
            <SelectItem value="LOW">Low risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-4 py-3">Student</th>
              <th className="text-left font-medium px-4 py-3">Class</th>
              <th className="text-left font-medium px-4 py-3">Attendance</th>
              <th className="text-left font-medium px-4 py-3">Marks</th>
              <th className="text-left font-medium px-4 py-3">Pending</th>
              <th className="text-left font-medium px-4 py-3">Skill</th>
              <th className="text-left font-medium px-4 py-3">Risk</th>
              <th className="text-right font-medium px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className={cn(
                'border-t border-border hover:bg-muted/30 transition-colors',
                s.risk.level === 'HIGH' && 'bg-danger-soft/30'
              )}>
                <td className="px-4 py-3">
                  <div className="font-semibold text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.rollNo}</div>
                </td>
                <td className="px-4 py-3 text-foreground">{s.className}</td>
                <td className={cn('px-4 py-3 font-medium', s.attendance < 60 ? 'text-danger' : 'text-foreground')}>{s.attendance}%</td>
                <td className={cn('px-4 py-3 font-medium', s.marks < 40 ? 'text-danger' : 'text-foreground')}>{s.marks}%</td>
                <td className={cn('px-4 py-3 font-medium', s.assignmentsPending > 2 ? 'text-danger' : 'text-foreground')}>{s.assignmentsPending}</td>
                <td className="px-4 py-3 text-foreground">{s.skillPoints}</td>
                <td className="px-4 py-3"><RiskBadge level={s.risk.level} /></td>
                <td className="px-4 py-3 text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link to={`/students/${s.id}`}><Eye className="h-4 w-4 mr-1" /> View</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center py-12 text-muted-foreground">No students match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentTable;
