
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({ selector: 'app-noconformidad', templateUrl: 'noconformidad.component.html' })
export class NoconformidadComponent implements OnInit {
    lista = [];
    assigned: any;
    nexteventchain: any;
    namenexteventchain: any;
    eventChain: any;
    typeEventLog: any;
    sessionid: any;
    txRole: any;
    txuserdni: any;
    typerequestid: any;
    cdRequest:any;
    codrequest: any;
    constructor(
        private router: Router,
        private alertService: AlertService,
        private listasService: ListasService,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.eventChain = JSON.parse(localStorage.getItem('evenchain'));
        this.typerequestid = JSON.parse(localStorage.getItem('typerequestid'));
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));

        this.assigned = JSON.parse(localStorage.getItem('assigneduser'));
        this.nexteventchain = JSON.parse(localStorage.getItem('nextEventChain'));
        this.namenexteventchain = JSON.parse(localStorage.getItem('linkchain'));
        this.typeEventLog = 1; //valor quemado tipo log evento validacion
        this.cdRequest = JSON.parse(localStorage.getItem('cdRequest'));
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));

        if (this.sessionid === null) {
            //this.lista = JSON.parse('[{"nextEventChain":"0","nextEventChain":"Sesion es nula"}]');
            this.alertService.error('No se ha podido validar la sesion. El valor de sesion id es nulo');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();
    }

    onSubmit() {
    }

    public validarRespuestas(variable: any): void {
        var { cdAlternativeChain, currentEventChain, jumpEventChain, jumpTypeRequest, txObservation, txCreationUser, txActive } = variable;
        localStorage.setItem("jumpEventChain", JSON.stringify(jumpEventChain));
        //console.log("jumpEventChain: " + jumpEventChain);
        this.http.post<any>(`${process.env.EVENTBUSINESS}` + `/cafecert/validateanswers/`, {
            assigned: this.assigned,
            codRequest: this.cdRequest,
            nexteventchain: this.nexteventchain,
            namenexteventchain: this.namenexteventchain,
            eventChain: this.eventChain,
            typeEventLog: this.typeEventLog,
            sessionid: this.sessionid,
            TxRole: this.txRole,
            txuserdni: this.txuserdni,
            frontend: `${process.env.FRONTEND}` + `/cafecert/noconformidad/`,
            next: `${process.env.NEXT}` + `/cafecert/noconformidad/`
        })
            .subscribe(data => {
                //console.log(data)
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                } else {
                    this.router.navigate(['/cafecert/justificar/']);
                    //this.alertService.success(data['message']);
                    //this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid }});
                }
            },
                error => {
                    this.alertService.error(error);
                });

    }

    public validarsesion(): void {
        this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionid
        })
            .subscribe(data => {
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                    this.lista = [];
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                        this.lista = [];
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                            this.lista = [];
                        } else {
                            this.txRole = data['role'];
                            this.txuserdni = data['dni'];
                            this.listasService.flujoAlterno({ eventChain: this.eventChain, typerequest: this.typerequestid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: data[`role`], textuserdni: data[`dni`] })
                                .subscribe(data => {
                                    this.lista = data;
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }
}
