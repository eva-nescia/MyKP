/**
 * Centralized API Configuration
 *
 * Auto-detects the host machine running `npm start` via Expo's dev-server
 * host URI, so teammates don't have to edit an IP. Falls back to localhost
 * for web / iOS simulator when no dev host is available.
 */
import Constants from 'expo-constants';

export const API_URL = `http://localhost:8000/api`;
