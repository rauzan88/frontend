
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ templateUrl: 'empresa.component.html' })
export class EmpresaComponent implements OnInit {
    lista = [];
    sessionid: any;
    
    constructor(
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.rutaActiva.queryParams.subscribe(params => {
            this.sessionid = params['param'];
            if (this.sessionid === null) {
                this.lista = JSON.parse('{}');
                this.alertService.error('No se ha podido validar la sesión.');
            } else {
                this.validarSesion();
            }
        });
    }

    onSubmit() {
        this.alertService.clear();
    }

    public validarSesion(): void {
        this.http.post<any>(`${process.env.USERBUSSINESS}`+`/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionid
        })
            .subscribe(data => {
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
                            this.listasService.obtenerEmpresas({rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
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

    public asignarSolicitud(requestID: any) : void {
        //window.open(`${process.env.LOGIN}`, '_self');
        //window.open(`${config.createrequest}` + "?param=" + this.sessionid, '_self');
        localStorage.setItem("requestID", requestID);
        localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
        this.router.navigate(['/cafecert/asignar']);
    }

    public crearSolicitud() : void {

    }
}
