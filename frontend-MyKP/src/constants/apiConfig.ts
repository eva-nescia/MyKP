/**
 * Centralized API Configuration
 *
 * Auto-detects the host machine running `npm start` via Expo's dev-server
 * host URI:
 *   - Expo Web:  Constants.expoConfig.hostUri is "localhost:8081" → host = "localhost"
 *   - Expo Go:   hostUri is your laptop's LAN IP (e.g. "10.150.69.119:8081")
 *
 * Falls back to "localhost" if nothing is detected (production builds).
 *
 * For Expo Go to actually reach the backend, Laravel must be bound to
 * 0.0.0.0 — not just 127.0.0.1. Start with:
 *     php artisan serve --host=0.0.0.0 --port=8000
 */
import Constants from 'expo-constants';

const BACKEND_PORT = 8000;

const devHost =
  Constants.expoConfig?.hostUri?.split(':')[0] ??
  (Constants as any).expoGoConfig?.debuggerHost?.split(':')[0] ??
  (Constants.manifest2 as any)?.extra?.expoClient?.hostUri?.split(':')[0];

const host = devHost ?? 'localhost';

export const API_URL = `http://${host}:${BACKEND_PORT}/api`;
