'use client';

import { useState } from 'react';
import { Client } from '@/types';
import { ClientForm } from './ClientForm';

interface ClientListProps {
  clients: Client[];
  onAddClient: (client: Client) => void;
  onUpdateClient: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
  onSelectClient: (clientId: string) => void;
}

export function ClientList({
  clients,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  onSelectClient,
}: ClientListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Client['status'] | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client => {
    const matchesSearch =
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => a.lastName.localeCompare(b.lastName));

  const handleSaveClient = (client: Client) => {
    if (editingClient) {
      onUpdateClient(client);
    } else {
      onAddClient(client);
    }
    setShowAddForm(false);
    setEditingClient(null);
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      onDeleteClient(clientId);
    }
  };

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

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            Clients
          </h1>
          <p className="text-foreground-secondary mt-1">
            {filteredClients.length} {filteredClients.length === 1 ? 'client' : 'clients'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--foreground-muted)"
            strokeWidth="2"
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12"
          />
        </div>
        <div className="tabs w-auto">
          {(['all', 'active', 'inactive', 'discharged'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`tab ${statusFilter === status ? 'active' : ''}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Client List */}
      {filteredClients.length === 0 ? (
        <div className="card">
          <div className="empty-state py-16">
            <div className="empty-state-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--foreground-muted)" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="empty-state-title">No clients found</h3>
            <p className="empty-state-text">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first client'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary mt-4"
              >
                Add Your First Client
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {filteredClients.map(client => (
            <div
              key={client.id}
              className="card p-4 flex items-center gap-4 cursor-pointer hover:shadow-md"
              onClick={() => onSelectClient(client.id)}
            >
              <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center text-primary font-semibold text-lg shrink-0">
                {client.firstName[0]}{client.lastName[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">
                    {client.lastName}, {client.firstName}
                  </h3>
                  <span className={`badge badge-${
                    client.status === 'active' ? 'success' :
                    client.status === 'inactive' ? 'neutral' : 'warning'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-foreground-muted">
                  <span>{getAge(client.dateOfBirth)} years old</span>
                  <span className="hidden sm:inline">{client.email}</span>
                  <span className="hidden md:inline">{client.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setEditingClient(client)}
                  className="btn btn-ghost p-2"
                  title="Edit client"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="btn btn-ghost p-2 hover:text-error"
                  title="Delete client"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Client Modal */}
      {(showAddForm || editingClient) && (
        <ClientForm
          client={editingClient}
          onSave={handleSaveClient}
          onCancel={() => {
            setShowAddForm(false);
            setEditingClient(null);
          }}
        />
      )}
    </div>
  );
}
