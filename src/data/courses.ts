import raw from './rutgers-courses.json';

export type Meeting = {
  day: string;      // M T W H F S U (H = Thursday)
  start: number;    // minutes since midnight
  end: number;
  campus: string;   // CAC, BUS, LIV, ...
  mode: string;
  building: string;
  room: string;
};

export type Section = {
  id: string;       // Rutgers registration index, unique per section
  code: string;     // "CS 111"
  title: string;
  credits: number;
  section: string;  // "01"
  instructors: string[];
  open: boolean;
  meetings: Meeting[];
};

type RawMeeting = {
  day: string; start: string; end: string;
  campus: string; mode: string; building: string; room: string;
};
type RawSection = {
  number: string; index: string; open: boolean;
  instructors: string[]; meetings: RawMeeting[];
};
type RawCourse = {
  subject: string; courseNumber: string; title: string;
  credits: number | null; sections: RawSection[];
};

const SUBJECT_NAMES: Record<string, string> = { '198': 'CS', '640': 'MATH' };

// "1550" -> 950 (minutes since midnight)
function toMinutes(t: string): number {
  return Number(t.slice(0, 2)) * 60 + Number(t.slice(2, 4));
}

// one entry per section, across every course
export const SECTIONS: Section[] = (raw as unknown as RawCourse[]).flatMap((course) =>
  course.sections.map((s) => ({
    id: s.index,
    code: `${SUBJECT_NAMES[course.subject] ?? course.subject} ${course.courseNumber}`,
    title: course.title,
    credits: course.credits ?? 0,
    section: s.number,
    instructors: s.instructors,
    open: s.open,
    // online sections have blank days and times, so drop them
    meetings: s.meetings
      .filter((m) => m.day && m.start && m.end)
      .map((m) => ({
        day: m.day,
        start: toMinutes(m.start),
        end: toMinutes(m.end),
        campus: m.campus,
        mode: m.mode,
        building: m.building,
        room: m.room,
      })),
  }))
);