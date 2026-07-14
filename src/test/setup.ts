import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Vite environment variables for tests
vi.stubEnv('VITE_FIREBASE_API_KEY', 'test-api-key');
vi.stubEnv('VITE_FIREBASE_AUTH_DOMAIN', 'test-auth-domain');
vi.stubEnv('VITE_FIREBASE_PROJECT_ID', 'test-project-id');
vi.stubEnv('VITE_FIREBASE_STORAGE_BUCKET', 'test-storage-bucket');
vi.stubEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', 'test-sender-id');
vi.stubEnv('VITE_FIREBASE_APP_ID', 'test-app-id');
