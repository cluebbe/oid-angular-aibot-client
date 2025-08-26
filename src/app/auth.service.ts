import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { HttpClient } from '@angular/common/http'; // Added import

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService, private http: HttpClient) { // Injected HttpClient
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getToken() {
    return this.oauthService.getAccessToken();
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  getProtectedData() {
    return this.http.get<any>('http://localhost:4200/api/protected', {
      headers: { Authorization: `Bearer ${this.oauthService.getAccessToken()}` },
    });
  }
}