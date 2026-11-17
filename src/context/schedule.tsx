import { createContext, ReactNode, useContext, useState } from 'react';
import { Course } from '../data/courses';

type ScheduleContextType = {
    myCourses : Course[];
    addCourse: (course : Course) => void; 
    removeCourse: (code: string) => void; 
    hasCourse: (code: string) => boolean; 
};

const ScheduleContext = createContext<ScheduleContextType| null>(null);

export function ScheduleProvider({children} : {children: ReactNode}){
    const[myCourses , setMyCourses] = useState<Course[]>([]);

    const addCourse = (course : Course) => {
        setMyCourses((prev) => [...prev, course]);
        //adds course to end
    };

    const removeCourse = (code : string) => {
        setMyCourses((prev) => prev.filter((c) => c.code != code));
    };

    const hasCourse = (code : string) => myCourses.some((c) => c.code == code);

    return(
        <ScheduleContext.Provider value = {{myCourses, addCourse, removeCourse, hasCourse}}>
            {children}
        </ScheduleContext.Provider>
    );
}

export function useSchedule(){
    const ctx = useContext(ScheduleContext); 
    if(!ctx) throw new Error('useSchedule must be inside ScheduleProvider'); 
    return ctx; 
}