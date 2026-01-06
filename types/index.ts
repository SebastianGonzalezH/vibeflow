// MindCare Pro - Type Definitions

// Client Types
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceProvider?: string;
  insuranceId?: string;
  referralSource?: string;
  startDate: string;
  status: 'active' | 'inactive' | 'discharged';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Session Types
export interface Session {
  id: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  type: 'initial' | 'follow-up' | 'crisis' | 'family' | 'group' | 'telehealth';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  mood?: number; // 1-10 scale
  riskLevel?: 'none' | 'low' | 'moderate' | 'high';
  goals?: string[];
  interventions?: string[];
  homework?: string;
  createdAt: string;
  updatedAt: string;
}

// DSM-5 Assessment Types
export interface Symptom {
  id: string;
  name: string;
  description: string;
  category: DSMCategory;
}

export type DSMCategory =
  | 'depressive'
  | 'anxiety'
  | 'trauma'
  | 'ocd'
  | 'bipolar'
  | 'psychotic'
  | 'personality'
  | 'eating'
  | 'substance'
  | 'neurodevelopmental'
  | 'sleep'
  | 'dissociative';

export interface Disorder {
  id: string;
  name: string;
  code: string; // DSM-5 diagnostic code
  category: DSMCategory;
  description: string;
  requiredSymptoms: string[]; // symptom IDs
  minimumSymptoms: number;
  duration?: string;
  exclusionCriteria?: string[];
}

export interface Assessment {
  id: string;
  clientId: string;
  date: string;
  selectedSymptoms: string[]; // symptom IDs
  suggestedDisorders: SuggestedDisorder[];
  clinicianNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SuggestedDisorder {
  disorderId: string;
  name: string;
  code: string;
  matchedSymptoms: string[];
  totalRequired: number;
  confidence: 'low' | 'moderate' | 'high';
  percentage: number;
}

// App State Types
export interface AppData {
  clients: Client[];
  sessions: Session[];
  assessments: Assessment[];
}

// Navigation Types
export type ViewType = 'dashboard' | 'clients' | 'client-detail' | 'session' | 'assessment' | 'settings';

export interface NavigationState {
  currentView: ViewType;
  selectedClientId?: string;
  selectedSessionId?: string;
}

// Utility Types
export type ConfidenceLevel = 'low' | 'moderate' | 'high';

export interface SearchFilters {
  query: string;
  status?: Client['status'];
  dateRange?: {
    start: string;
    end: string;
  };
}
