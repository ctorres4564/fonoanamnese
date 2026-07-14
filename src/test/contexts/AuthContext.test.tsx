import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(() => ({})),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  getFirestore: vi.fn(() => ({})),
}));

const TestComponent = () => {
  const { user, profile, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not Authenticated</div>;
  
  return (
    <div>
      <div>Authenticated as {user.email}</div>
      {profile ? <div>Profile: {profile.crefonoNumber}</div> : <div>No Profile</div>}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading initially and then Not Authenticated when no user', async () => {
    vi.mocked(onAuthStateChanged).mockImplementation((_auth, callback: any) => {
      // Don't call immediately to test loading state
      setTimeout(() => callback(null as any), 10);
      return vi.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
    });
  });

  it('loads user and profile successfully', async () => {
    const mockUser = { uid: 'user123', email: 'test@test.com', displayName: 'Test User' };
    const mockProfile = { crefonoNumber: '99999' };

    vi.mocked(onAuthStateChanged).mockImplementation((_auth, callback: any) => {
      callback(mockUser as any);
      return vi.fn();
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      id: 'user123',
      data: () => mockProfile,
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Authenticated as test@test.com')).toBeInTheDocument();
      expect(screen.getByText('Profile: 99999')).toBeInTheDocument();
    });
  });

  it('handles user without profile', async () => {
    const mockUser = { uid: 'user123', email: 'test@test.com' };

    vi.mocked(onAuthStateChanged).mockImplementation((_auth, callback: any) => {
      callback(mockUser as any);
      return vi.fn();
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false,
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Authenticated as test@test.com')).toBeInTheDocument();
      expect(screen.getByText('No Profile')).toBeInTheDocument();
    });
  });
});
