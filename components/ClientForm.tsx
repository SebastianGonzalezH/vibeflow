'use client';

import { useState } from 'react';
import { Client } from '@/types';

interface ClientFormProps {
  client?: Client | null;
  onSave: (client: Client) => void;
  onCancel: () => void;
}

export function ClientForm({ client, onSave, onCancel }: ClientFormProps) {
  const [formData, setFormData] = useState<Partial<Client>>({
    firstName: client?.firstName || '',
    lastName: client?.lastName || '',
    dateOfBirth: client?.dateOfBirth || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    emergencyContact: client?.emergencyContact || {
      name: '',
      relationship: '',
      phone: '',
    },
    insuranceProvider: client?.insuranceProvider || '',
    insuranceId: client?.insuranceId || '',
    referralSource: client?.referralSource || '',
    status: client?.status || 'active',
    notes: client?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const newClient: Client = {
      id: client?.id || crypto.randomUUID(),
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      dateOfBirth: formData.dateOfBirth || '',
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address,
      emergencyContact: formData.emergencyContact || { name: '', relationship: '', phone: '' },
      insuranceProvider: formData.insuranceProvider,
      insuranceId: formData.insuranceId,
      referralSource: formData.referralSource,
      status: formData.status || 'active',
      notes: formData.notes,
      startDate: client?.startDate || now.split('T')[0],
      createdAt: client?.createdAt || now,
      updatedAt: now,
    };

    onSave(newClient);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateEmergencyContact = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact!,
        [field]: value,
      },
    }));
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="p-6 border-b border-border-light">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                {client ? 'Edit Client' : 'Add New Client'}
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
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => updateField('firstName', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => updateField('lastName', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={e => updateField('dateOfBirth', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => updateField('status', e.target.value)}
                    className="input"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="discharged">Discharged</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    className="input"
                    placeholder="(555) 555-5555"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => updateField('address', e.target.value)}
                    className="input"
                    placeholder="Street, City, State, ZIP"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="label">Name *</label>
                  <input
                    type="text"
                    value={formData.emergencyContact?.name}
                    onChange={e => updateEmergencyContact('name', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Relationship *</label>
                  <input
                    type="text"
                    value={formData.emergencyContact?.relationship}
                    onChange={e => updateEmergencyContact('relationship', e.target.value)}
                    className="input"
                    placeholder="e.g., Spouse, Parent"
                    required
                  />
                </div>
                <div>
                  <label className="label">Phone *</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact?.phone}
                    onChange={e => updateEmergencyContact('phone', e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Insurance Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Insurance Provider</label>
                  <input
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={e => updateField('insuranceProvider', e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Insurance ID</label>
                  <input
                    type="text"
                    value={formData.insuranceId}
                    onChange={e => updateField('insuranceId', e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide mb-4">
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Referral Source</label>
                  <input
                    type="text"
                    value={formData.referralSource}
                    onChange={e => updateField('referralSource', e.target.value)}
                    className="input"
                    placeholder="e.g., Dr. Smith, Self-referred"
                  />
                </div>
                <div>
                  <label className="label">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={e => updateField('notes', e.target.value)}
                    className="textarea"
                    placeholder="Additional notes about the client..."
                    rows={3}
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
              {client ? 'Save Changes' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
