import { AuthConfig } from 'angular-oauth2-oidc'; // Changed to OAuthConfig

export const authConfig: AuthConfig = { // Changed to oauthConfig
  issuer: 'http://localhost:8080/realms/mydemo',
  clientId: 'angular-client',
  responseType: 'code',
  scope: 'openid profile email',
  redirectUri: window.location.origin + '/chat',
  requireHttps: false, // Disable for localhost
};