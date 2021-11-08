import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import parameters from '../../assets/parameters.json';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public validateSession(sessionId: string): Observable<any> {
    let params = {
      frontend: `${parameters.frontend}`,
      next: `${parameters.next}`,
      sessionid: sessionId
    };
    let method = '/cafecert/findsession/';
    return this.http.post(`${parameters.userbusiness}` + method, params);
  }

  public getMenuByRole(sessionId: string, txRole: string) {
    let params = {
      "frontend": `${parameters.frontend}`,
      "next": `${parameters.next}`,
      "sessionid": sessionId,
      "txRole": txRole
    };
    let method = '/cafecert/menulist/';
    return this.http.post<any>(`${parameters.userbusiness}` + method, params);
  }
}
