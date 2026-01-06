'use client';

import { useState } from 'react';
import { Session } from '@/types';

interface SessionNotesProps {
  session?: Session | null;
  clientId: string;
  onSave: (session: Session) => void;
  onCancel: () => void;
}

export function SessionNotes({ session, clientId, onSave, onCancel }: SessionNotesProps) {
  const today = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  const [formData, setFormData] = useState({
    date: session?.date || today,
    startTime: session?.startTime || nowTime,
    duration: session?.duration || 50,
    type: session?.type || 'follow-up' as Session['type'],
    status: session?.status || 'completed' as Session['status'],
    notes: session?.notes || '',
    mood: session?.mood || 5,
    riskLevel: session?.riskLevel || 'none' as Session['riskLevel'],
    goals: session?.goals?.join('\n') || '',
    interventions: session?.interventions?.join('\n') || '',
    homework: session?.homework || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const newSession: Session = {
      id: session?.id || crypto.randomUUID(),
      clientId,
      date: formData.date,
      startTime: formData.startTime,
      duration: formData.duration,
      type: formData.type,
      status: formData.status,
      notes: formData.notes,
      mood: formData.mood,
      riskLevel: formData.riskLevel,
      goals: formData.goals.split('\n').filter(g => g.trim()),
      interventions: formData.interventions.split('\n').filter(i => i.trim()),
      homework: formData.homework,
      createdAt: session?.createdAt || now,
      updatedAt: now,
    };

    onSave(newSession);
  };

  const sessionTypes: Session['type'][] = ['initial', 'follow-up', 'crisis', 'family', 'group', 'telehealth'];
  const sessionStatuses: Session['status'][] = ['scheduled', 'completed', 'cancelled', 'no-show'];
  const riskLevels: NonNullable<Session['riskLevel']>[] = ['none', 'low', 'moderate', 'high'];

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content max-w-3xl" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="p-6 border-b border-border-light">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                {session ? 'Edit Session Notes' : 'New Session'}
              </h2>
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-ghost p-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Session Details */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Session Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="label">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Time *</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={e => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Duration (min)</label>
                  <select
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="input"
                  >
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={50}>50 min</option>
                    <option value={60}>60 min</option>
                    <option value={90}>90 min</option>
                  </select>
                </div>
                <div>
                  <label className="label">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as Session['type'] }))}
                    className="input"
                  >
                    {sessionTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="label">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Session['status'] }))}
                    className="input"
                  >
                    {sessionStatuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Client Mood (1-10)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.mood}
                      onChange={e => setFormData(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                      className="flex-1 accent-primary"
                    />
                    <span className="w-8 text-center font-medium text-foreground">{formData.mood}</span>
                  </div>
                </div>
                <div>
                  <label className="label">Risk Level</label>
                  <select
                    value={formData.riskLevel}
                    onChange={e => setFormData(prev => ({ ...prev, riskLevel: e.target.value as Session['riskLevel'] }))}
                    className={`input ${
                      formData.riskLevel === 'high' ? 'border-error text-error' :
                      formData.riskLevel === 'moderate' ? 'border-warning' : ''
                    }`}
                  >
                    {riskLevels.map(level => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Session Notes */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Session Notes
              </h3>
              <div className="note-paper">
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full min-h-[200px] p-4 pl-14 bg-transparent border-none focus:outline-none focus:ring-0 text-foreground leading-relaxed resize-none"
                  placeholder="Document session observations, client presentation, topics discussed, progress notes..."
                  style={{ lineHeight: '1.8' }}
                />
              </div>
            </div>

            {/* Goals, Interventions, Homework */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Treatment Planning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label">Session Goals</label>
                  <textarea
                    value={formData.goals}
                    onChange={e => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                    className="textarea text-sm"
                    placeholder="One goal per line..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="label">Interventions Used</label>
                  <textarea
                    value={formData.interventions}
                    onChange={e => setFormData(prev => ({ ...prev, interventions: e.target.value }))}
                    className="textarea text-sm"
                    placeholder="One intervention per line..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="label">Homework Assigned</label>
                  <textarea
                    value={formData.homework}
                    onChange={e => setFormData(prev => ({ ...prev, homework: e.target.value }))}
                    className="textarea text-sm"
                    placeholder="Tasks or exercises for client..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border-light flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {session ? 'Save Changes' : 'Save Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
