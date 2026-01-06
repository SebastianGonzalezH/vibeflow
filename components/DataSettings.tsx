'use client';

import { useState, useRef } from 'react';
import { Client, Session, Assessment } from '@/types';

interface DataSettingsProps {
  clients: Client[];
  sessions: Session[];
  assessments: Assessment[];
  onImportData: (data: { clients: Client[]; sessions: Session[]; assessments: Assessment[] }) => void;
  onClearAllData: () => void;
}

export function DataSettings({
  clients,
  sessions,
  assessments,
  onImportData,
  onClearAllData,
}: DataSettingsProps) {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      data: {
        clients,
        sessions,
        assessments,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindcare-pro-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed.data || !parsed.data.clients) {
          throw new Error('Invalid backup file format');
        }

        const importedClients = parsed.data.clients || [];
        const importedSessions = parsed.data.sessions || [];
        const importedAssessments = parsed.data.assessments || [];

        onImportData({
          clients: importedClients,
          sessions: importedSessions,
          assessments: importedAssessments,
        });

        setImportStatus('success');
        setImportMessage(`Successfully imported ${importedClients.length} clients, ${importedSessions.length} sessions, and ${importedAssessments.length} assessments.`);
      } catch (error) {
        setImportStatus('error');
        setImportMessage('Failed to import data. Please ensure the file is a valid MindCare Pro backup.');
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to delete ALL data? This action cannot be undone. Consider exporting a backup first.')) {
      if (confirm('This is your final warning. All clients, sessions, and assessments will be permanently deleted.')) {
        onClearAllData();
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          Data & Settings
        </h1>
        <p className="text-foreground-secondary mt-1">
          Manage your practice data and application settings
        </p>
      </div>

      {/* Data Overview */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Data Overview
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-background-secondary rounded-xl">
            <p className="text-2xl font-semibold text-foreground">{clients.length}</p>
            <p className="text-sm text-foreground-muted">Clients</p>
          </div>
          <div className="p-4 bg-background-secondary rounded-xl">
            <p className="text-2xl font-semibold text-foreground">{sessions.length}</p>
            <p className="text-sm text-foreground-muted">Sessions</p>
          </div>
          <div className="p-4 bg-background-secondary rounded-xl">
            <p className="text-2xl font-semibold text-foreground">{assessments.length}</p>
            <p className="text-sm text-foreground-muted">Assessments</p>
          </div>
        </div>
      </div>

      {/* Export Data */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Export Data
            </h2>
            <p className="text-foreground-secondary text-sm mt-1 mb-4">
              Download a backup of all your practice data including clients, sessions, and assessments.
              Store this file securely as it contains sensitive patient information.
            </p>
            <button onClick={handleExport} className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Backup
            </button>
          </div>
        </div>
      </div>

      {/* Import Data */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-soft flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Import Data
            </h2>
            <p className="text-foreground-secondary text-sm mt-1 mb-4">
              Restore data from a previously exported backup file.
              This will replace all current data with the imported data.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Choose Backup File
            </button>

            {importStatus !== 'idle' && (
              <div className={`mt-4 p-3 rounded-lg ${
                importStatus === 'success' ? 'bg-success-soft text-success' : 'bg-error-soft text-error'
              }`}>
                {importMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-info-soft flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Data Privacy
            </h2>
            <p className="text-foreground-secondary text-sm mt-1">
              MindCare Pro stores all data locally on your device using browser localStorage.
              No data is ever transmitted to external servers or third parties.
              For HIPAA compliance, ensure your device is properly secured and consider
              encrypting backups before storing them in cloud services.
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 border-error/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-error-soft flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-error" style={{ fontFamily: 'var(--font-display)' }}>
              Danger Zone
            </h2>
            <p className="text-foreground-secondary text-sm mt-1 mb-4">
              Permanently delete all data including clients, sessions, and assessments.
              This action cannot be undone. Make sure to export a backup first.
            </p>
            <button onClick={handleClearData} className="btn btn-danger">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              Delete All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
