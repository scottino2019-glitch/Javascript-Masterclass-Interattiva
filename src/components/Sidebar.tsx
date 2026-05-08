import React from 'react';
import { Module, Lesson } from '../types';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  modules: Module[];
  activeLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ modules, activeLesson, onSelectLesson }) => {
  return (
    <div className="w-64 border-r border-slate-200 bg-white p-6 shrink-0 flex flex-col h-full overflow-y-auto z-10">
      <nav className="space-y-10">
        {modules.map((module) => (
          <section key={module.id}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-slate-200" />
              {module.title}
            </h2>
            <ul className="space-y-4">
              {module.lessons.map((lesson) => {
                const isActive = activeLesson.id === lesson.id;
                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => onSelectLesson(lesson)}
                      className={cn(
                        "group flex items-center gap-3 text-sm transition-all text-left w-full",
                        isActive 
                          ? "font-bold text-slate-900" 
                          : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300",
                        isActive 
                          ? "bg-emerald-500 scale-125 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                          : "bg-slate-200 group-hover:bg-slate-300"
                      )} />
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>

      <div className="mt-auto pt-10">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
            JS
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Licenza Studente</p>
            <p className="text-xs font-bold text-slate-700">Attiva</p>
          </div>
        </div>
      </div>
    </div>
  );
};
