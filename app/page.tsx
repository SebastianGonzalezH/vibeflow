'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Client, Session, Assessment, ViewType } from '@/types';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { ClientList } from '@/components/ClientList';
import { ClientDetail } from '@/components/ClientDetail';
import { DSMAssessment } from '@/components/DSMAssessment';
import { DataSettings } from '@/components/DataSettings';

export default function Home() {
  // Navigation state
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();

  // Data state with localStorage persistence
  const [clients, setClients] = useLocalStorage<Client[]>('mindcare-clients', []);
  const [sessions, setSessions] = useLocalStorage<Session[]>('mindcare-sessions', []);
  const [assessments, setAssessments] = useLocalStorage<Assessment[]>('mindcare-assessments', []);

  // Navigation handlers
  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    if (view !== 'client-detail') {
      setSelectedClientId(undefined);
    }
  };

  const handleNavigateToClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setCurrentView('client-detail');
  };

  const handleNavigateToAssessment = (clientId?: string) => {
    setSelectedClientId(clientId);
    setCurrentView('assessment');
  };

  // Client handlers
  const handleAddClient = (client: Client) => {
    setClients(prev => [...prev, client]);
    handleNavigateToClient(client.id);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(prev =>
      prev.map(c => c.id === updatedClient.id ? updatedClient : c)
    );
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
    setSessions(prev => prev.filter(s => s.clientId !== clientId));
    setAssessments(prev => prev.filter(a => a.clientId !== clientId));
  };

  // Session handlers
  const handleAddSession = (session: Session) => {
    setSessions(prev => [...prev, session]);
  };

  const handleUpdateSession = (updatedSession: Session) => {
    setSessions(prev =>
      prev.map(s => s.id === updatedSession.id ? updatedSession : s)
    );
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  // Assessment handlers
  const handleSaveAssessment = (assessment: Assessment) => {
    setAssessments(prev => [...prev, assessment]);
  };

  // Data management handlers
  const handleImportData = (data: { clients: Client[]; sessions: Session[]; assessments: Assessment[] }) => {
    setClients(data.clients);
    setSessions(data.sessions);
    setAssessments(data.assessments);
  };

  const handleClearAllData = () => {
    setClients([]);
    setSessions([]);
    setAssessments([]);
    setCurrentView('dashboard');
    setSelectedClientId(undefined);
  };

  // Get selected client
  const selectedClient = selectedClientId
    ? clients.find(c => c.id === selectedClientId)
    : undefined;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        clientCount={clients.filter(c => c.status === 'active').length}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        {currentView === 'dashboard' && (
          <Dashboard
            clients={clients}
            sessions={sessions}
            assessments={assessments}
            onNavigateToClient={handleNavigateToClient}
            onNavigateToClients={() => handleNavigate('clients')}
            onNavigateToAssessment={() => handleNavigateToAssessment()}
          />
        )}

        {currentView === 'clients' && (
          <ClientList
            clients={clients}
            onAddClient={handleAddClient}
            onUpdateClient={handleUpdateClient}
            onDeleteClient={handleDeleteClient}
            onSelectClient={handleNavigateToClient}
          />
        )}

        {currentView === 'client-detail' && selectedClient && (
          <ClientDetail
            client={selectedClient}
            sessions={sessions}
            assessments={assessments}
            onBack={() => handleNavigate('clients')}
            onUpdateClient={handleUpdateClient}
            onAddSession={handleAddSession}
            onUpdateSession={handleUpdateSession}
            onDeleteSession={handleDeleteSession}
            onNavigateToAssessment={handleNavigateToAssessment}
          />
        )}

        {currentView === 'assessment' && (
          <DSMAssessment
            clients={clients}
            selectedClientId={selectedClientId}
            onSaveAssessment={handleSaveAssessment}
            onBack={() => selectedClientId ? handleNavigateToClient(selectedClientId) : handleNavigate('dashboard')}
          />
        )}

        {currentView === 'settings' && (
          <DataSettings
            clients={clients}
            sessions={sessions}
            assessments={assessments}
            onImportData={handleImportData}
            onClearAllData={handleClearAllData}
          />
        )}
      </main>
    </div>
  );
}
