import { LoginPayload, GoogleLoginPayload, AuthResponse } from '../model/auth.types';
import Constants from 'expo-constants';

const configuredApiBaseUrl =
  Constants.expoConfig?.extra?.apiBaseUrl ||
  Constants.manifest2?.extra?.expoClient?.extra?.apiBaseUrl;
const configuredApiPort =
  Constants.expoConfig?.extra?.apiPort ||
  Constants.manifest2?.extra?.expoClient?.extra?.apiPort ||
  '8000';

const getExpoHost = (): string | null => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.linkingUri;

  if (!hostUri) {
    return null;
  }

  return hostUri
    .replace(/^[a-zA-Z0-9+.-]+:\/\//, '')
    .replace(/\/.*$/, '')
    .split(':')[0] || null;
};

const getApiUrl = (): string => {
  if (
    configuredApiBaseUrl &&
    configuredApiBaseUrl !== 'auto'
  ) {
    return configuredApiBaseUrl.replace(/\/$/, '');
  }

  const expoHost = getExpoHost();

  if (expoHost) {
    return `http://${expoHost}:${configuredApiPort}/api`;
  }

  return `http://127.0.0.1:${configuredApiPort}/api`;
};

export const API_URL = getApiUrl();

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const googleLogin = async (
  payload: GoogleLoginPayload,
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Google login response status:', response.status);
    const data = await response.json();
    console.log('Google login response data:', data);

    if (!response.ok) {
      throw new Error('Google login failed');
    }

    return data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};
