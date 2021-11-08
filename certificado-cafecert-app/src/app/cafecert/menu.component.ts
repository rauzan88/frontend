import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@/_services';
import { ListasService } from '@/_services';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({ selector: 'app-menu-x', templateUrl: 'menu.component.html' })
export class MenuComponent implements OnInit {

    menu = [];
    mostrarboton = false;
    role: any;
    sessionid: any;
    
    constructor(
        private router: Router,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient,
        private alertService: AlertService,
        private listasService: ListasService

    ) {
       
    }


    ngOnInit() {
        this.rutaActiva.queryParams.subscribe(params => {
            this.sessionid = params['param'];
            if (this.sessionid === null) {
                this.mostrarboton = false;
                this.menu = JSON.parse('[{"menuid":"0","item":"No existe sesión id , el menú principal ha sido remplazado por este enlase, usted debe hacer click para volver a la pagina login","url":' + '"' + `${process.env.LOGIN}` + '"' + '}]');
            } else {
                this.validarsesion(this.sessionid);
            }
        });
    }

    logout() {
        this.http.post<any>(`${process.env.USERBUSSINESS}`+`/cafecert/cerrarsesion/`, {
            "frontend": `${process.env.FRONTEND}`,
            "logoutreason": "2",
            "next": `${process.env.LOGIN}`,
            "txlogoutreason": "Sesion cerrada por el usuario",
            "sessionid": this.sessionid
        })
            .pipe(catchError(err => {
                if (err.status === 401 || err.status === 500 || err.status === 501) {
                    // auto logout if 401 response returned from api
                    this.alertService.error('Error numero' + err.status + ' consumiendo servicio, por favor comunicarse con el administrador de la aplicación web.');
                    location.reload(true);
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            }))
            .subscribe(data => {
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                    this.router.navigate([`${process.env.FRONTEND}`]);
                } else {
                    window.open(`${process.env.LOGIN}`, '_self');
                }
            },
                error => {
                    this.alertService.error(error);
                }
            );
    }


    public validarsesion(sessionid:string): void {
        this.http.post<any>(`${process.env.USERBUSSINESS}`+`/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionid
        })
            .subscribe(data => {
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                    this.router.navigate([`${process.env.FRONTEND}`]);
                    this.menu = JSON.parse('[{"menuid":"0","item":"Ocurrió un error, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + `${process.env.LOGIN}` + '"' + '}]');
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                        this.menu = JSON.parse('[{"menuid":"0","item":"Sesión ha expirado, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + `${process.env.LOGIN}`+ '"' + '}]');
                    } else {
                        if (data['role'] === null) {
                            this.mostrarboton = false;
                            this.menu = JSON.parse('[{"menuid":"0","item":"No existe rol de usuario registrado en el sistema, el menú principal ha sido remplazado por este enlase, usted debe hacer click para volver a la pagina login","url":' + '"' + `${process.env.LOGIN}` + '"' + '}]');
                        } else {
                            this.mostrarboton = true;
                           // this.sessionid = sessionid;
                            this.listasService.menuByRole({ rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.FRONTEND}` })
                                .subscribe(data => {
                                    if (data['status'] === `Internal Server Error`){
                                        this.menu = JSON.parse('[{"menuid":"0","item":"Ocurrio un error consultando el menu de la base de datos, el menú principal ha sido remplazado por este enlase, usted debe hacer click para volver a la pagina login","url":' + '"' + `${process.env.LOGIN}` + '"' + '}]'); 
                                        this.alertService.error(data['message']);
                                    }else{
                                        this.menu = data;
                                    }
                                });
                        }
                    }
                }
            });
    }


    chooseMenu(url: string) {
          window.open(url + "?param="+this.sessionid, '_self');
    }

    onSubmit() {
    }


}
