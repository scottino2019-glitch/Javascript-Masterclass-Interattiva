import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Lesson } from '../types';
import { BookOpen, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LessonContentProps {
  lesson: Lesson;
}

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded mb-6 tracking-widest shadow-sm">
          Modulo {lesson.id_mod.toUpperCase()}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
          {lesson.title}
        </h2>
        <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl">
          {lesson.description}
        </p>
      </div>

      <div className="markdown-body">
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
      </div>

      {lesson.challenge && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200"
        >
          <div className="flex items-center gap-3 text-slate-900 font-bold mb-4 uppercase tracking-widest text-xs">
            <HelpCircle size={18} className="text-emerald-500" />
            Sfida Pratica
          </div>
          <p className="text-slate-600 font-medium italic leading-relaxed">
            {lesson.challenge}
          </p>
        </motion.div>
      )}

      {/* Decorative summary box in minimalist style */}
      <div className="mt-16 pt-16 border-t border-slate-100 grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Durata Stimata</span>
          <span className="text-sm font-bold text-slate-700">12 Minuti</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Difficoltà</span>
          <span className="text-sm font-bold text-slate-700">Intermedio</span>
        </div>
      </div>
    </div>
  );
};
