import { Section } from '../data/courses';

// two sections conflict if any meeting shares a day and the times overlap
export function hasConflict(a: Section, b: Section): boolean {
  return a.meetings.some((ma) =>
    b.meetings.some((mb) => ma.day === mb.day && ma.start < mb.end && mb.start < ma.end)
  );
}

export function findConflicts(section: Section, list: Section[]): Section[] {
  return list.filter((s) => s.id !== section.id && hasConflict(section, s));
}