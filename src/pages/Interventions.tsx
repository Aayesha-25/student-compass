import { Card } from '@/components/ui/card';
import { useStudents } from '@/store/students';

const Interventions = () => {
  const { interventions, students } = useStudents();
  const getName = (id: string) => students.find((s) => s.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Interventions Log</h2>
        <p className="text-sm text-muted-foreground">All recorded interventions across students.</p>
      </div>
      <Card className="p-6">
        {interventions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No interventions recorded yet. Open a student profile to add one.</p>
        ) : (
          <div className="space-y-3">
            {interventions.map((i) => (
              <div key={i.id} className="p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="font-semibold text-foreground text-sm">{i.type}</div>
                    <div className="text-xs text-muted-foreground">For: {getName(i.studentId)}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(i.date).toLocaleString()}</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{i.notes}</p>
                <div className="text-xs text-muted-foreground mt-1">By {i.by}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Interventions;
