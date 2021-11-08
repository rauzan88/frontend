import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ListasService {
    constructor(private http: HttpClient, private _route: ActivatedRoute, ) { }

    menuByRole(variable: any) {
        var { rol, sesionid, frontend, next } = variable;
        return this.http.post<any>(`${process.env.USERBUSSINESS}` + '/cafecert/menulist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        })
            .pipe(map(response => response || {}));
    }

    private handleError(error: HttpErrorResponse):
        Observable<any> {
        //Log error in the browser console
        console.error('observable error: ', error);

        return Observable.throw(error);
    }
}