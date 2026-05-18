import { LoginPayload, AuthResponse } from '../model/auth.types';
import { API_URL } from '../../../constants/apiConfig';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
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
  } catch (error) {
    console.error('Login error:', error);
    throw error;
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
