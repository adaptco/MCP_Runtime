import { Capsule, AvatarBlueprint, DatasetPlan, LoraJob, AuditEvent, Provider } from './types';
import { Key, Bot, Database, Cpu } from 'lucide-react';

export const PROVIDERS: Provider[] = [
  { name: 'OpenAI', icon: '🤖' },
  { name: 'Anthropic', icon: '🧠' },
  { name: 'Replicate', icon: '🚀' },
  { name: 'Stability AI', icon: '🎨' },
  { name: 'Hugging Face', icon: '🤗' },
];

export const sampleCapsules: Capsule[] = [
  {
    id: 'cap-001',
    provider: 'OpenAI',
    label: 'Production GPT-4',
    tags: ['prod', 'chatbot'],
    scopes: ['completion', 'embedding'],
    fingerprint: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    status: 'active',
    hasSecret: true,
    createdAt: '2023-10-01T12:00:00Z',
    expiresAt: null,
    allowedOrigins: ['*'],
  },
  {
    id: 'cap-002',
    provider: 'Stability AI',
    label: 'Image Gen Dev',
    tags: ['dev', 'image'],
    scopes: ['generation'],
    fingerprint: 'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5',
    status: 'active',
    hasSecret: true,
    createdAt: '2023-10-05T14:30:00Z',
    expiresAt: '2024-10-05T14:30:00Z',
    allowedOrigins: ['localhost:3000'],
  },
  {
    id: 'cap-003',
    provider: 'Replicate',
    label: 'Llama 2 Hosting',
    tags: ['inference', 'llm'],
    scopes: ['prediction'],
    fingerprint: 'q1w2e3r4t5y6u7i8o9p0a1s2d3f4g5',
    status: 'expired',
    hasSecret: false,
    createdAt: '2023-09-15T09:00:00Z',
    expiresAt: '2023-10-15T09:00:00Z',
    allowedOrigins: ['*'],
  },
];

export const sampleBlueprint: AvatarBlueprint = {
  id: 'av-001',
  name: 'AE-101-LA',
  archetype: 'Lead Architect',
  artStyle: 'pixel',
  palette: ['#0ABAB5', '#1a1a2e', '#16213e', '#0f3460', '#e94560'],
  personality: [
    { trait: 'Analytical', value: 95 },
    { trait: 'Creative', value: 80 },
    { trait: 'Leadership', value: 85 },
  ],
  linkedCapsules: ['cap-001', 'cap-003'],
  status: 'idle',
  createdAt: '2023-10-10T08:00:00Z',
};

export const sampleDatasets: DatasetPlan[] = [
  {
    id: 'ds-001',
    name: 'Cyberpunk Cityscapes',
    classToken: 'cbrpnk',
    captionTemplate: 'a futuristic city with neon lights, {weather}, {time}',
    resolution: 1024,
    imageCount: 50,
    status: 'ready',
    createdAt: '2023-10-12T10:00:00Z',
  },
  {
    id: 'ds-002',
    name: 'Retro Anime Characters',
    classToken: 'rtrnm',
    captionTemplate: 'anime character in 90s style, {action}, {background}',
    resolution: 512,
    imageCount: 100,
    status: 'processing',
    createdAt: '2023-10-14T16:20:00Z',
  },
];

export const sampleLoraJobs: LoraJob[] = [
  {
    id: 'lora-001',
    name: 'Neon Noir Style',
    baseModel: 'SDXL 1.0',
    rank: 128,
    alpha: 128,
    steps: 2000,
    lr: 0.0001,
    status: 'succeeded',
    progress: 100,
    createdAt: '2023-10-13T11:00:00Z',
    datasetId: 'ds-001',
  },
  {
    id: 'lora-002',
    name: 'Pixel Sprite v2',
    baseModel: 'SD 1.5',
    rank: 64,
    alpha: 32,
    steps: 1500,
    lr: 0.0002,
    status: 'running',
    progress: 45,
    createdAt: '2023-10-15T09:30:00Z',
    datasetId: 'ds-002',
  },
];

export const sampleAuditEvents: AuditEvent[] = [
  {
    id: 'evt-001',
    timestamp: '2023-10-15T10:00:00Z',
    action: 'capsule.created',
    target: 'cap-002',
    details: 'Created new Stability AI capsule',
    actor: 'admin',
  },
  {
    id: 'evt-002',
    timestamp: '2023-10-15T09:30:00Z',
    action: 'lora.started',
    target: 'lora-002',
    details: 'Started LoRA training job',
    actor: 'system',
  },
  {
    id: 'evt-003',
    timestamp: '2023-10-14T16:20:00Z',
    action: 'dataset.created',
    target: 'ds-002',
    details: 'Created Retro Anime Characters dataset',
    actor: 'admin',
  },
  {
    id: 'evt-004',
    timestamp: '2023-10-13T11:00:00Z',
    action: 'lora.succeeded',
    target: 'lora-001',
    details: 'LoRA training completed successfully',
    actor: 'system',
  },
  {
    id: 'evt-005',
    timestamp: '2023-10-10T08:00:00Z',
    action: 'avatar.created',
    target: 'av-001',
    details: 'Created AE-101-LA blueprint',
    actor: 'admin',
  },
];
