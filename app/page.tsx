'use client';

import { Board } from '@/components/Board';
import { QuickTodos } from '@/components/QuickTodos';
import { Notes } from '@/components/Notes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Task, TodoItem } from '@/types';

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('vibeflow-tasks', []);
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('vibeflow-todos', []);
  const [notes, setNotes] = useLocalStorage<string>('vibeflow-notes', '');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl rotate-6 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-black/80">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h1 className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              vibeflow
            </h1>
          </div>

          {/* Current date */}
          <div className="flex items-center gap-4">
            <time className="text-sm text-foreground-muted">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center">
              <span className="text-xs font-medium text-amber-400">SG</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex px-8 pb-8 gap-6 relative z-10">
        {/* Board Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Board tasks={tasks} onUpdateTasks={setTasks} />
        </div>

        {/* Sidebar */}
        <aside className="w-72 flex flex-col gap-5 shrink-0">
          <QuickTodos todos={todos} onUpdate={setTodos} />
          <Notes notes={notes} onUpdate={setNotes} />
        </aside>
      </main>
    </div>
  );
}
