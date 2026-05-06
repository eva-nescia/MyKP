import { LoginPayload, AuthResponse } from '../model/auth.types';

// const API_URL = 'http://192.168.1.8:8000/api';
const API_URL = 'http://192.168.100.29:8000/api'; // michele wifi rumah
// const API_URL = 'http://10.1.76.93/api'; // michele hotspot

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
