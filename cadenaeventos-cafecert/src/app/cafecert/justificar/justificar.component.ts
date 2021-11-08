
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({ selector: 'app-justificar', templateUrl: 'justificar.component.html' })
export class JustificarComponent implements OnInit {
    lista = [];
    justifForm: FormGroup;
    assigned: any;
    jumpEventChain: any;
    nameCurrentChain: any;
    nameNextChain: any;
    namenexteventchain: any;
    eventChain: any;
    typeEventLog: any;
    sessionid: any;
    txRole: any;
    txuserdni: any;
    typerequestid: any;
    cdRequest: any;
    codrequest: any;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private listasService: ListasService,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.eventChain = JSON.parse(localStorage.getItem('eventchain'));
        this.typerequestid = JSON.parse(localStorage.getItem('typerequestid'));
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        this.assigned = JSON.parse(localStorage.getItem('assigneduser'));
        this.jumpEventChain = JSON.parse(localStorage.getItem('nextEventChain'));
        this.nameCurrentChain = JSON.parse(localStorage.getItem('nameCurrentChain'));
        this.nameNextChain = JSON.parse(localStorage.getItem('nameNextChain'));
        
        this.cdRequest = JSON.parse(localStorage.getItem('cdRequest'));
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));

        this.justifForm = this.formBuilder.group({
            observacion: ['', Validators.required]
        });

        //console.log("ha entrado a justficar");

        if (this.sessionid === null) {
            //this.lista = JSON.parse('[{"nextEventChain":"0","nextEventChain":"Sesion es nula"}]');
            this.alertService.error('No se ha podido validar la sesion. El valor de sesion id es nulo');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();
    }

    // convenience getter for easy access to form fields
    get f() { return this.justifForm.controls; }

    onSubmit() {
        this.alertService.clear();

        // stop here if form is invalid
        if (this.justifForm.invalid) {
            return;
        }
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
                            //console.log(JSON.stringify({ eventChain: this.eventChain, typerequest: this.typerequestid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: data[`role`], textuserdni: data[`dni`] }));
                            this.listasService.flujoAlterno({ eventChain: this.eventChain, typerequest: this.typerequestid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: data[`role`], textuserdni: data[`dni`] })
                                .subscribe(data => {
                                    this.lista = data;
                                    //console.log(JSON.stringify( this.lista));
                                });

                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }

    public regresarflujo(): void {
        this.listasService.saveTrace({
            "codrequest": this.cdRequest,
            "cdControlChain": "0",
            "cdEventChain": this.eventChain,
            "cdTypeEventLog": "6",
            "nuValue": "0",
            "txJson": JSON.stringify(this.lista),
            "txDescription": "Usuario siguio flujo normal",
            "txCreationUser": this.txuserdni,
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "session": this.sessionid
        }).subscribe(data => {
            if (data['status'] === `Internal Server Error`) {
                this.alertService.error(data['message']);
            }
        });
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    public iraflujonuevo(variable: any): void {
        var { cdAlternativeChain, currentEventChain, jumpEventChain, jumpTypeRequest, txObservation, txCreationUser, txActive } = variable;
        //console.log("observation:" + this.f.observacion.value);
        if (this.f.observacion.value === null || this.f.observacion.value === "" || this.f.observacion.value.length < 1) {
            this.alertService.error("Olvido llenar la observacion");
        } else {
            this.http.post<any>(`${process.env.EVENTBUSINESS}` + `/cafecert/alternateprocess/`, {
                "codRequest": this.cdRequest,
                "assigned": this.assigned,
                "nexteventchain": jumpEventChain,
                "observation": this.f.observacion.value,
                "eventChain": this.eventChain,
                "typeEventLog": "5",
                "sessionid": this.sessionid,
                "txRole": this.txRole,
                "txuserdni": this.txuserdni,
                "frontend": `${process.env.FRONTEND}` + `/cafecert/justificar/`,
                "next": `${process.env.NEXT}` + `/cafecert/justificar/`
            })
                .subscribe(data => {
                    //console.log(data);
                    if (data['status'] === `Internal Server Error`) {
                        this.alertService.error(data['message']);
                    } else {
                        //this.alertService.success("Solicitud " + this.codrequest + " ha pasado al evento alterno " + this.jumpEventChain + ". " + data['message']);
                        //localStorage.setItem('msgfromprocesaevento', "Solicitud " + this.codrequest + " ha pasado al evento " + this.jumpEventChain + ". " + data['message']);
                        this.alertService.success("Solicitud " + this.codrequest + " ha pasado del evento " + this.nameCurrentChain + " hacia el evento " + this.nameNextChain + ". " + data['message']);
                        localStorage.setItem('msgfromprocesaevento', "Solicitud " + this.codrequest + " ha pasado del evento " + this.nameCurrentChain + " hacia el evento " + this.nameNextChain + ". " + data['message']);
                           
                        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
                    }
                },
                    error => {
                        this.alertService.error(error);
                        this.router.navigate(['/cafecert/justificar']);
                    });
        }

    }

}
