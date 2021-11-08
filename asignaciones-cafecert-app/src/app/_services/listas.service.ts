import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ListasService {
    constructor(private http: HttpClient, private _route: ActivatedRoute, ) { }
    
    menuByRole(variable: any) {
         var{rol, sesionid, frontend, next} = variable;

       console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.USERBUSSINESS}` + '/cafecert/menulist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        })
            .pipe(map(response => response || {}));
    }

    obtenerSolicitudes(variable: any) {
        var{rol, sesionid, frontend, next}=variable;

      console.log("variable : " + variable);
       return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/requestlist/', {
           "frontend": frontend,
           "next": next,
           "sessionid": sesionid,
           "txRole": rol
       })
           .pipe(map(response => response || {}));
   }

   obtenerAsignacionesActivas(variable: any) {
        var{ active, rol, sesionid, frontend, next }=variable;

        console.log("variable : " + variable);
            return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafetert/assigneds/actives/', {
                "frontend": frontend,
                "next": next,
                "sessionid": sesionid,
                "txRole": rol,
                "active": active
            })
            .pipe(map(response => response || {}));
    }

    consultarCadenaEventos(variable: any) {
        var{ rol, sesionid, frontend, next, eventchainid }=variable;
    
        console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.EVENTSCHAINS}` + '/cafecert/evenchain/requesttype/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdeventchain": eventchainid
        }).pipe(map(response => response || {}));
    }

    actualizarCadenaEvento(variable: any) {
    var{frontend, next, sesionid, rol, assigneduser, eventchain, active, requestcode, cduser, creationuser, datecreation, updateuser, dateupdate}=variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/asignacion/modify/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdAssignedUser": assigneduser,
            "cdEventChain": eventchain,
            "active": active,
            "requestCode": requestcode,
            "cdUser": cduser,
            "txCreationUser": creationuser,
            "dtCreation": datecreation,
            "txUpdateUser": updateuser,
            "dtUpdate": dateupdate
        }).pipe(map(response => response || {}));
    }

    private handleError(error: HttpErrorResponse):
        Observable<any> {
        //Log error in the browser console
        console.error('observable error: ', error);

        return Observable.throw(error);
    }
}