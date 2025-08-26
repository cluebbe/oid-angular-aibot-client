import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private oauthService: OAuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    // Only try to login if redirected back from the auth server
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.router.navigate(['/chat']);
      }
    });
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