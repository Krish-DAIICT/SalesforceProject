import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private clientId = '3MVG99gP.VbJma8Xj6Lo.8zxXEIPbFSHWiKZ0i4QvpQ69JrV8.vQyh8PYNS0Gf4Qmuw41R8lr0jev_bN7GNVF';
  clientId =
    '3MVG9pRzvMkjMb6lG.I67qeRG2r.ssybvBXY71SWOX1Jo4VpryC3qseuQ0aDFK7bfox5LJOLw8dR3Px2PpYFn';
  redirectUri = 'http://localhost:4200/oauth';
  authEndpoint = 'https://login.salesforce.com/services/oauth2/authorize';
  tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token';
  accessToken ?: string|null;

  constructor(private http: HttpClient, private router: Router) {}

  initiateAuthorization() {
    var authUrl =
      this.authEndpoint +
      '?response_type=token' +
      '&client_id=' +
      this.clientId +
      '&redirect_uri=' +
      encodeURIComponent(this.redirectUri);

    console.log(authUrl);

    window.location.href = authUrl;
  }

  handleCallback(): Observable<any> {
    return new Observable<any>((observer) => {
      const fragment = window.location.hash.substring(1);
      const params = new URLSearchParams(fragment);
      const accessToken = params.get('access_token');

      console.log('Access Token:', accessToken);

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        this.accessToken = accessToken;
        console.log("In handle")
        this.redirectToUrl('home');
      } else {
        observer.error('Access token not found in the URL fragment.');
      }
    });
  }

  getUserInfo(accessToken: string): Observable<any> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return this.http.get(
      'https://login.salesforce.com/services/oauth2/userinfo',
      { headers }
    );
  }

  redirectToUrl(url: string) {
    this.router.navigate([url]);
  }

  getAuthorizationToken() {
    const token: string | null = localStorage.getItem('token');

    if (token) return token;
    else  this.initiateAuthorization();
    return this.accessToken;
  }
}
