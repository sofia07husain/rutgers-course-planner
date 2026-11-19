const URL = 'https://classes.rutgers.edu/soc/api/courses.json?year=2027&term=1&campus=NB';

export async function fetchRawCourses() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Rutgers API error: ${res.status}`);
  return res.json();
}
