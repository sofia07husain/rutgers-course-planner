const fs = require('fs');

const URL = 'https://classes.rutgers.edu/soc/api/courses.json?year=2027&term=1&campus=NB';
const SUBJECTS = ['198', '640']; // 198 = Computer Science, 640 = Mathematics

async function main() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error('Rutgers API error: ' + res.status);
  const all = await res.json();
  console.log('Downloaded', all.length, 'courses total');

  const courses = all
    .filter((c) => SUBJECTS.includes(c.subject))
    .map((c) => ({
      courseString: c.courseString,
      subject: c.subject,
      courseNumber: c.courseNumber,
      title: c.expandedTitle || c.title,
      credits: c.credits,
      sections: c.sections.map((s) => ({
        number: s.number,
        index: s.index,
        open: s.openStatus,
        instructors: s.instructors.map((i) => i.name),
        meetings: s.meetingTimes.map((m) => ({
          day: m.meetingDay,
          start: m.startTimeMilitary,
          end: m.endTimeMilitary,
          campus: m.campusAbbrev,
          mode: m.meetingModeDesc,
          building: m.buildingCode,
          room: m.roomNumber,
        })),
      })),
    }));

  fs.writeFileSync('src/data/rutgers-courses.json', JSON.stringify(courses, null, 2));
  console.log('Saved', courses.length, 'CS and Math courses to src/data/rutgers-courses.json');
}

main().catch((err) => console.error('Failed:', err));