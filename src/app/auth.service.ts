import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

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

    sendMessage(userMessage: string, personToImpersonate: string) {
    const userMessagePretext = "Please answer the following question as if you were an actor impersonating " + personToImpersonate + " (100 Tokens max): "
    const apiKey = this.oauthService.getAccessToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    });

    const requestBody = {
      model: 'grok-2-1212',
      messages: [
        {
          role: 'user',
          content: userMessagePretext + userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
      stream: false,
    };

    return this.http.post('http://localhost:3000/send-message', requestBody, { headers }).pipe(catchError(this.handleError) );
  }

  private handleError(error: HttpErrorResponse) {
    if( error.status === 0){
      console.error('A client-side or network error occurred:', error.error);
    } else {
      console.error('Backend returned code ' + error.status, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.', {cause: error.error}));
  }
}