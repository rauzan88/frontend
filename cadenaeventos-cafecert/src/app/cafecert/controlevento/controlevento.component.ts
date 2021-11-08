
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ selector: 'app-controlevento', templateUrl: 'controlevento.component.html' })
export class ControleventoComponent implements OnInit {
    lista = [];
    sessionid: any;
    eventchain: any;
    codrequest: any;

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
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));
        
        console.log("desde control sesionid: " + this.sessionid);
        console.log("desde control evencahin: " + this.eventchain);
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
                            //console.log("desde control validaciones rol: " + data['role'] + " dni:" + data['dni']);
                            //tipo even log es de tipo traza de tipo validacion
                            this.listasService.validaciones({ codrequest : this.codrequest, eventChain: this.eventchain, typeEventLog: '1', frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: data[`role`], textuserdni: data[`dni`] })
                                .subscribe(data => {
                                    this.lista = data;
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                    this.router.navigate(['/cafecert/controlevento']);
                });
    }

    iraformulario(variable: any) {
        const { group,controlChain} = variable;
        localStorage.setItem("group", JSON.stringify(group));
        localStorage.setItem("controlChain", JSON.stringify(controlChain));
        
        //localStorage.setItem("evenchain", JSON.stringify(evenchain));
        this.router.navigate(['/cafecert/preguntacerrada']);
        //this.router.navigate(['/cafecert/archivospregunta']);
    }
}
