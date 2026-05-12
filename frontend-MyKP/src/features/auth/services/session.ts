import { AuthResponse } from '../model/auth.types';

type SessionUser = AuthResponse['user'];

let currentUser: SessionUser | null = null;
let token: string | null = null;

export const setSession = (auth: AuthResponse) => {
  currentUser = auth.user;
  token = auth.token;
};

export const clearSession = () => {
  currentUser = null;
  token = null;
};

export const getCurrentUser = (): SessionUser | null => currentUser;

export const getToken = (): string | null => token;
