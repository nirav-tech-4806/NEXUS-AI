export type AppMode = 'client' | 'admin';

export type ClientScreen =
  | 'landscape'
  | 'thread'
  | 'systems'
  | 'exploration'
  | 'tiers'
  | 'overview'
  | 'projects'
  | 'research'
  | 'settings';

export type AdminScreen =
  | 'dashboard'
  | 'users'
  | 'models'
  | 'subscriptions'
  | 'analytics'
  | 'support';

export interface AuthSession {
  isAuthenticated: boolean;
  name: string;
  email: string;
  phone: string;
  role: string;
  portal: AppMode;
  plan?: string;
}

export interface GraphNode {
  id: string;
  name: string;
  type: 'Idea' | 'Core' | 'Project' | 'Agent' | 'Dataset' | 'Person';
  x: number;
  y: number;
  inference: string;
  linkedCount: number;
  updated: string;
  description: string;
  color?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export interface ThreadStep {
  stepNumber: string;
  title: string;
  content: string;
  timestamp?: string;
  confidence?: number;
}

export interface ThoughtStream {
  id: string;
  title: string;
  selected: boolean;
  activeModel: string;
  relationalDependency: string;
  project: string;
  state: string;
  steps: ThreadStep[];
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: 'research' | 'projects' | 'people' | 'concepts';
  description: string;
  metadata: string;
  authorOrLead?: string;
  status?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description?: string;
  userCount?: string;
  features: string[];
  isCurrent?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED';
  lastActive: string;
  joinedDate: string;
  role: string;
}

export interface NeuralModel {
  id: string;
  name: string;
  status: 'ACTIVE' | 'MAINT' | 'INACTIVE';
  description: string;
  contextWindow: string;
  weightsVersion: string;
  lastUpdated: string;
  dailyInferences: string;
  latency: string;
  clusterUptime: string;
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface SubscriberAudit {
  id: string;
  userName: string;
  plan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'ACTIVE' | 'FREE TRIAL' | 'SUSPENDED';
  startDate: string;
  renewalDate: string;
  monthlyRate: string;
}

export interface SystemActivity {
  id: string;
  title: string;
  detail: string;
  category: 'user' | 'model' | 'subscription' | 'workspace' | 'security';
  timestamp: string;
}

export interface TelemetryPoint {
  date: string;
  computeLoad: number;
  tokensMillion: number;
  latencyMs: number;
}
