
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({ selector: 'app-procesaevento', templateUrl: 'procesaevento.component.html' })
export class ProcesaeventoComponent implements OnInit {

    assigned: any;
    nexteventchain: any;
    namenexteventchain: any;
    eventChain: any;
    typeEventLog: any;
    sessionid: any;
    txRole: any;
    txuserdni: any;
    typerequestid: any;
    codrequest:any;
    constructor(
        private router: Router,
        private alertService: AlertService,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.assigned = JSON.parse(localStorage.getItem('assigneduser'));
        this.nexteventchain = JSON.parse(localStorage.getItem('nextEventChain'));
        this.namenexteventchain = JSON.parse(localStorage.getItem('linkchain'));
        this.eventChain = JSON.parse(localStorage.getItem('eventchain'));
        this.typeEventLog = 1; //valor quemado tipo log evento validacion
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));
        
        if (this.sessionid === null) {
            //this.lista = JSON.parse('[{"nextEventChain":"0","nextEventChain":"Sesion es nula"}]');
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

             this.validarsesion();
        }

        this.alertService.clear();
    }

    onSubmit() {
    }

    public validarPreguntasNextEslabon(): void {
        this.http.post<any>(`${process.env.EVENTBUSINESS}` + `/cafecert/processevenchain/`, {
            codRequest: this.codrequest ,
            assigned: this.assigned,
            nexteventchain: this.nexteventchain,
            namenexteventchain: this.namenexteventchain,
            eventChain: this.eventChain,
            typeEventLog: this.typeEventLog,
            sessionid: this.sessionid,
            TxRole: this.txRole,
            txuserdni: this.txuserdni,
            frontend: `${process.env.FRONTEND}` + `/cafecert/procesaevento/`,
            next: `${process.env.NEXT}` + `/cafecert/procesaevento/`
        })
            .subscribe(data => {
                console.log(data)
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                } else {
                    this.alertService.success("Solicitud " + this.codrequest+" ha pasado al evento "+ this.namenexteventchain + ". " +data['message']);
                    
                    localStorage.setItem('msgfromprocesaevento',"Solicitud " + this.codrequest+" ha pasado al evento "+ this.nexteventchain + ". " +data['message']);
                    //location.reload(true);
                    this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid }});
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
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                        } else {
                            this.txRole = data['role'];
                            this.txuserdni = data['dni'];
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }
}
