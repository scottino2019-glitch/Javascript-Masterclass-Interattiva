/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { Playground } from './components/Playground';
import { APP_MODULES } from './data/lessons';
import { Lesson } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(APP_MODULES[0].lessons[0]);
  const [showPlayground, setShowPlayground] = useState(true);

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Refined Header */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center font-bold text-slate-900 shadow-sm">
            JS
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">Mastering JavaScript 360°</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progresso:</span>
            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-emerald-500 rounded-full transition-all duration-1000" />
            </div>
            <span className="text-sm font-bold text-emerald-600">65%</span>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <button 
            onClick={() => setShowPlayground(!showPlayground)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition-all active:scale-95 shadow-md shadow-slate-200"
          >
            <Terminal size={14} />
            {showPlayground ? 'Chiudi Playground' : 'Playground Code'}
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex flex-1 overflow-hidden">
        <Sidebar 
          modules={APP_MODULES} 
          activeLesson={activeLesson} 
          onSelectLesson={handleSelectLesson} 
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Lesson Content Section */}
          <section className={`${showPlayground ? 'w-1/2' : 'w-full'} flex flex-col transition-all duration-500 ease-in-out bg-white border-r border-slate-200 overflow-hidden`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLesson.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto p-12 lg:p-16"
              >
                <LessonContent lesson={activeLesson} />
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Playground Section */}
          <AnimatePresence>
            {showPlayground && (
              <motion.section 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '50%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col bg-slate-900 overflow-hidden relative"
              >
                <div className="absolute inset-0 p-8">
                  <Playground initialCode={activeLesson.initialCode} />
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Persistent Footer */}
      <footer className="h-12 border-t border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-yellow-500" /> Suggerimento: Usa console.log() per debug</span>
          <span className="h-3 w-px bg-slate-200" />
          <span>Status: IDE Attiva</span>
        </div>
        <div>
          Lezione {activeLesson.id_mod === 'fondamentali' ? '1' : '14'} di 22 • JavaScript Academy Italia
        </div>
      </footer>
    </div>
  );
}
