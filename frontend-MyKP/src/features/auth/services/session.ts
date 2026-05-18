import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { AuthResponse } from '../model/auth.types';

type SessionUser = AuthResponse['user'];

const TOKEN_KEY = 'mykp.auth.token';
const USER_KEY = 'mykp.auth.user';

let currentUser: SessionUser | null = null;
let token: string | null = null;

// expo-secure-store's web build is an empty object — calling setItemAsync on
// web throws "is not a function". Branch on platform and use localStorage on
// web. SecureStore stays the canonical store on iOS/Android.
const isWeb = Platform.OS === 'web';

const writeItem = async (key: string, value: string): Promise<void> => {
  if (isWeb) {
    try { window.localStorage.setItem(key, value); } catch { /* private mode, etc. */ }
    return;
  }
  await SecureStore.setItemAsync(key, value);
};

const readItem = async (key: string): Promise<string | null> => {
  if (isWeb) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  }
  return await SecureStore.getItemAsync(key);
};

const deleteItem = async (key: string): Promise<void> => {
  if (isWeb) {
    try { window.localStorage.removeItem(key); } catch { /* nothing to do */ }
    return;
  }
  await SecureStore.deleteItemAsync(key);
};

export const setSession = async (auth: AuthResponse): Promise<void> => {
  currentUser = auth.user;
  token = auth.token;

  await Promise.all([
    writeItem(TOKEN_KEY, auth.token),
    writeItem(USER_KEY, JSON.stringify(auth.user)),
  ]);
};

export const clearSession = async (): Promise<void> => {
  currentUser = null;
  token = null;

  await Promise.all([
    deleteItem(TOKEN_KEY),
    deleteItem(USER_KEY),
  ]);
};

/**
 * Rehydrate in-memory session from persistent storage. Call once at app boot so
 * leaving the app (e.g. opening an external registration form) doesn't silently
 * drop the token when the JS context reloads on return.
 */
export const restoreSession = async (): Promise<SessionUser | null> => {
  if (currentUser && token) return currentUser;

  const [storedToken, storedUser] = await Promise.all([
    readItem(TOKEN_KEY),
    readItem(USER_KEY),
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
