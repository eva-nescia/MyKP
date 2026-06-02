/**
 * Centralized API Configuration
 *
 * Auto-detects the host machine running `npm start` via Expo's dev-server
 * host URI, so teammates don't have to edit an IP. Falls back to localhost
 * for web / iOS simulator when no dev host is available.
 */
import Constants from 'expo-constants';
import { NativeModules } from 'react-native';

const BACKEND_PORT = 8000;

// Most reliable source: the URL the JS bundle was actually downloaded from,
// e.g. "http://192.168.1.15:8081/index.bundle?...". This is populated in BOTH
// Expo Go and custom dev builds, whereas Constants.expoConfig.hostUri is often
// empty in dev builds. Strip the scheme + port to get just the bundler host.
const scriptURL: string | undefined = NativeModules?.SourceCode?.scriptURL;
const scriptHost = scriptURL?.split('://')[1]?.split(/[:/]/)[0];

const devHost =
  scriptHost ??
  Constants.expoConfig?.hostUri?.split(':')[0] ??
  (Constants as any).expoGoConfig?.debuggerHost?.split(':')[0] ??
  (Constants.manifest2 as any)?.extra?.expoClient?.hostUri?.split(':')[0];

// Last-resort dev-machine LAN IP — only used if every auto-detect source above
// comes back empty. Update to your own IPv4 if you ever hit it.
const FALLBACK_LAN_HOST = '10.238.178.119';

// 'localhost'/'127.0.0.1' from scriptURL (USB / adb reverse) is unreachable from
// a physical phone, so treat it as "no usable host" and fall back.
const isLoopback = (h?: string) => h === 'localhost' || h === '127.0.0.1';
const host = !isLoopback(devHost) && devHost ? devHost : FALLBACK_LAN_HOST;

export const API_URL = `http://${host}:${BACKEND_PORT}/api`;
