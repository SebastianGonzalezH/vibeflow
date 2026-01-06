'use client';

import { useState } from 'react';
import { Client, Session, Assessment } from '@/types';
import { SessionNotes } from './SessionNotes';
import { ClientForm } from './ClientForm';

interface ClientDetailProps {
  client: Client;
  sessions: Session[];
  assessments: Assessment[];
  onBack: () => void;
  onUpdateClient: (client: Client) => void;
  onAddSession: (session: Session) => void;
  onUpdateSession: (session: Session) => void;
  onDeleteSession: (sessionId: string) => void;
  onNavigateToAssessment: (clientId: string) => void;
}

export function ClientDetail({
  client,
  sessions,
  assessments,
  onBack,
  onUpdateClient,
  onAddSession,
  onUpdateSession,
  onDeleteSession,
  onNavigateToAssessment,
}: ClientDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'assessments'>('overview');
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const clientSessions = sessions.filter(s => s.clientId === client.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const clientAssessments = assessments.filter(a => a.clientId === client.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
    <div className="p-8 max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-foreground-secondary hover:text-foreground mb-6 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Clients
      </button>

      {/* Client Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary-soft flex items-center justify-center text-primary font-semibold text-2xl shrink-0">
            {client.firstName[0]}{client.lastName[0]}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                    {client.firstName} {client.lastName}
                  </h1>
                  <span className={`badge badge-${
                    client.status === 'active' ? 'success' :
                    client.status === 'inactive' ? 'neutral' : 'warning'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground-secondary">
                  <span>{getAge(client.dateOfBirth)} years old</span>
                  <span>•</span>
                  <span>{client.email}</span>
                  <span>•</span>
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="btn btn-secondary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => onNavigateToAssessment(client.id)}
                  className="btn btn-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  New Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs mb-6 w-fit">
        {(['overview', 'sessions', 'assessments'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'sessions' && clientSessions.length > 0 && (
              <span className="ml-2 text-xs opacity-60">({clientSessions.length})</span>
            )}
            {tab === 'assessments' && clientAssessments.length > 0 && (
              <span className="ml-2 text-xs opacity-60">({clientAssessments.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-foreground-muted uppercase tracking-wide">Email</label>
                <p className="text-foreground">{client.email}</p>
              </div>
              <div>
                <label className="text-xs text-foreground-muted uppercase tracking-wide">Phone</label>
                <p className="text-foreground">{client.phone}</p>
              </div>
              {client.address && (
                <div>
                  <label className="text-xs text-foreground-muted uppercase tracking-wide">Address</label>
                  <p className="text-foreground">{client.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Emergency Contact
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-foreground-muted uppercase tracking-wide">Name</label>
                <p className="text-foreground">{client.emergencyContact.name}</p>
              </div>
              <div>
                <label className="text-xs text-foreground-muted uppercase tracking-wide">Relationship</label>
                <p className="text-foreground">{client.emergencyContact.relationship}</p>
              </div>
              <div>
                <label className="text-xs text-foreground-muted uppercase tracking-wide">Phone</label>
                <p className="text-foreground">{client.emergencyContact.phone}</p>
              </div>
            </div>
          </div>

          {/* Insurance */}
          {(client.insuranceProvider || client.insuranceId) && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Insurance
              </h2>
              <div className="space-y-4">
                {client.insuranceProvider && (
                  <div>
                    <label className="text-xs text-foreground-muted uppercase tracking-wide">Provider</label>
                    <p className="text-foreground">{client.insuranceProvider}</p>
                  </div>
                )}
                {client.insuranceId && (
                  <div>
                    <label className="text-xs text-foreground-muted uppercase tracking-wide">ID</label>
                    <p className="text-foreground">{client.insuranceId}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Client Info */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Client Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-foreground-muted uppercase tracking-wide">Date of Birth</label>
                <p className="text-foreground">{formatDate(client.dateOfBirth)}</p>
              </div>
              <div>
                <label className="text-xs text-foreground-muted uppercase tracking-wide">Start Date</label>
                <p className="text-foreground">{formatDate(client.startDate)}</p>
              </div>
              {client.referralSource && (
                <div>
                  <label className="text-xs text-foreground-muted uppercase tracking-wide">Referral Source</label>
                  <p className="text-foreground">{client.referralSource}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {client.notes && (
            <div className="card p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Notes
              </h2>
              <p className="text-foreground-secondary whitespace-pre-wrap">{client.notes}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Session History
            </h2>
            <button
              onClick={() => setShowSessionForm(true)}
              className="btn btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Session
            </button>
          </div>

          {clientSessions.length === 0 ? (
            <div className="card">
              <div className="empty-state py-12">
                <div className="empty-state-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--foreground-muted)" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                  </svg>
                </div>
                <h3 className="empty-state-title">No sessions yet</h3>
                <p className="empty-state-text">Start documenting sessions with this client</p>
                <button
                  onClick={() => setShowSessionForm(true)}
                  className="btn btn-primary mt-4"
                >
                  Add First Session
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {clientSessions.map(session => (
                <div key={session.id} className="card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">
                          {formatDate(session.date)}
                        </span>
                        <span className="text-foreground-muted">
                          {formatTime(session.startTime)}
                        </span>
                        <span className="badge badge-primary capitalize">{session.type}</span>
                        <span className={`badge badge-${
                          session.status === 'completed' ? 'success' :
                          session.status === 'scheduled' ? 'primary' :
                          session.status === 'cancelled' ? 'warning' : 'error'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted">
                        Duration: {session.duration} minutes
                        {session.mood && ` • Mood: ${session.mood}/10`}
                        {session.riskLevel && session.riskLevel !== 'none' && (
                          <span className={`ml-2 badge risk-${session.riskLevel}`}>
                            Risk: {session.riskLevel}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingSession(session)}
                        className="btn btn-ghost p-2"
                        title="Edit session"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this session?')) {
                            onDeleteSession(session.id);
                          }
                        }}
                        className="btn btn-ghost p-2 hover:text-error"
                        title="Delete session"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {session.notes && (
                    <div className="note-paper p-4 mt-3">
                      <p className="text-foreground-secondary whitespace-pre-wrap pl-12 text-sm leading-relaxed">
                        {session.notes}
                      </p>
                    </div>
                  )}

                  {(session.goals?.length || session.interventions?.length || session.homework) && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {session.goals && session.goals.length > 0 && (
                        <div>
                          <label className="text-xs text-foreground-muted uppercase tracking-wide">Goals</label>
                          <ul className="mt-1 space-y-1">
                            {session.goals.map((goal, i) => (
                              <li key={i} className="text-sm text-foreground-secondary">• {goal}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {session.interventions && session.interventions.length > 0 && (
                        <div>
                          <label className="text-xs text-foreground-muted uppercase tracking-wide">Interventions</label>
                          <ul className="mt-1 space-y-1">
                            {session.interventions.map((intervention, i) => (
                              <li key={i} className="text-sm text-foreground-secondary">• {intervention}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {session.homework && (
                        <div>
                          <label className="text-xs text-foreground-muted uppercase tracking-wide">Homework</label>
                          <p className="mt-1 text-sm text-foreground-secondary">{session.homework}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'assessments' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              DSM-5 Assessments
            </h2>
            <button
              onClick={() => onNavigateToAssessment(client.id)}
              className="btn btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Assessment
            </button>
          </div>

          {clientAssessments.length === 0 ? (
            <div className="card">
              <div className="empty-state py-12">
                <div className="empty-state-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--foreground-muted)" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <h3 className="empty-state-title">No assessments yet</h3>
                <p className="empty-state-text">Run a DSM-5 symptom assessment for this client</p>
                <button
                  onClick={() => onNavigateToAssessment(client.id)}
                  className="btn btn-primary mt-4"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {clientAssessments.map(assessment => (
                <div key={assessment.id} className="card p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-semibold text-foreground">
                        {formatDate(assessment.date)}
                      </span>
                      <p className="text-sm text-foreground-muted mt-1">
                        {assessment.selectedSymptoms.length} symptoms identified
                      </p>
                    </div>
                  </div>

                  {assessment.suggestedDisorders.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-xs text-foreground-muted uppercase tracking-wide">
                        Suggested Disorders
                      </label>
                      {assessment.suggestedDisorders.slice(0, 3).map(disorder => (
                        <div key={disorder.disorderId} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground text-sm">{disorder.name}</span>
                              <span className="text-xs text-foreground-muted">({disorder.code})</span>
                            </div>
                            <div className="confidence-bar">
                              <div
                                className={`confidence-fill confidence-${disorder.confidence}`}
                                style={{ width: `${disorder.percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className={`badge badge-${
                            disorder.confidence === 'high' ? 'success' :
                            disorder.confidence === 'moderate' ? 'warning' : 'neutral'
                          } text-xs`}>
                            {disorder.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {assessment.clinicianNotes && (
                    <div className="mt-4 pt-4 border-t border-border-light">
                      <label className="text-xs text-foreground-muted uppercase tracking-wide">
                        Clinician Notes
                      </label>
                      <p className="mt-1 text-sm text-foreground-secondary">{assessment.clinicianNotes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditForm && (
        <ClientForm
          client={client}
          onSave={(updatedClient) => {
            onUpdateClient(updatedClient);
            setShowEditForm(false);
          }}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      {/* Session Form Modal */}
      {(showSessionForm || editingSession) && (
        <SessionNotes
          session={editingSession}
          clientId={client.id}
          onSave={(session) => {
            if (editingSession) {
              onUpdateSession(session);
            } else {
              onAddSession(session);
            }
            setShowSessionForm(false);
            setEditingSession(null);
          }}
          onCancel={() => {
            setShowSessionForm(false);
            setEditingSession(null);
          }}
        />
      )}
    </div>
  );
}
