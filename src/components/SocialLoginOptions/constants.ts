import { GoogleAuth } from "@/constants";

// Random names so other apps don't steal it? :(
export const APPLE_STORAGE_ID = 'stp__a-p';
export const FACEBOOK_STORAGE_ID = 'stp__f-b';
export const GOOGLE_STORAGE_ID = 'stp__g-o';
export const APPLE_SECRET = 'wW12oekodk@@@@!ajs8882';

export const GOOGLE_CONFIG = {
  expoClientId: GoogleAuth.expoClientId,
  iosClientId: GoogleAuth.iosStandaloneAppClientId, // iosClientId
  androidClientId: GoogleAuth.androidStandaloneAppClientId, // androidClientId
  webClientId: GoogleAuth.webClientId,
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
};
