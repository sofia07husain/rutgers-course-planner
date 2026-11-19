import { Section } from '../data/courses';

function formatTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

export function formatMeetings(section: Section): string {
  if (section.meetings.length === 0) return 'Online / no set meeting time';

  // merge meetings that share the same time, so T + H becomes "TH"
  const groups = new Map<string, { days: string; start: number; end: number; campus: string }>();
  for (const m of section.meetings) {
    const key = `${m.start}-${m.end}-${m.campus}`;
    const g = groups.get(key);
    if (g) g.days += m.day;
    else groups.set(key, { days: m.day, start: m.start, end: m.end, campus: m.campus });
  }

  return Array.from(groups.values())
    .map((g) => `${g.days} ${formatTime(g.start)} - ${formatTime(g.end)} (${g.campus})`)
    .join(' · ');
}