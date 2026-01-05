'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface NotesProps {
  notes: string;
  onUpdate: (notes: string) => void;
}

export function Notes({ notes, onUpdate }: NotesProps) {
  const [localNotes, setLocalNotes] = useState(notes);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleChange = (value: string) => {
    setLocalNotes(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onUpdate(value);
    }, 500);
  };

  const wordCount = localNotes.trim() ? localNotes.trim().split(/\s+/).length : 0;

  return (
    <div className={cn(
      'flex-1 flex flex-col rounded-2xl overflow-hidden transition-all duration-300',
      'bg-white/[0.02] backdrop-blur-xl',
      'border border-white/[0.06]',
      'shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]',
      isFocused && 'border-white/[0.1]'
    )}>
      {/* Header */}
      <div className="p-5 pb-3 bg-gradient-to-b from-purple-400/10 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-400/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Notes
            </h2>
          </div>
          {wordCount > 0 && (
            <span className="text-xs text-foreground-muted">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 px-5 pb-5">
        <textarea
          value={localNotes}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Write your thoughts, ideas, or meeting notes..."
          className={cn(
            'w-full h-full min-h-[180px] resize-none',
            'bg-transparent text-sm leading-relaxed',
            'text-foreground placeholder:text-foreground-muted',
            'focus:outline-none'
          )}
        />
      </div>

      {/* Footer hint */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 text-xs text-foreground-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>Auto-saved</span>
        </div>
      </div>
    </div>
  );
}
