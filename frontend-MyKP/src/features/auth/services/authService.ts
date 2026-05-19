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
      throw new Error(`Invalid credentials (HTTP ${response.status})`);
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

// ==========================================================
// GOOGLE LOGIN — temporarily disabled. Re-enable later.
// ==========================================================
// export const googleLogin = async (accessToken: string): Promise<AuthResponse> => {
//   try {
//     const response = await fetch(`${API_URL}/login/google`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ accessToken }),
//     });
//
//     if (!response.ok) {
//       throw new Error('Google login failed');
//     }
//
//     return await response.json();
//   } catch (error) {
//     console.error('Google login error:', error);
//     throw error;
//   }
// };
