'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { AddTaskForm } from './AddTaskForm';
import { cn } from '@/lib/utils';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask: (title: string, description: string, status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const columnConfig: Record<TaskStatus, { icon: React.ReactNode; accent: string }> = {
  'todo': {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    accent: 'from-amber-400/20 to-orange-400/10',
  },
  'in-progress': {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    accent: 'from-blue-400/20 to-cyan-400/10',
  },
  'complete': {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    accent: 'from-emerald-400/20 to-green-400/10',
  },
};

export function Column({ id, title, tasks, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = columnConfig[id];

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl min-h-[500px] transition-all duration-300',
        'bg-white/[0.02] backdrop-blur-xl',
        'border border-white/[0.06]',
        'shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]',
        isOver && 'border-amber-400/30 bg-white/[0.04] shadow-[0_0_30px_rgba(245,158,11,0.1)]'
      )}
    >
      {/* Column Header */}
      <div className={cn(
        'p-5 rounded-t-2xl bg-gradient-to-b',
        config.accent
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={cn(
              'text-foreground-secondary transition-colors',
              isOver && 'text-amber-400'
            )}>
              {config.icon}
            </span>
            <h2
              className="text-sm font-semibold text-foreground tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h2>
          </div>
          <span className={cn(
            'text-xs font-medium px-2.5 py-1 rounded-full transition-colors',
            'bg-white/[0.06] text-foreground-secondary',
            tasks.length > 0 && 'text-foreground'
          )}>
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-2.5 p-4 overflow-y-auto"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground-muted">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <p className="text-xs text-foreground-muted">No tasks yet</p>
          </div>
        )}
      </div>

      {/* Add Task */}
      {id !== 'complete' && (
        <div className="p-4 pt-0">
          <AddTaskForm status={id} onAdd={onAddTask} />
        </div>
      )}
    </div>
  );
}
