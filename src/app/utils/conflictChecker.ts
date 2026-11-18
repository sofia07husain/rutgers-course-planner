import { Course } from '../../data/courses';

//in hours - not actual time !
function toMinutes(t : string) : number{
    const[time, period] = t.trim().split(' ');
    let[hours, minutes] = time.split(':').map(Number);
    if(period == 'PM' && hours !== 12)
        hours +=12; 
    if(period == 'AM' && hours === 12)
        hours = 0; 

    return hours * 60 + minutes;
}

function parseRange(range : string){
    const[start, end] = range.split('-');
    return{
        start: toMinutes(start) , end: toMinutes(end)
    };
}

function parseDays(days : string) : string[] {
    return days.split('');
}

export function hasConflict(a: Course, b: Course): boolean{
    const sharedDay = parseDays(a.days).some((d) => parseDays(b.days).includes(d));
    if(!sharedDay)
        return false;

    const ra = parseRange(a.time);
    const rb = parseRange(b.time); 
    return ra.start < rb.end && rb.start < ra.end;
}

//every course in the list that conflicts with the course : 
export function findConflicts(course : Course, list: Course[]): Course[]{
    return list.filter((c) => c.code !== course.code && hasConflict(course, c));
}