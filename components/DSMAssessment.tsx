'use client';

import { useState, useMemo } from 'react';
import { Client, Assessment, DSMCategory } from '@/types';
import { SYMPTOMS, DISORDERS, CATEGORY_NAMES, calculateDisorderMatches, getSymptomsByCategory } from '@/data/dsm5-database';

interface DSMAssessmentProps {
  clients: Client[];
  selectedClientId?: string;
  onSaveAssessment: (assessment: Assessment) => void;
  onBack: () => void;
}

export function DSMAssessment({
  clients,
  selectedClientId,
  onSaveAssessment,
  onBack,
}: DSMAssessmentProps) {
  const [clientId, setClientId] = useState(selectedClientId || '');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<DSMCategory>('depressive');
  const [clinicianNotes, setClinnicianNotes] = useState('');
  const [showResults, setShowResults] = useState(false);

  const categories = Object.keys(CATEGORY_NAMES) as DSMCategory[];
  const currentSymptoms = getSymptomsByCategory(activeCategory);

  const suggestedDisorders = useMemo(() => {
    return calculateDisorderMatches(selectedSymptoms);
  }, [selectedSymptoms]);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const getSymptomCountByCategory = (category: DSMCategory) => {
    const categorySymptoms = getSymptomsByCategory(category);
    return selectedSymptoms.filter(id =>
      categorySymptoms.some(s => s.id === id)
    ).length;
  };

  const handleSaveAssessment = () => {
    if (!clientId) {
      alert('Please select a client');
      return;
    }

    const now = new Date().toISOString();
    const assessment: Assessment = {
      id: crypto.randomUUID(),
      clientId,
      date: now.split('T')[0],
      selectedSymptoms,
      suggestedDisorders: suggestedDisorders.map(d => ({
        disorderId: d.disorderId,
        name: d.name,
        code: d.code,
        matchedSymptoms: d.matchedSymptoms,
        totalRequired: d.totalRequired,
        confidence: d.confidence,
        percentage: d.percentage,
      })),
      clinicianNotes,
      createdAt: now,
      updatedAt: now,
    };

    onSaveAssessment(assessment);
    onBack();
  };

  const selectedClient = clients.find(c => c.id === clientId);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-foreground-secondary hover:text-foreground mb-6 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          DSM-5 Symptom Assessment
        </h1>
        <p className="text-foreground-secondary mt-1">
          Select symptoms to identify potential disorder matches
        </p>
      </div>

      {/* Disclaimer */}
      <div className="dsm-disclaimer mb-6">
        <div className="flex gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" className="shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <p className="font-medium text-foreground mb-1">Clinical Decision Support Tool</p>
            <p className="text-sm">
              This tool is intended to assist clinicians in identifying potential diagnostic considerations based on reported symptoms.
              It is NOT a diagnostic instrument. All diagnostic conclusions must be made by a qualified mental health professional
              using comprehensive clinical assessment, patient history, and professional judgment.
            </p>
          </div>
        </div>
      </div>

      {/* Client Selection */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <label className="label">Select Client</label>
            <select
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              className="input"
              required
            >
              <option value="">Choose a client...</option>
              {clients.filter(c => c.status === 'active').map(client => (
                <option key={client.id} value={client.id}>
                  {client.lastName}, {client.firstName}
                </option>
              ))}
            </select>
          </div>
          {selectedClient && (
            <div className="flex items-center gap-3 px-4 py-2 bg-primary-soft rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                {selectedClient.firstName[0]}{selectedClient.lastName[0]}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {selectedClient.firstName} {selectedClient.lastName}
                </p>
                <p className="text-xs text-foreground-muted">{selectedClient.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Symptom Selection */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Symptom Checklist
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => {
              const count = getSymptomCountByCategory(category);
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-background-secondary text-foreground-secondary hover:bg-surface-hover'
                  }`}
                >
                  {CATEGORY_NAMES[category].split(' ')[0]}
                  {count > 0 && (
                    <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                      activeCategory === category ? 'bg-white/20' : 'bg-primary-soft text-primary'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Symptoms List */}
          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {currentSymptoms.map(symptom => (
              <div
                key={symptom.id}
                className="checkbox-wrapper"
                onClick={() => toggleSymptom(symptom.id)}
              >
                <div className={`checkbox ${selectedSymptoms.includes(symptom.id) ? 'checked' : ''}`}>
                  {selectedSymptoms.includes(symptom.id) && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{symptom.name}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">{symptom.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Count */}
          <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
            <span className="text-sm text-foreground-muted">
              {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
            </span>
            {selectedSymptoms.length > 0 && (
              <button
                onClick={() => setSelectedSymptoms([])}
                className="text-sm text-error hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Suggested Disorders */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Suggested Disorders
            </h2>

            {suggestedDisorders.length === 0 ? (
              <div className="text-center py-8 text-foreground-muted">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-50">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="text-sm">Select symptoms to see potential disorder matches</p>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestedDisorders.slice(0, 5).map((disorder, index) => (
                  <div
                    key={disorder.disorderId}
                    className={`p-4 rounded-xl ${
                      index === 0 && disorder.confidence === 'high'
                        ? 'bg-success-soft border border-success/20'
                        : 'bg-background-secondary'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground text-sm">{disorder.name}</p>
                        <p className="text-xs text-foreground-muted">{disorder.code}</p>
                      </div>
                      <span className={`badge text-xs ${
                        disorder.confidence === 'high' ? 'badge-success' :
                        disorder.confidence === 'moderate' ? 'badge-warning' : 'badge-neutral'
                      }`}>
                        {disorder.confidence}
                      </span>
                    </div>
                    <div className="confidence-bar mt-2">
                      <div
                        className={`confidence-fill confidence-${disorder.confidence}`}
                        style={{ width: `${disorder.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-foreground-muted mt-2">
                      {disorder.matchedSymptoms.length} of {disorder.minimumRequired} minimum symptoms
                      ({disorder.percentage}% match)
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clinician Notes */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Clinician Notes
            </h2>
            <textarea
              value={clinicianNotes}
              onChange={e => setClinnicianNotes(e.target.value)}
              className="textarea text-sm"
              placeholder="Add clinical observations, diagnostic impressions, treatment considerations..."
              rows={5}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAssessment}
            disabled={!clientId || selectedSymptoms.length === 0}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
