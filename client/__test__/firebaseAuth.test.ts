import { renderHook, act } from '@testing-library/react'; // Updated import
import { AuthContextProvider, useUserAuth } from '@/app/utils/auth-context';
import { auth } from '@/app/utils/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('@/app/utils/firebase', () => ({
  auth: {
    currentUser: null,
  },
}));

describe('useUserAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //TC-011 : User should be able to login with Google
  it('should update user state after successful login', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    //TC-010 : User should be able to login with auth method (signInWithPopup) 
    (signInWithPopup as jest.Mock).mockResolvedValue({ user: mockUser });               

    const { result } = renderHook(() => useUserAuth(), {
      wrapper: AuthContextProvider,
    });

    await act(async () => {
      await result.current.googleSignIn();
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it('should clear user state after sign out', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    //TC-010 : User should be able to logout auth context method (signOut)
    (signOut as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useUserAuth(), {
      wrapper: AuthContextProvider,
    });

    await act(async () => {
      await result.current.signOutAll();
    });

    expect(result.current.user).toBeNull();
  });

// TC-011 : Session state management persistence 
  it('should validate session on mount', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();                                                                     // Return unsubscribe function
    });

    const { result } = renderHook(() => useUserAuth(), {
      wrapper: AuthContextProvider,
    });

    await act(async () => {
        // wait for hook to update
    });

    expect(result.current.user).toEqual(mockUser);
  });
});