import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';


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

    obtenerSolicitudes(variable: any) {
        var { rol, sesionid, frontend, next } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/requestlist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        })
            .pipe(map(response => response || {}));
    }

    obtenerSolicitudesPorNit(variable: any) {
        var { rol, sesionid, frontend, next, txNit } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/listasolicitudes/nitcliente', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "txNit": txNit
        })
            .pipe(map(response => response || {}));
    }

    obtenerSolicitudesPorCodCliente(variable: any) {
        var { rol, sesionid, frontend, next, txCodClient } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/listasolicitudes/cdcliente/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "txCodClient": txCodClient
        })
            .pipe(map(response => response || {}));
    }

    obtenerSolicitudesPorCodSolicitud(variable: any) {
        var { rol, sesionid, frontend, next, txCodRequest } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/requestlist/cdrequest/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "txCodRequest": txCodRequest
        })
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

    asignarSolicitudPorDefecto(variable: any) {
        var { frontend, next, sesionid, rol, eventchain, active, requestcode, creationuser } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/asignacion/createfordefault/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdEventChain": eventchain,
            "active": active,
            "requestCode": requestcode,
            "creationUser": creationuser
        }).pipe(map(response => response || {}));
    }

    asignarSolicitudUsuario(requestDTO: any) {
        //return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/asignacion/create/', requestDTO).pipe(map(response => response || {}));
        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/asignacion/createoredit', requestDTO).pipe(map(response => response || {}));
        
    }

    consultarTodosPaises(variable: any) {
        var { rol, sesionid, frontend, next } = variable;
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/countrylist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    consultarTiposCertificaciones(variable: any) {
        var { rol, sesionid, frontend, next } = variable;
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/certificationtypelist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    consultarTodasActividadesIndustriales(variable: any) {
        var { rol, sesionid, frontend, next } = variable;
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/industrialactivitylist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    consultarTodosDepartamentos(variable: any) {
        var { rol, sesionid, frontend, next } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/statelist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    consultarDepartamentosPorPais(request: any) {
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/statelist/byCountry/', {
            "frontend": request.frontend,
            "next": request.next,
            "sessionid": request.sesionid,
            "txRole": request.rol,
            "cdCountry": request.cdCountry
        }).pipe(map(response => response || {}));
    }

    consultarTodasCiudades(variable: any) {
        var { rol, sesionid, frontend, next } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/citylist/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol
        }).pipe(map(response => response || {}));
    }

    consultarCiudadesPorDepartamento(request: any) {
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/citylist/byState/', {
            "frontend": request.frontend,
            "next": request.next,
            "sessionid": request.sesionid,
            "txRole": request.rol,
            "cdState": request.cdState
        }).pipe(map(response => response || {}));
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

    consultarSolicitud(variable: any) {
        var { rol, sesionid, frontend, next, cdrequest } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/request/read/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdRequest": cdrequest
        }).pipe(map(response => response || {}));
    }

    consultarClientePorNit(variable: any) {
        var { rol, sesionid, frontend, next, nit } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/client/nit/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "nit": nit
        }).pipe(map(response => response || {}));
    }

    consultarClientePorId(variable: any) {
        var { rol, sesionid, frontend, next, id } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/client/read/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": id
        }).pipe(map(response => response || {}));
    }

    consultarContactoPorCliente(variable: any) {
        var { rol, sesionid, frontend, next, cdClient } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/contact/byclient/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdClient
        }).pipe(map(response => response || {}));
    }

    consultarRepresentanteCliente(variable: any) {
        var { rol, sesionid, frontend, next, cdClient } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/representant/byclient/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdClient
        }).pipe(map(response => response || {}));
    }

    consultarPersonasPorCliente(cdClient: any) {
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/person/byclient/', {
            "cdClient": cdClient
        }).pipe(map(response => response || {}));
    }

    crearSolicitud(variable: any) {
        var { frontend, next, sesionid, rol, sanitaryStd, identifyPrc, declare, certificationType, 
            cdClient, cdCountry, creationuser, requestdate, txDo, txIgp, txDor, codCertificate, 
            codClient, cdStateRequest,nuinvoice, dtinvoice, dtemailin, dtsignagree, dtcommitatter, 
            nuregthresher, nuregtoaster, nuregsolubilizer, nuregextract } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/request/create/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "txSanitaryStd": sanitaryStd,
            "txIdentifyPrc": identifyPrc,
            "txDeclare": declare,
            "cdCertificationType": certificationType,
            "cdClient": cdClient,
            "cdCountry": cdCountry,
            "txCreationUser": creationuser,
            "dtRequest": requestdate,
            "txDo": txDo,
            "txIgp": txIgp,
            "txDor": txDor,
            "txCodCertificate": codCertificate,
            "txCodClient": codClient,
            "cdStateRequest": cdStateRequest,
            "nuInvoice": nuinvoice,
            "dtInvoice": dtinvoice,
            "dtEmailIn": dtemailin,
            "dtSignAgree": dtsignagree,
            "dtCommitAtter": dtcommitatter,
            "nuRegThresher": nuregthresher,
            "nuRegToaster": nuregtoaster,
            "nuRegSolubilizer": nuregsolubilizer,
            "nuRegExtract": nuregextract
        }).pipe(map(response => response || {}));
    }

    editarSolicitud(variable: any) {
        var { frontend, next, sesionid, rol, cdrequest, txCodRequest, nuinvoice, dtinvoice, dtemailin,
            dtsignagree, dtcommitatter, nuregthresher, nuregtoaster, nuregsolubilizer,
            nuregextract, updateuser, txReasonUpdate,
            sanitaryStd, identifyPrc, declare, certificationType, cdClient,
            cdCountry, creationuser, requestdate, txDo, txIgp, txDor, codCertificate } = variable;

        return this.http.post<any>(`${process.env.REQUESTBUSINESS}` + '/cafecert/request/edit/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdRequest": cdrequest,
            "txCodRequest": txCodRequest,
            "txSanitaryStd": sanitaryStd,
            "txIdentifyPrc": identifyPrc,
            "txDeclare": declare,
            "cdCertificationType": certificationType,
            "cdClient": cdClient,
            "cdCountry": cdCountry,
            "txCreationUser": creationuser,
            "dtRequest": requestdate,
            "txDo": txDo,
            "txIgp": txIgp,
            "txDor": txDor,
            "txCodCertificate": codCertificate,
            "nuInvoice": nuinvoice,
            "dtInvoice": dtinvoice,
            "dtEmailIn": dtemailin,
            "dtSignAgree": dtsignagree,
            "dtCommitAtter": dtcommitatter,
            "nuRegThresher": nuregthresher,
            "nuRegToaster": nuregtoaster,
            "nuRegSolubilizer": nuregsolubilizer,
            "nuRegExtract": nuregextract,
            "txUpdateUser": updateuser,
            "txReasonUpdate": txReasonUpdate
        }).pipe(map(response => response || {}));
    }

    crearCliente(variable: any) {
        var { rol, sesionid, frontend, next, name, nit, pbx, phone, mobile, email, address, mailAddress, web, courtNotice, city, creationUser } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/client/create/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "txName": name,
            "txNit": nit,
            "txPbx": pbx,
            "txPhone": phone,
            "txMobile": mobile,
            "txEmail": email,
            "txAddress": address,
            "txMailAddress": mailAddress,
            "txWeb": web,
            "txCourtNotice": courtNotice,
            "cdCity": city,
            "txCreationUser": creationUser
        }).pipe(map(response => response || {}));
    }

    editarCliente(variable: any) {
        var { rol, sesionid, frontend, next, cdclient, name, nit, pbx, phone, mobile, email, address, mailAddress, web, courtNotice, city, codClient, updateUser } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/client/update/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdclient,
            "txName": name,
            "txNit": nit,
            "txPbx": pbx,
            "txPhone": phone,
            "txMobile": mobile,
            "txEmail": email,
            "txAddress": address,
            "txMailAddress": mailAddress,
            "txWeb": web,
            "txCourtNotice": courtNotice,
            "cdCity": city,
            "txCodClient": codClient,
            "txUpdateUser": updateUser
        }).pipe(map(response => response || {}));
    }

    crearActividadIndustrialCliente(variable: any) {
        var { rol, sesionid, frontend, next, cdclient, cdindustrialactivity } = variable;
        //var{rol, sesionid, frontend, next, cdclient, cdindustrialactivity, creationUser}=variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/clientactivity/create/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdclient,
            "cdIndustrialActivity": cdindustrialactivity
            //"txCreationUser": creationUser
        }).pipe(map(response => response || {}));
    }

    borrarActividadesIndustrialesPorCliente(variable: any) {
        var { rol, sesionid, frontend, next, cdclient } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/clientactivity/remove/byclient', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdclient
        }).pipe(map(response => response || {}));
    }

    consultarActividadesIndustrialesPorCliente(variable: any) {
        var { rol, sesionid, frontend, next, cdclient } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/industrialactivitylist/byclient/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdclient
        }).pipe(map(response => response || {}));
    }

    crearContacto(variable: any) {
        var { rol, sesionid, frontend, next, cdClient, position, firstName, lastName, address, mobile, email, creationUser } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/person/savecontact/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdClient,
            "txPosition": position,
            "txFirstName": firstName,
            "txLastName": lastName,
            "txAddress": address,
            "txMobile": mobile,
            "txEmail": email,
            "txCreationUser": creationUser
        }).pipe(map(response => response || {}));
    }

    editarPersona(variable: any) {
        var { rol, sesionid, frontend, next, cdperson, cdClient, position, firstName, lastName, address, mobile, email, contactType, updateUser } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/person/update', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdPerson": cdperson,
            "cdClient": cdClient,
            "txPosition": position,
            "txFirstName": firstName,
            "txLastName": lastName,
            "txAddress": address,
            "txMobile": mobile,
            "txEmail": email,
            "cdContactType": contactType,
            "txUpdateUser": updateUser
        }).pipe(map(response => response || {}));
    }

    crearRepresentante(variable: any) {
        var { rol, sesionid, frontend, next, cdClient, position, firstName, lastName, address, mobile, email, creationUser } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/person/saverepresentant/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdClient": cdClient,
            "txPosition": position,
            "txFirstName": firstName,
            "txLastName": lastName,
            "txAddress": address,
            "txMobile": mobile,
            "txEmail": email,
            "txCreationUser": creationUser
        }).pipe(map(response => response || {}));
    }

    crearMarca(variable: any) {
        var { rol, sesionid, frontend, next, txName, txReference, cdCoffeeType, cdRequest, creationUser } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/trademark/create/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "txName": txName,
            "txReference": txReference,
            "cdCoffeeType": cdCoffeeType,
            "cdRequest": cdRequest,
            "txCreationUser": creationUser
        }).pipe(map(response => response || {}));
    }

    borrarMarcas(variable: any) {
        var { rol, sesionid, frontend, next, cdRequest } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/trademark/removebyrequest/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdRequest": cdRequest
        }).pipe(map(response => response || {}));
    }

    consultarMarcas(variable: any) {
        var { rol, sesionid, frontend, next, cdrequest } = variable;

        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/trademarks/byrequest', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdRequest": cdrequest
        }).pipe(map(response => response || {}));
    }

    crearArchivo(fileToUpload: File, directory: string, subdirectory: string) {
        const formData = new FormData();
        console.log("fileToUpload.name: " + fileToUpload.name);

        formData.append('file', fileToUpload);
        formData.append('directory', directory);
        formData.append('subdirectory', subdirectory);

        //return this.http.post<any>(`${process.env.FILEBUSINESS}` + '/cafecert/filerepository/save/', formData)
        return this.http.post<any>(`${process.env.FILECRUD}` + '/cafecert/savefile/', formData)
            .pipe(map(response => response || {}));
    }

    saveTrace(variable: any) {
        var { codrequest, cdControlChain, cdEventChain, cdTypeEventLog, nuValue, txJson, txDescription, txCreationUser, frontend, next, session } = variable;
        return this.http.post<any>(`${process.env.EVENTBUSINESS}` + '/cafecert/trace/', {
            "codrequest": codrequest,
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

    obtenerArchivos(variable: any) {
        var { codrequest, frontend, next, sessionid, textrole, textuserdni } = variable;

        return this.http.post<any>(`${process.env.FILEBUSINESS}` + '/cafecert/filesrepositoryrequest/', {
            "txCodRequest": codrequest,
            "txCreationUser": textuserdni,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid,
            "txRole": textrole
        })
            .pipe(map(response => response || {}));
    }

    private handleError(error: HttpErrorResponse):
        Observable<any> {
        //Log error in the browser console
        return Observable.throw(error);
    }

    evaluaciones(variable: any) {
        var { txuser, txRole, sesionid, frontend, next, action } = variable;

        return this.http.post<any>(`${process.env.EVALUATIONBUSINESS}` + '/cafecert/evaluationplanlist/', {
            "txuser": txuser,
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userrole": txRole,
            "action": action
        })
            .pipe(map(response => response || {}));

    }

    newevaluaciones(variable: any) {
        var { txuser, txRole, sesionid, frontend, next, action } = variable;
        
        return this.http.post<any>(`${process.env.EVALUATIONBUSINESS}` + '/cafecert/newevaluationplan/', {
            "txuser": txuser,
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userrole": txRole,
            "action": action
        })
            .pipe(map(response => response || {}));
    }


    upevaluaciones(variable: any) {
        var { txuser, txRole, sesionid, frontend, next, txcode } = variable;

        return this.http.post<any>(`${process.env.EVALUATIONBUSINESS}` + '/cafecert/upevaluationplanlist/', {
            "txuser": txuser,
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "userrole": txRole,
            "txcode": txcode
        })
            .pipe(map(response => response || {}));
    }

    saveEvaluation(variable: any) {
        var { txCodRequest, dtApplication, txAnswer, nuEssay, txCreationUser, cdLaboratory, frontend, next, sessionid } = variable;
        return this.http.post<any>(`${process.env.EVALUATIONBUSINESS}` + '/cafecert/evaluationplanorq/', {
            "txCodRequest": txCodRequest,
            "dtApplication": dtApplication,
            "txAnswer": txAnswer,
            "nuEssay": nuEssay,
            "txCreationUser": txCreationUser,
            "cdLaboratory": cdLaboratory,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid
        })
            .pipe(map(response => response || {}));

    }

    updateEvaluation(variable: any) {
        var { cdEvaluationPlan, txCodRequest, dtApplication, txAnswer, nuEssay, txCreationUser, cdLaboratory, frontend, next, sessionid } = variable;
        return this.http.post<any>(`${process.env.EVALUATIONBUSINESS}` + '/cafecert/evaluationplanupdate/', {
            "cdEvaluationPlan": cdEvaluationPlan,
            "txCodRequest": txCodRequest,
            "dtApplication": dtApplication,
            "txAnswer": txAnswer,
            "nuEssay": nuEssay,
            "txCreationUser": txCreationUser,
            "cdLaboratory": cdLaboratory,
            "frontend": frontend,
            "next": next,
            "sessionid": sessionid
        })
            .pipe(map(response => response || {}));

    }

    consultarPaisDesdeIdCiudad(variable: any) {
        var { rol, sesionid, frontend, next, cdCity } = variable;
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/country/by_city/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdCity": cdCity
        }).pipe(map(response => response || {}));
    }

    consultarCiudadPorId(variable: any) {
        var { rol, sesionid, frontend, next, cdCity } = variable;
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/city/read/', {
            "frontend": frontend,
            "next": next,
            "sessionid": sesionid,
            "txRole": rol,
            "cdCity": cdCity
        }).pipe(map(response => response || {}));
    }

    consultarTodasRegiones(request: any) {
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/regionlist/', request).pipe(map(response => response || {}));
    }

    crearSolicitudRegion(request: any) {
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/requestregion/create', request)
            .pipe(map(response => response || {}));
    }

    listaSolicitudRegionPorCdSolicitud(request: any) {
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/requestregion/byrequest', request).pipe(map(response => response || []));
    }

    borrarSolicitudRegionPorCdSolicitud(request: any) {
        return this.http.post<any>(`${process.env.INFOBASEBUSINES}` + '/cafecert/requestregion/remove/byclient',
            request).pipe(map(response => response || {}));
    }

    guardarRegistroArchivoSolicitud(request: any) {
        return this.http.post<any>(`${process.env.FILEBUSINESS}` + '/cafecert/filesrepositorysave/', request);
    }
}