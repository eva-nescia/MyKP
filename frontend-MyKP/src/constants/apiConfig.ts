/**
 * Centralized API Configuration
 *
 * Auto-detects the host machine running `npm start` via Expo's dev-server
 * host URI, so teammates don't have to edit an IP. Falls back to localhost
 * for web / iOS simulator when no dev host is available.
 */
import Constants from 'expo-constants';

const BACKEND_PORT = 8000;

const devHost =
  Constants.expoConfig?.hostUri?.split(':')[0] ??
  (Constants as any).expoGoConfig?.debuggerHost?.split(':')[0] ??
  (Constants.manifest2 as any)?.extra?.expoClient?.hostUri?.split(':')[0];

const host = devHost ?? 'localhost';

export const API_URL = `http://10.150.69.119:${BACKEND_PORT}/api`;
