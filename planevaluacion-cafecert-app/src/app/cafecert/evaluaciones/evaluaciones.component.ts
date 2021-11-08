
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({ templateUrl: 'evaluaciones.component.html' })
export class EvaluacionesComponent implements OnInit {
    lista = [];
    sessionId: any;
    txRole: any;
    txuserdni: any;
    constructor(
        private router: Router,
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.rutaActiva.queryParams.subscribe(params => {
            this.sessionId = params['param'];
            if (this.sessionId === null) {
                this.lista = [];
                this.alertService.error('No se ha podido validar la sesion.');
            } else {
                this.validarsesion();
            }
        });
    }

    onSubmit() {
        this.alertService.clear();
    }

    public validarsesion(): void {
        this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionId
        })
            .subscribe(data => {
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                        } else {
                            this.txRole = data['role'];
                            this.txuserdni = data['dni'];
                            this.listasService.evaluaciones({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionId, "txRole": data['role'] , "action": "all"})
                                .subscribe(data => {
                                    if (data['status'] === `Internal Server Error`) {
                                        this.alertService.error(data['message']);
                                    } else {
                                        this.lista = data;
                                    }
                                })
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }

    public crearevaluacion(): void {
        //console.log("desde crearevaluacion: " + this.sessionId);
        localStorage.setItem("idsession", JSON.stringify(this.sessionId));
        //console.log("sessionid: " + localStorage.getItem("sessionid"));

        this.router.navigate(['/cafecert/nuevaevaluacion']);
    }

    public iraeditarevaluacion(variable : any){
        var { cdEvaluationPlan,txCodRequest, sesionid, frontend, next, txcode } = variable;
        localStorage.setItem("idsession", JSON.stringify(this.sessionId));
        localStorage.setItem("txCodRequest", JSON.stringify(txCodRequest));
        this.router.navigate(['/cafecert/actualizaevaluacion']);
    }

    public regresarLista(): void {

        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionId } });
    }
}
