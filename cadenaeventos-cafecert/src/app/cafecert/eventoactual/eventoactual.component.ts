
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({ selector: 'app-eventoactual', templateUrl: 'eventoactual.component.html' })
export class EventoactualComponent implements OnInit {

    sessionid: any;
    eventChain: any;
    linkchain: any;
    empresa: any;
    creationUser: any;
    dtCreation: any;
    typerequest: any;
    codrequest: any;
    constructor(
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        this.eventChain = JSON.parse(localStorage.getItem('evenchain'));
        this.linkchain = JSON.parse(localStorage.getItem('linkchain'));
        this.typerequest = JSON.parse(localStorage.getItem('typerequest'));
        this.empresa = JSON.parse(localStorage.getItem('empresa'));
        this.creationUser = JSON.parse(localStorage.getItem('txCreationUser'));
        this.dtCreation = JSON.parse(localStorage.getItem('dtCreation'));
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));
       
        console.log("typerequest desde evento actual: :" + this.typerequest);
        console.log("linkchain desde evento actual: :" + this.linkchain);

    }

    onSubmit() {
        this.alertService.clear();
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
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                        } else {
                            this.listasService.cadenaeventos({ typerequestid: this.typerequest, rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
                                .subscribe(data => {
                                    console.log(data)
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
