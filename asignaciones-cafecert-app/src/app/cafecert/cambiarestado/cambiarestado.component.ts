
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({ templateUrl: 'cambiarestado.component.html' })
export class CambiarEstadoComponent implements OnInit {
    homeForm: FormGroup;
    loading = false;
    submitted = false;
    role: any;
    dni: any;
    sessionid: any;
    assigneduserID: any;
    eventchainID: any;
    lista = [];
    listaCadenasEventos: any;

    
    constructor(
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.validarSesion();
    }

    ngOnInit() {
        this.homeForm = this.formBuilder.group({
            itemEvenChain: ['', Validators.required],
            actividades01: []
        });
    }

    onSubmit() {
        this.alertService.clear();
    }

    get f() { return this.homeForm.controls; }

    public validarSesion(): void {
        this.assigneduserID = JSON.parse(localStorage.getItem("assigneduserID"));
        this.eventchainID = JSON.parse(localStorage.getItem("eventchainID"));
        this.sessionid = JSON.parse(localStorage.getItem("sessionid"));
        console.log("Transferir en la navegación assigneduserID: " + this.assigneduserID);
        console.log("Transferir en la navegación eventchainID: " + this.eventchainID);
        console.log("Transferir en la navegación sessionid: " + this.sessionid);

        this.http.post<any>(`${process.env.USERBUSSINESS}`+`/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionid
        })
            .subscribe(data => {
                this.role = data['role'];
                this.dni = data['dni'];

                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                    this.lista = JSON.parse('{}');
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                        this.lista = JSON.parse('{}');
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                            this.lista = JSON.parse('{}');
                        } else {
                            this.listasService.consultarCadenaEventos({rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, eventchainid: this.eventchainID})
                                .subscribe(data => {
                                    this.listaCadenasEventos = data;
                            });
                        }
                    }
                }
            },
            error => {
                this.alertService.error(error);
            });
    }

    public cambiarCadenaAsignacion() : void {
        console.log("this.f.itemEvenChain.value: " + this.f.itemEvenChain.value);
        console.log("this.assigneduserID" + this.assigneduserID);
        this.listasService.actualizarCadenaEvento({rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, 
            assigneduser: this.assigneduserID, eventchain: this.f.itemEvenChain.value, active: "S", requestcode: "null", cduser: "null",
            creationuser: this.dni, datecreation: "2020-04-21", updateuser: this.dni, dateupdate: "2020-04-21"})
                .subscribe(data => {
                    this.listaCadenasEventos = data;
            });
    }

    public onClickActivityPerformed(){
        this.alertService.clear();
        this.cambiarCadenaAsignacion();
        this.router.navigate(['']);
    }
}
