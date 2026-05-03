import { LoginPayload, AuthResponse } from '../model/auth.types';

const API_URL = 'https://your-api-url.com/api'; // TODO: replace with Laravel API

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