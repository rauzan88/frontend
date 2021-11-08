import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ListasService {
    constructor(private http: HttpClient, private _route: ActivatedRoute,) { }


    menuByRole(variable: any) {
        var { rol, sesionid, frontend, next } = variable;

        console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.USERBUSSINESS}` + '/cafecert/menulist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        })
            .pipe(map(response => response || {}));

    }

    certificados(variable: any) {
        var { rol, sesionid, frontend, next } = variable;

        console.log("variable : ");
        console.log(variable)
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificatelist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        })
            .pipe(map(response => response || {}));

    }

    certificateByCode(variable: any) {
        var { txCodeCertificate, sesionid, frontend, next } = variable;

        console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificate/certificateByCode/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txCodeCertificate": txCodeCertificate,
        })
            .pipe(map(response => response || {}));
    }

    certificateByNit(variable: any) {
        var { txNit, sesionid, frontend, next } = variable;

        console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificate/certificateByNit/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txNit": txNit
        })
            .pipe(map(response => response || {}));
    }

    certificateByRequest(variable: any) {
        var { certificatecode, requestcode, userrole, sesionid, frontend, next } = variable;

         return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificateproduct/iscertificateorq/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userrole": userrole,
            "cdRequest": requestcode,
            "txCodCertificate": certificatecode
        })
            .pipe(map(response => response || {}));
    }

    estados(variable: any) {
        var { frontend, next, sessionid, userrole, action } = variable;

        //console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificatestatusfound/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "action": action
        })
            .pipe(map(response => response || {}));

    }

    descripcioncafe(variable: any) {
        var { frontend, next, sessionid, userrole, action } = variable;

        //console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/coffeetypefound/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "action": action
        })
            .pipe(map(response => response || {}));

    }

    presentacioncafe(variable: any) {
        var { frontend, next, sessionid, userrole, action } = variable;

        //console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/coffeepresenfound/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "action": action
        })
            .pipe(map(response => response || {}));

    }


    tipoProgramaAgrupado(variable: any) {
        var { frontend, next, sessionid, userrole, action } = variable;

        //console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/progtypedescripfound/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "action": action
        })
            .pipe(map(response => response || {}));

    }

    clientesGeneral(variable: any) {
        var { frontend, next, sessionid, userrole, filername, filtervalue } = variable;

        //console.log("variable : " + variable);
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/clientgnrl/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "filername": filername,
            "filtervalue": filtervalue
        })
            .pipe(map(response => response || {}));
    }

    certByClientProg(variable: any) {
        var { frontend, next, sessionid, userrole, client, program } = variable;


        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificateclientprog/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "client": client,
            "program": program
        })
            .pipe(map(response => response || {}));
    }

    
    productByClientProg(variable: any) {
        var { frontend, next, sessionid, userrole, client, program } = variable;


        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificateproduct/clientprogorq/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userrole,
            "client": client,
            "program": program
        })
            .pipe(map(response => response || {}));
    }

    upCertificate(variable: any) {
        var { cdCertificate, cdCertificateStatus,  cdClient, cdProduct, cdProgramType, cdRequest,
            consecutive, txEurope, txActivityPerformed, txLanguage, txCreationUser, dtGrantCertificate, dtRetireCertificate,
            dtUpdateCertificate, dtDiscontinued, dtSupervision, txIsCertified, txCodCertificate, frontend, next, sessionid } = variable;

        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificateup/', {
            "cdCertificate": cdCertificate,
            "cdCertificateStatus": cdCertificateStatus,
            "cdClient": cdClient,
            "cdProduct": cdProduct,
            "cdProgramType": cdProgramType,
            "cdRequest": cdRequest,
            "consecutive": consecutive,
            "txLanguage": txLanguage,
            "txEurope": txEurope,
            "txActivityPerformed": txActivityPerformed,
            "txUser": txCreationUser,
            "dtGrantCertificate": dtGrantCertificate,
            "dtRetireCertificate": dtRetireCertificate,
            "dtUpdateCertificate": dtUpdateCertificate,
            "dtDiscontinued": dtDiscontinued,
            "dtSupervision": dtSupervision,
            "txIsCertified": txIsCertified,
            "txCodCertificate": txCodCertificate,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid
        }).pipe(map(response => response || {}));
    }

    
    upTxApproved(variable: any) {
        var { frontend, next, sessionid, cdCertificateProduct, txApproved, cdCertificate, cdProduct } = variable;
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/certificateproduct/uptxapproved/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "cdCertificateProduct": cdCertificateProduct,
            "txApproved": txApproved,
            "cdCertificate": cdCertificate,
            "cdProduct": cdProduct
        })
            .pipe(map(response => response || {}));
    }

    upStateRequest(variable: any) {
        var { frontend, next, sessionid, userdni, requestcode, newstate } = variable;
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafecert/requestupstateorq/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userdni": userdni,
            "requestcode": requestcode,
            "newstate": newstate
        })
            .pipe(map(response => response || {}));
    }


    procesoSolicitud(variable: any) {
        var { frontend, next, sessionid, userdni, typeeventlog, certificatetype, request } = variable;
        return this.http.post<any>(`${process.env.CERTIFBUSINESS}` + '/cafesert/certificate/fullchainofevent/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "userrole": userdni,
            "typeeventlog": typeeventlog,
            "certificatetype": certificatetype,
            "request": request
        })
            .pipe(map(response => response || {}));
    }

    private handleError(error: HttpErrorResponse):
        Observable<any> {
        //Log error in the browser console
        console.error('observable error: ', error);

        return Observable.throw(error);
    }
    plantilla(variable: any) {
        var { frontend, next, sesionid, userdni, userrole, requestcode } = variable;

        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/templatelist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userdni": userdni,
            "userrole": userrole,
            "requestcode": requestcode,
            "txDocType":"C"
        })
            .pipe(map(response => response || {}));
    }

    public downloadPlantilla(variable: any): Observable<any> {
        var { frontend, next, sessionid, userrole, userdni, txname, txfilter,requestcode, certificatecode, outputformat, urltemplate} = variable;
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
            "certificatecode": certificatecode,
            "outputformat": outputformat,
            "urltemplate": urltemplate
        }, { responseType: 'arraybuffer' });
    }
}