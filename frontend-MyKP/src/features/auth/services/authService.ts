import { LoginPayload, AuthResponse } from '../model/auth.types';
import { API_URL } from '../../../constants/apiConfig';
import { getToken } from './session';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const url = `${API_URL}/login`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Required so Laravel returns JSON 422 on validation failures instead
        // of redirecting to the Referer (which breaks the CORS chain on web).
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Surface Laravel's specific validation message (wrong domain, bad
      // credentials, etc.) instead of a generic "Invalid credentials".
      let message = `Login failed (HTTP ${response.status})`;
      try {
        const data = await response.json();
        message = data?.errors?.email?.[0] ?? data?.message ?? message;
      } catch {
        // body wasn't JSON
      }
      throw new Error(message);
    }

    return await response.json();
  } catch (error: any) {
    // Surface the URL we tried — by far the most common login failure cause
    // is API_URL pointing at an unreachable host (LAN IP vs localhost, wrong
    // port, Laravel not bound to 0.0.0.0, etc).
    console.error(`Login error against ${url}:`, error?.message ?? error);
    throw error;
  }
};

/**
 * Best-effort logout: tries to revoke the Sanctum token on the server.
 * Network/4xx failures are swallowed — the caller will still clear the
 * local session and route to /login, so the user is never trapped.
 */
export const logout = async (): Promise<void> => {
  const token = getToken();
  if (!token) return;

  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // Network down etc. — local cleanup still runs in the caller.
  }
};

export const googleLogin = async (accessToken: string): Promise<AuthResponse> => {
  const url = `${API_URL}/login/google`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });

    if (!response.ok) {
      // Parse Laravel's validation error envelope to surface the real reason
      // (wrong domain, account not registered, invalid Google token, …).
      let message = `Google login failed (HTTP ${response.status})`;
      try {
        const data = await response.json();
        message = data?.errors?.email?.[0] ?? data?.message ?? message;
      } catch {
        // body wasn't JSON; keep default message
      }
      throw new Error(message);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`Google login error against ${url}:`, error?.message ?? error);
    throw error;
  }
};
