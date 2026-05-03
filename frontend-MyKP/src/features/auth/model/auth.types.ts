// still waiting for the backend to be ready, so this is just a placeholder for now

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'student';
  };
}