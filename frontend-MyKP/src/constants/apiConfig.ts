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

// Dev-machine LAN IP — used when Expo's hostUri auto-detection comes back empty
// (typical with custom dev clients / dev builds, where Constants.expoConfig
// doesn't include the bundler host). Replace with your own IPv4 when running
// from a different machine.
const FALLBACK_LAN_HOST = '192.168.1.7';

const host = devHost ?? FALLBACK_LAN_HOST;

export const API_URL = `http://192.168.100.49:${BACKEND_PORT}/api`;
