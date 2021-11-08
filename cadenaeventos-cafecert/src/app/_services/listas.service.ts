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

        //console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.USERBUSSINESS}` + '/cafecert/menulist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        })
            .pipe(map(response => response || {}));

    }


    flujotrabajo(variable: any) {
        var { frontend, next, sesionid, userdni, userrole } = variable;

        //console.log("vuserdni : " + userdni);
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/workflowbyuser/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userdni": userdni,
            "userrole": userrole,
            "variable": "0"
        })
            .pipe(map(response => response || {}));
    }

    flujotrabajonit(variable: any) {
        var { frontend, next, sesionid, userdni, userrole, nit } = variable;

        //console.log("vuserdni : " + userdni);
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/workflowbyusernit/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userdni": userdni,
            "userrole": userrole,
            "variable": nit
        })
            .pipe(map(response => response || {}));
    }

    flujocoderequest(variable: any) {
        var { frontend, next, sesionid, userdni, userrole, coderequest } = variable;

        //console.log("vuserdni : " + userdni);
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/workflowbyuserreqcod/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userdni": userdni,
            "userrole": userrole,
            "variable": coderequest
        })
            .pipe(map(response => response || {}));
    }


    plantilla(variable: any) {
        var { frontend, next, sesionid, userdni, userrole, requestcode } = variable;

        /*console.log(JSON.stringify({
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userdni": userdni,
            "userrole": userrole,
            "requestcode": requestcode,
            "txDocType":"S"
        }));
        */
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/templatelist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userdni": userdni,
            "userrole": userrole,
            "requestcode": requestcode,
            "txDocType":"S"
        })
            .pipe(map(response => response || {}));
    }

    public downloadPlantilla(variable: any): Observable<any> {
        var { frontend, next, sessionid, userrole, userdni, txname, txfilter,requestcode, outputformat, urltemplate} = variable;
        /*
        console.log(JSON.stringify({
            "frontend":  frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole ,
            "userdni": userdni,
            "txname": txname,
            "txfilter": txfilter,
            "requestcode": requestcode,
            "outputformat": outputformat,
            "urltemplate": urltemplate
        }));
        */
        return this.http.post(`${process.env.EVENTBUSINESS}` + '/cafecert/downloadtemplate/', {
            "frontend":  frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole ,
            "userdni": userdni,
            "txname": txname,
            "txfilter": txfilter,
            "requestcode": requestcode,
            "outputformat": outputformat,
            "urltemplate": urltemplate
        }, { responseType: 'arraybuffer' });
    }

    validaciones(variable: any) {
        var { codrequest, eventChain, typeEventLog, frontend, next, sessionid, textrole, textuserdni } = variable;

        //console.log("desde validaciones evencahin: " + eventChain);
        //console.log("desde validaciones typeEventLog: " + typeEventLog);
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/validationlist/', {
            "codRequest": codrequest,
            "eventChain": eventChain,
            "typeEventLog": typeEventLog,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "txRole": textrole,
            "txuserdni": textuserdni
        })
            .pipe(map(response => response || {}));

    }

    cadenaeventos(variable: any) {
        var { typerequestid, rol, sesionid, frontend, next } = variable;

        //console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/evenchainlist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "typerequest": typerequestid
        })
            .pipe(map(response => response || {}));

    }


    preguntas(variable: any) {
        var { eventChain, group, frontend, next, sessionid, textrole, textuserdni } = variable;
        console.log(JSON.stringify({
            "eventChain": eventChain,
            "group": group,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "txRole": textrole,
            "txuserdni": textuserdni
        }));
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/questionlist/', {
            "eventChain": eventChain,
            "group": group,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "txRole": textrole,
            "txuserdni": textuserdni
        })
            .pipe(map(response => response || {}));

    }


    saveTrace(variable: any) {
        var { codrequest, cdControlChain, cdEventChain, cdTypeEventLog, nuValue, txJson, txDescription, txCreationUser, frontend, next, session } = variable;
        
        console.log("Desde saveTrace: " +JSON.stringify({
            "codRequest": codrequest,
            "cdControlChain": cdControlChain,
            "cdEventChain": cdEventChain,
            "cdTypeEventLog": cdTypeEventLog,
            "nuValue": nuValue,
            "txJson": txJson,
            "txDescription": txDescription,
            "txCreationUser": txCreationUser,
            "frontend": frontend,
            "next": next,
            "session": session
        }));
        
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/trace/', {
            "codRequest": codrequest,
            "cdControlChain": cdControlChain,
            "cdEventChain": cdEventChain,
            "cdTypeEventLog": cdTypeEventLog,
            "nuValue": nuValue,
            "txJson": txJson,
            "txDescription": txDescription,
            "txCreationUser": txCreationUser,
            "frontend": frontend,
            "next": next,
            "session": session
        })
            .pipe(map(response => response || {}));

    }

    changeTrace(variable: any) {
        var { codrequest, cdControlChain, cdEventChain, cdTypeEventLog, nuValue, txJson, txDescription, txCreationUser, frontend, next, session } = variable;
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/changetrace/', {
            "codRequest": codrequest,
            "cdControlChain": cdControlChain,
            "cdEventChain": cdEventChain,
            "cdTypeEventLog": cdTypeEventLog,
            "nuValue": nuValue,
            "txJson": txJson,
            "txDescription": txDescription,
            "txCreationUser": txCreationUser,
            "frontend": frontend,
            "next": next,
            "session": session
        })
            .pipe(map(response => response || {}));

    }

    trazaFile(variable: any) {
        var { codrequest, eventChain, controlChain, typeEventLog, frontend, next, sessionid, txRole, txuserdni, nuValue, tipo, name, path } = variable;
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/trazafile/',  {
            "codRequest": codrequest,
            "eventChain": eventChain,
            "controlChain" : controlChain,
            "typeEventLog": typeEventLog,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "txRole": txRole,
            "txuserdni": txuserdni,
            "nuValue": nuValue,
            "tipo":  tipo,
            "name" : name,
            "path" : path
        })
            .pipe(map(response => response || {}));

    }


    archivos(variable: any) {
        var { codrequest, frontend, next, sessionid, textrole, textuserdni } = variable;
        return this.http.post<any>(`${process.env.FILEBUSINESS}` + '/cafecert/filesrepositoryrequest/',{
            "txCodRequest": codrequest,
            "txCreationUser" : textuserdni,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "txRole": textrole
        })
            .pipe(map(response => response || {}));
    }

    flujoAlterno(variable: any) {
        var { eventChain, typerequest, frontend, next, sessionid, textrole, textuserdni } = variable;

        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/noconformity/', {
            "eventChain": eventChain,
            "typerequest": typerequest,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "txrole": textrole,
            "txuserdni": textuserdni
        }
        )
            .pipe(map(response => response || {}));

    }


    consultarTodosUsuarios(variable: any) {
        var { rol, sesionid, frontend, next } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/userlist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    consultarTiposSolicitudes(variable: any) {
        var { rol, sesionid, frontend, next } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/tiposolicitud/list/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    asignarSolicitudUsuario(requestDTO: any) {
        //return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/asignacion/create/', requestDTO).pipe(map(response => response || {}));
        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/asignacion/createoredit', requestDTO).pipe(map(response => response || {}));
        
    }

    newevaluaciones(variable: any) {
        var { txuser, txRole, sesionid, frontend, next, action, requestcode } = variable;

        return this.http.post<any>(`${process.env.EVALUATIONBUSINESS}` + '/cafecert/newevaluationplan/', {
            "txuser": txuser,
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userrole": txRole,
            "action": action,
            "requestcode": requestcode
        })
            .pipe(map(response => response || {}));
    }

    saveEvaluation(variable: any) {
        var { cdrequest,txCodRequest, dtApplication, txAnswer, nuEssay, cdProductType, txCreationUser, cdLaboratory, frontend, next, sessionid } = variable;

        return this.http.post<any>(`${process.env.EVALUATIONBUSINESS}` + '/cafecert/evaluationplanorq/', {
            "cdrequest": cdrequest,
            "txCodRequest": txCodRequest,
            "dtApplication": dtApplication,
            "txAnswer": txAnswer,
            "nuEssay": nuEssay,
            "cdProductType": cdProductType,
            "txCreationUser": txCreationUser,
            "cdLaboratory": cdLaboratory,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid
        })
            .pipe(map(response => response || {}));

    }

    consultarTiposCafe(variable: any) {
        var { rol, sesionid, frontend, next } = variable;
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/coffeetypelist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    getAllProductTypeByRequestCode(variable: any) {
        var { frontend, next, sessionid, userrole, requestcode } = variable;

        console.log("pruductTypeAllByRequestCode - variable: " );
        console.log(variable)
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/producttypebycertificatefound/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "requestcode": "161",
        }).pipe(map(response => response || {}));

    }

    private handleError(error: HttpErrorResponse):
        Observable<any> {
        //Log error in the browser console
        console.error('observable error: ', error);

        return Observable.throw(error);
    }



}