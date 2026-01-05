'use client';

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { Task, TaskStatus, COLUMNS } from '@/types';
import { Column } from './Column';
import { TaskCard } from './TaskCard';

interface BoardProps {
  tasks: Task[];
  onUpdateTasks: (tasks: Task[]) => void;
}

export function Board({ tasks, onUpdateTasks }: BoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks
      .filter((task) => task.status === status)
      .sort((a, b) => a.order - b.order);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    if (isOverColumn) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        const updatedTasks = tasks.map((t) =>
          t.id === activeId ? { ...t, status: newStatus } : t
        );
        onUpdateTasks(updatedTasks);
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    if (overTask && activeTask.status !== overTask.status) {
      const updatedTasks = tasks.map((t) =>
        t.id === activeId ? { ...t, status: overTask.status } : t
      );
      onUpdateTasks(updatedTasks);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    if (isOverColumn) {
      const newStatus = overId as TaskStatus;
      const tasksInColumn = getTasksByStatus(newStatus);
      const newOrder = tasksInColumn.length > 0
        ? Math.max(...tasksInColumn.map(t => t.order)) + 1
        : 0;

      const updatedTasks = tasks.map((t) =>
        t.id === activeId ? { ...t, status: newStatus, order: newOrder } : t
      );
      onUpdateTasks(updatedTasks);
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    const tasksInColumn = getTasksByStatus(overTask.status);
    const oldIndex = tasksInColumn.findIndex((t) => t.id === activeId);
    const newIndex = tasksInColumn.findIndex((t) => t.id === overId);

    if (oldIndex === -1) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === activeId) {
          return { ...t, status: overTask.status, order: overTask.order };
        }
        if (t.status === overTask.status && t.order >= overTask.order && t.id !== activeId) {
          return { ...t, order: t.order + 1 };
        }
        return t;
      });
      onUpdateTasks(updatedTasks);
    } else {
      const reorderedTasks = [...tasksInColumn];
      const [removed] = reorderedTasks.splice(oldIndex, 1);
      reorderedTasks.splice(newIndex, 0, removed);

      const updatedTasks = tasks.map((t) => {
        const reorderedIndex = reorderedTasks.findIndex((rt) => rt.id === t.id);
        if (reorderedIndex !== -1) {
          return { ...t, order: reorderedIndex };
        }
        return t;
      });
      onUpdateTasks(updatedTasks);
    }
  };

  const handleAddTask = (title: string, description: string, status: TaskStatus) => {
    const tasksInColumn = getTasksByStatus(status);
    const newOrder = tasksInColumn.length > 0
      ? Math.max(...tasksInColumn.map(t => t.order)) + 1
      : 0;

    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      status,
      order: newOrder,
    };

    onUpdateTasks([...tasks, newTask]);
  };

  const handleEditTask = (task: Task) => {
    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle !== null && newTitle.trim()) {
      const newDescription = prompt('Edit description:', task.description) ?? task.description;
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, title: newTitle.trim(), description: newDescription } : t
      );
      onUpdateTasks(updatedTasks);
    }
  };

  const handleDeleteTask = (id: string) => {
    onUpdateTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-5 flex-1 stagger-children">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={getTasksByStatus(column.id)}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="rotate-2 scale-105">
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              onDelete={() => {}}
              isDragOverlay
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
