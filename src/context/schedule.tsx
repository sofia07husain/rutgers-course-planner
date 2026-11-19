import { createContext, ReactNode, useContext, useState } from 'react';
import { Section } from '../data/courses';

type ScheduleContextType = {
  mySections: Section[];
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  hasSection: (id: string) => boolean;
};

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [mySections, setMySections] = useState<Section[]>([]);

  const addSection = (section: Section) => setMySections((prev) => [...prev, section]);
  const removeSection = (id: string) => setMySections((prev) => prev.filter((s) => s.id !== id));
  const hasSection = (id: string) => mySections.some((s) => s.id === id);

  return (
    <ScheduleContext.Provider value={{ mySections, addSection, removeSection, hasSection }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedule must be used inside ScheduleProvider');
  return ctx;
}