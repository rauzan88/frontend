
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({ selector: 'app-cadenaevento', templateUrl: 'cadenaevento.component.html' })
export class CadenaeventoComponent implements OnInit {
    lista = [];
    sessionid: any;
    eventChain: any;
    typerequestid: any;
    constructor(
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.eventChain = JSON.parse(localStorage.getItem('evenchain'));
        this.typerequestid = JSON.parse(localStorage.getItem('typerequestid'));
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        console.log("desde cadena evento typerequestid :" + localStorage.getItem('typerequestid'));
       /* this.listasService.cadenaeventos({
            "typerequestid" : this.typerequestid,
            "rol" : "role",
            "sesionid" : this.sessionid,
            "frontend" : `${process.env.FRONTEND}`,
            "next" : `${process.env.NEXT}`
        })
            .subscribe(data => {
                console.log(data)
                this.lista = data;
            });
            */
       
            
            if (this.sessionid === null) {
                this.lista = JSON.parse('[{"nextEventChain":"0","nextEventChain":"Sesion es nula"}]');
                this.alertService.error('No se ha podido validar la sesion.');
            } else {

                this.validarsesion();
            }
       
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
                            this.listasService.cadenaeventos({ typerequestid : this.typerequestid, rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
                                .subscribe(data => {
                                    console.log(data)
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
