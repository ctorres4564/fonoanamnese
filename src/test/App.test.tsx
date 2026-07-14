import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock do Firebase Auth
vi.mock('../services/firebase', () => ({
  auth: {
    currentUser: null,
  },
  db: {},
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((_auth, callback) => {
    callback(null); // Simulate no user
    return vi.fn(); // Return unsubscribe function
  }),
  getAuth: vi.fn(() => ({})),
}));

describe('App routing and auth', () => {
  it('should redirect to login if not authenticated', async () => {
    render(<App />);
    await waitFor(() => {
      // The login page has a heading "FonoAnamnese" and a button "Entrar"
      expect(screen.getByText('Acesse sua conta para continuar')).toBeInTheDocument();
    });
  });
});
