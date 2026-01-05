'use client';

import { useState } from 'react';
import { TodoItem } from '@/types';
import { generateId, cn } from '@/lib/utils';

interface QuickTodosProps {
  todos: TodoItem[];
  onUpdate: (todos: TodoItem[]) => void;
}

export function QuickTodos({ todos, onUpdate }: QuickTodosProps) {
  const [newTodo, setNewTodo] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: generateId(),
        text: newTodo.trim(),
        completed: false,
      };
      onUpdate([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleToggle = (id: string) => {
    onUpdate(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    onUpdate(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className={cn(
      'rounded-2xl overflow-hidden transition-all duration-300',
      'bg-white/[0.02] backdrop-blur-xl',
      'border border-white/[0.06]',
      'shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]'
    )}>
      {/* Header */}
      <div className="p-5 pb-4 bg-gradient-to-b from-amber-400/10 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-400" strokeLinecap="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Quick Todos
            </h2>
          </div>
          {todos.length > 0 && (
            <span className="text-xs text-foreground-muted">
              {completedCount}/{todos.length}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {todos.length > 0 && (
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Todos list */}
      <div className="px-5 pb-2 max-h-[240px] overflow-y-auto">
        {todos.length === 0 && (
          <p className="text-xs text-foreground-muted py-4 text-center">
            Add your first task below
          </p>
        )}
        <div className="space-y-1">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                'group flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg transition-all duration-150',
                'hover:bg-white/[0.04]',
                todo.completed && 'opacity-60'
              )}
            >
              <button
                onClick={() => handleToggle(todo.id)}
                className={cn(
                  'w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all duration-200',
                  'border-2',
                  todo.completed
                    ? 'bg-amber-400 border-amber-400'
                    : 'border-white/20 hover:border-amber-400/50'
                )}
              >
                {todo.completed && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-black">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span
                className={cn(
                  'flex-1 text-sm transition-all duration-200',
                  todo.completed
                    ? 'text-foreground-muted line-through'
                    : 'text-foreground'
                )}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                className={cn(
                  'p-1 rounded-md transition-all duration-150',
                  'opacity-0 group-hover:opacity-100',
                  'text-foreground-muted hover:text-red-400 hover:bg-red-400/10'
                )}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add todo form */}
      <div className="p-4 pt-2">
        <form onSubmit={handleAdd}>
          <div className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
            'bg-white/[0.03] border border-transparent',
            isFocused && 'bg-white/[0.05] border-amber-400/30'
          )}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground-muted flex-shrink-0" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Add a quick todo..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-muted focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
