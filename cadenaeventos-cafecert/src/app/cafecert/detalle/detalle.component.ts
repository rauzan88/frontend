
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ selector: 'app-detalle', templateUrl: 'detalle.component.html' })
export class DetalleComponent implements OnInit {
    sessionid: any;
    constructor(
        private router: Router,
        private alertService: AlertService,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
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
                            this.alertService.success("Ok, comencemos");
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }
    public regresarLista(): void {
        localStorage.setItem('msgfromprocesaevento',null)
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid }});
    }
}
