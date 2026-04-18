import { Student } from '@/data/students';

export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface RiskResult {
  score: number;
  level: RiskLevel;
  reasons: string[];
  adjustments: string[];
}

export function calculateRisk(s: Pick<Student, 'attendance' | 'marks' | 'assignmentsPending' | 'skillPoints' | 'medicalLeave'>): RiskResult {
  let score = 0;
  const reasons: string[] = [];
  const adjustments: string[] = [];

  if (s.attendance < 60) { score += 2; reasons.push(`Low attendance (${s.attendance}%)`); }
  if (s.marks < 40) { score += 2; reasons.push(`Low marks (${s.marks}%)`); }
  if (s.assignmentsPending > 2) { score += 1; reasons.push(`${s.assignmentsPending} assignments pending`); }
  if (s.skillPoints > 80) { score -= 1; adjustments.push(`High skill points (${s.skillPoints}) reduces risk`); }
  if (s.medicalLeave) { score -= 1; adjustments.push('Medical leave on record reduces risk'); }

  let level: RiskLevel = 'LOW';
  if (score >= 4) level = 'HIGH';
  else if (score >= 2) level = 'MEDIUM';

  return { score, level, reasons, adjustments };
}

export function suggestActions(s: Student): string[] {
  const out: string[] = [];
  if (s.attendance < 75) out.push('Attend classes regularly to improve attendance');
  if (s.marks < 60) out.push('Schedule extra study time and request subject mentoring');
  if (s.assignmentsPending > 0) out.push(`Complete ${s.assignmentsPending} pending assignments`);
  if (s.skillPoints < 60) out.push('Participate in skill-building workshops and projects');
  if (out.length === 0) out.push('Keep up the great work! Continue current study habits.');
  return out;
}
