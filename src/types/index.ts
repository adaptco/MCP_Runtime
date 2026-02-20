export interface Capsule {
  id: string;
  provider: string;
  label: string;
  tags: string[];
  scopes: string[];
  fingerprint: string;
  status: 'active' | 'revoked' | 'expired';
  hasSecret: boolean;
  createdAt: string;
  expiresAt: string | null;
  allowedOrigins: string[];
}

export interface AvatarBlueprint {
  id: string;
  name: string;
  archetype: string;
  artStyle: 'pixel' | '3d' | 'anime' | 'realistic';
  palette: string[];
  personality: { trait: string; value: number }[];
  linkedCapsules: string[];
  status: 'idle' | 'generating' | 'ready' | 'failed';
  createdAt: string;
}

export interface DatasetPlan {
  id: string;
  name: string;
  classToken: string;
  captionTemplate: string;
  resolution: number;
  imageCount: number;
  status: 'draft' | 'processing' | 'ready' | 'failed';
  createdAt: string;
}

export interface LoraJob {
  id: string;
  name: string;
  baseModel: string;
  rank: number;
  alpha: number;
  steps: number;
  lr: number;
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  progress: number;
  createdAt: string;
  datasetId: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  target: string;
  details: string;
  actor: string;
}

export interface Provider {
  name: string;
  icon: string;
}
