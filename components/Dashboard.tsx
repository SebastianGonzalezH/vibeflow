'use client';

import { Client, Session, Assessment } from '@/types';

interface DashboardProps {
  clients: Client[];
  sessions: Session[];
  assessments: Assessment[];
  onNavigateToClient: (clientId: string) => void;
  onNavigateToClients: () => void;
  onNavigateToAssessment: () => void;
}

export function Dashboard({
  clients,
  sessions,
  assessments,
  onNavigateToClient,
  onNavigateToClients,
  onNavigateToAssessment,
}: DashboardProps) {
  const activeClients = clients.filter(c => c.status === 'active');
  const recentClients = [...clients].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  const todaySessions = sessions.filter(s => {
    const sessionDate = new Date(s.date).toDateString();
    const today = new Date().toDateString();
    return sessionDate === today;
  });

  const upcomingSessions = sessions
    .filter(s => s.status === 'scheduled' && new Date(s.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const recentAssessments = [...assessments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Welcome Back
        </h1>
        <p className="text-foreground-secondary">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 stagger-children">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{activeClients.length}</p>
          <p className="text-sm text-foreground-muted">Active Clients</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{todaySessions.length}</p>
          <p className="text-sm text-foreground-muted">Today&apos;s Sessions</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-soft flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{sessions.length}</p>
          <p className="text-sm text-foreground-muted">Total Sessions</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-success-soft flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">{assessments.length}</p>
          <p className="text-sm text-foreground-muted">Assessments</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Recent Clients
            </h2>
            <button onClick={onNavigateToClients} className="text-sm text-primary hover:text-primary-dark">
              View All
            </button>
          </div>

          {recentClients.length === 0 ? (
            <div className="empty-state py-8">
              <div className="empty-state-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--foreground-muted)" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <p className="text-foreground-muted text-sm">No clients yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentClients.map(client => (
                <button
                  key={client.id}
                  onClick={() => onNavigateToClient(client.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center text-primary font-medium">
                    {client.firstName[0]}{client.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {client.firstName} {client.lastName}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      Last updated {formatDate(client.updatedAt)}
                    </p>
                  </div>
                  <div className={`status-dot status-${client.status}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Sessions */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Upcoming Sessions
            </h2>
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="empty-state py-8">
              <div className="empty-state-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--foreground-muted)" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                </svg>
              </div>
              <p className="text-foreground-muted text-sm">No upcoming sessions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => onNavigateToClient(session.clientId)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                    <span className="text-xs font-medium text-accent">
                      {formatDate(session.date).split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {getClientName(session.clientId)}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {formatDate(session.date)} at {formatTime(session.startTime)}
                    </p>
                  </div>
                  <span className="badge badge-primary text-xs capitalize">
                    {session.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & Recent Assessments */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button
                onClick={onNavigateToClients}
                className="btn btn-primary w-full justify-start"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Add New Client
              </button>
              <button
                onClick={onNavigateToAssessment}
                className="btn btn-secondary w-full justify-start"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                New Assessment
              </button>
            </div>
          </div>

          {/* Recent Assessments */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Recent Assessments
            </h2>
            {recentAssessments.length === 0 ? (
              <p className="text-foreground-muted text-sm text-center py-4">
                No assessments yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentAssessments.map(assessment => (
                  <div
                    key={assessment.id}
                    className="p-3 rounded-xl bg-background-secondary"
                  >
                    <p className="font-medium text-foreground text-sm">
                      {getClientName(assessment.clientId)}
                    </p>
                    <p className="text-xs text-foreground-muted mt-1">
                      {formatDate(assessment.date)} • {assessment.suggestedDisorders.length} suggestions
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
