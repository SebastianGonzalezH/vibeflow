'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isDragOverlay?: boolean;
}

export function TaskCard({ task, onEdit, onDelete, isDragOverlay }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative rounded-xl p-4 cursor-grab active:cursor-grabbing',
        'bg-white/[0.04] hover:bg-white/[0.07]',
        'border border-white/[0.06] hover:border-white/[0.1]',
        'shadow-[0_2px_8px_rgba(0,0,0,0.15)]',
        'hover:shadow-[0_8px_24px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.08)]',
        'transition-all duration-200',
        isDragging && 'opacity-40 scale-[0.98]',
        isDragOverlay && 'shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-amber-400/30 bg-white/[0.08]'
      )}
      {...attributes}
      {...listeners}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium text-foreground leading-relaxed flex-1">
            {task.title}
          </h3>

          {/* Action buttons */}
          <div className={cn(
            'flex gap-0.5 transition-all duration-200',
            'opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0'
          )}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className={cn(
                'p-1.5 rounded-lg transition-all duration-150',
                'text-foreground-muted hover:text-foreground',
                'hover:bg-white/[0.08]'
              )}
              title="Edit"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className={cn(
                'p-1.5 rounded-lg transition-all duration-150',
                'text-foreground-muted hover:text-red-400',
                'hover:bg-red-400/10'
              )}
              title="Delete"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>

        {task.description && (
          <p className="mt-2 text-xs text-foreground-muted leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Bottom accent line on hover */}
      <div className={cn(
        'absolute bottom-0 left-4 right-4 h-px transition-all duration-300',
        'bg-gradient-to-r from-transparent via-amber-400/0 to-transparent',
        'group-hover:via-amber-400/40'
      )} />
    </div>
  );
}
