'use client';

import { useState, useRef, useEffect } from 'react';
import { TaskStatus } from '@/types';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  status: TaskStatus;
  onAdd: (title: string, description: string, status: TaskStatus) => void;
}

export function AddTaskForm({ status, onAdd }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim(), status);
      setTitle('');
      setDescription('');
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'w-full flex items-center gap-2 py-2.5 px-3 rounded-xl',
          'text-sm text-foreground-muted',
          'hover:text-foreground hover:bg-white/[0.04]',
          'transition-all duration-200',
          'group'
        )}
      >
        <span className={cn(
          'w-5 h-5 rounded-lg flex items-center justify-center',
          'bg-white/[0.04] group-hover:bg-amber-400/20',
          'transition-all duration-200'
        )}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:text-amber-400 transition-colors" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span>Add task</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-3">
      {/* Title input */}
      <div className={cn(
        'rounded-xl overflow-hidden',
        'bg-white/[0.04] border border-white/[0.08]',
        'focus-within:border-amber-400/40 focus-within:bg-white/[0.06]',
        'transition-all duration-200'
      )}>
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className={cn(
            'w-full px-4 py-3 bg-transparent text-sm',
            'text-foreground placeholder:text-foreground-muted',
            'focus:outline-none'
          )}
        />
      </div>

      {/* Description input */}
      <div className={cn(
        'rounded-xl overflow-hidden',
        'bg-white/[0.03] border border-white/[0.06]',
        'focus-within:border-white/[0.12] focus-within:bg-white/[0.04]',
        'transition-all duration-200'
      )}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          rows={2}
          className={cn(
            'w-full px-4 py-2.5 bg-transparent text-sm resize-none',
            'text-foreground placeholder:text-foreground-muted',
            'focus:outline-none'
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="submit"
          disabled={!title.trim()}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
            'bg-gradient-to-r from-amber-400 to-orange-400 text-black/90',
            'hover:from-amber-300 hover:to-orange-300',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-amber-400 disabled:hover:to-orange-400',
            'transition-all duration-200',
            'shadow-[0_2px_8px_rgba(245,158,11,0.25)]',
            'hover:shadow-[0_4px_12px_rgba(245,158,11,0.35)]'
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={cn(
            'px-4 py-2 rounded-lg text-sm',
            'text-foreground-muted hover:text-foreground',
            'hover:bg-white/[0.04]',
            'transition-all duration-200'
          )}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
