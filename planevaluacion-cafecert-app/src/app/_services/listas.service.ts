import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ListasService {
    constructor(private http: HttpClient, private _route: ActivatedRoute,) { }


   
   

    evaluaciones(variable: any) {
        var { txuser,txRole, sesionid, frontend, next, action } = variable;

        console.log("variable : " + variable);
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
        var { txuser,txRole, sesionid, frontend, next, action } = variable;

        console.log("variable : " + variable);
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
        var { txuser,txRole, sesionid, frontend, next, txcode } = variable;

        console.log("variable : " + variable);
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
        var { cdEvaluationPlan,txCodRequest, dtApplication, txAnswer, nuEssay, txCreationUser, cdLaboratory, frontend, next, sessionid } = variable;
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
    
    private handleError(error: HttpErrorResponse):
        Observable<any> {
        //Log error in the browser console
        console.error('observable error: ', error);

        return Observable.throw(error);
    }



}