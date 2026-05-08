import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface PlaygroundProps {
  initialCode?: string;
}

export const Playground: React.FC<PlaygroundProps> = ({ initialCode = "" }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
  }, [initialCode]);

  const runCode = () => {
    setIsRunning(true);
    const logs: string[] = [];
    
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => {
          if (typeof arg === 'object') {
            try { return JSON.stringify(arg, null, 2); } catch (e) { return '[Object]'; }
          }
          return String(arg);
        }).join(' '));
      },
      error: (...args: any[]) => logs.push('❌ Error: ' + args.join(' ')),
      warn: (...args: any[]) => logs.push('⚠️ Warning: ' + args.join(' '))
    };

    try {
      if (previewRef.current) {
        // We clean preview on every run to avoid stacking
        previewRef.current.innerHTML = '';
      }
      const execute = new Function('console', 'preview', code);
      execute(mockConsole, previewRef.current);
      if (logs.length === 0) logs.push('// Codice eseguito con successo.');
    } catch (err: any) {
      logs.push('🔴 Errore: ' + err.message);
    }

    setOutput(logs);
    setIsRunning(false);
  };

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5 playground-scrollbar group">
      {/* IDE Window Header */}
      <div className="h-12 flex items-center justify-between px-6 bg-slate-800/40 border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest hidden sm:inline">playground.js</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (previewRef.current) previewRef.current.innerHTML = '';
              setCode(initialCode);
              setOutput([]);
            }}
            className="p-2 text-slate-500 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="group/run flex items-center gap-2 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-[11px] font-black uppercase rounded-lg transition-all active:scale-95 disabled:opacity-50"
          >
            <Play size={12} fill="currentColor" className="group-hover/run:scale-110 transition-transform" />
            Esegui
          </button>
        </div>
      </div>

      {/* Editor & Content Split */}
      <div className="flex flex-col flex-1 min-h-0 bg-slate-900/50 backdrop-blur-sm">
        {/* Editor Area */}
        <div className="flex-1 relative overflow-auto custom-scrollbar border-b border-white/5">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-full p-8 bg-transparent text-emerald-100/90 font-mono text-sm resize-none outline-none focus:ring-0 leading-relaxed selection:bg-emerald-500/30"
            placeholder="// Scrivi il tuo codice JavaScript qui..."
          />
        </div>

        {/* Live Preview Area */}
        <div className="h-[180px] bg-white relative overflow-hidden shrink-0">
          <div className="absolute top-2 right-2 z-10 px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-400 uppercase tracking-tighter shadow-sm">Preview Visiva / DOM</div>
          <div 
            ref={previewRef}
            className="w-full h-full p-6 overflow-auto text-slate-800"
            id="preview-sandbox"
          >
            <div className="h-full flex items-center justify-center text-slate-300 text-[11px] italic text-center">
              L'HTML generato dal tuo codice apparirà qui.<br/>Usa l'oggetto 'preview'.
            </div>
          </div>
        </div>

        {/* Console Area */}
        <div className="h-[120px] bg-black border-t border-white/5 flex flex-col shrink-0">
          <div className="flex items-center justify-between px-6 py-2 bg-slate-900/80 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <span className="flex items-center gap-2"><Terminal size={12} /> Console Log</span>
            <button onClick={() => setOutput([])} className="hover:text-white transition-colors">Pulisci</button>
          </div>
          <div className="flex-1 p-6 overflow-auto font-mono text-[13px] custom-scrollbar">
            {output.length > 0 ? (
              output.map((line, i) => (
                <div key={i} className="mb-2 leading-relaxed">
                  <span className="text-slate-600 mr-3 select-none">{">"}</span>
                  <span className={cn(
                    line.startsWith('🔴') || line.startsWith('❌') ? "text-red-400" : 
                    line.startsWith('⚠️') ? "text-yellow-300" :
                    "text-emerald-400"
                  )}>
                    {line}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 text-slate-700 animate-pulse">
                <span>_</span>
                <span className="text-[11px] uppercase font-bold tracking-widest italic">In attesa dell'esecuzione...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
