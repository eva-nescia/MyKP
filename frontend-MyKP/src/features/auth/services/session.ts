import * as SecureStore from 'expo-secure-store';

import { AuthResponse } from '../model/auth.types';

type SessionUser = AuthResponse['user'];

const TOKEN_KEY = 'mykp.auth.token';
const USER_KEY = 'mykp.auth.user';

let currentUser: SessionUser | null = null;
let token: string | null = null;

export const setSession = async (auth: AuthResponse): Promise<void> => {
  currentUser = auth.user;
  token = auth.token;

  await Promise.all([
    SecureStore.setItemAsync(TOKEN_KEY, auth.token),
    SecureStore.setItemAsync(USER_KEY, JSON.stringify(auth.user)),
  ]);
};

export const clearSession = async (): Promise<void> => {
  currentUser = null;
  token = null;

  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEY),
    SecureStore.deleteItemAsync(USER_KEY),
  ]);
};

/**
 * Rehydrate in-memory session from SecureStore. Call once at app boot so
 * leaving the app (e.g. opening an external registration form) doesn't
 * silently drop the token when the JS context reloads on return.
 */
export const restoreSession = async (): Promise<SessionUser | null> => {
  if (currentUser && token) return currentUser;

  const [storedToken, storedUser] = await Promise.all([
    SecureStore.getItemAsync(TOKEN_KEY),
    SecureStore.getItemAsync(USER_KEY),
  ]);

  if (!storedToken || !storedUser) return null;

  try {
    currentUser = JSON.parse(storedUser) as SessionUser;
    token = storedToken;
    return currentUser;
  } catch {
    // Stored user JSON corrupted — treat as no session.
    await clearSession();
    return null;
  }
};

export const getCurrentUser = (): SessionUser | null => currentUser;

export const getToken = (): string | null => token;
