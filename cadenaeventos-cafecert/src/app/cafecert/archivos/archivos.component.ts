
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ selector: 'app-archivos', templateUrl: 'archivos.component.html' })
export class ArchivosComponent implements OnInit {
    lista = [];
    sessionid: any;
    eventchain: any;
    codrequest: any;
    cdRequest:any;
    urldownload : any;
    role: string;
    constructor(
        private router: Router,
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        this.eventchain = JSON.parse(localStorage.getItem('evenchain'));
        this.cdRequest = JSON.parse(localStorage.getItem('cdRequest'));
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));
        this.urldownload = `${process.env.FILECRUD}`+ "/cafecert/downloadfile/?path=";
        console.log("desde archivos sesionid: " + this.sessionid);
        console.log("desde archivos evencahin: " + this.eventchain);
        this.lista = [];

       
        if (this.sessionid === null) {
            this.lista =  [];
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
            "frontend": `${process.env.FRONTEND}}`,
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
                            this.role  = data['role'];
                            this.listasService.archivos({ codrequest : this.cdRequest, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: this.role, textuserdni: data[`dni`] })
                                .subscribe(data => {
                                    this.lista = data;
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                    this.router.navigate(['/cafecert/archivos']);
                });
    }

   

    public regresarLista(): void {
        localStorage.setItem('msgfromprocesaevento',null)
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid }});
    }
}
