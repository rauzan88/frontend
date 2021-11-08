
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({ templateUrl: 'asignar.component.html' })
export class AsignarComponent implements OnInit {
    homeForm: FormGroup;
    loading = false;
    submitted = false;
    role: any;
    dni: any;
    sessionid: any;
    requestID: any;
    lista = [];
    listaUsuarios: any;
    listaTipos: any;

    public request: any;
    public requestForm: FormGroup;

    
    constructor(
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.validarSesion();

        //this.listaUsuarios = JSON.parse('[{"id":1,"name":"Cundinamarca"},{"id":4,"name":"Antioquia"},{"id":2,"name":"Atlantico"},{"id":5,"name":"Magdalena"}]') || [];
        //this.listaTipos = JSON.parse('[{"id":1,"name":"Inicial"},{"id":4,"name":"Mantenimiento"},{"id":2,"name":"Ampliación"}]') || [];
    }

    ngOnInit() {
        this.homeForm = this.formBuilder.group({
            listaUsuariosDesplegable: ['', Validators.required],
            listaTiposDesplegable: ['', Validators.nullValidator],
            actividades01: []
        });

        this.requestForm = this.formBuilder.group({
            user: ['', Validators.required]
        });
    }

    onSubmit() {
        //console.log(this.f.listaUsuariosDesplegable);
        this.alertService.clear();
    }

    get f() { return this.homeForm.controls; }

    public validarSesion(): void {
        this.sessionid = JSON.parse(localStorage.getItem("sessionid"));
        this.requestID = JSON.parse(localStorage.getItem("requestID"));
        this.request = JSON.parse(localStorage.getItem("request"));

        console.log("ID de la sesión en el método validarSesion(): " + this.sessionid);

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
                    // this.lista = JSON.parse('{}');
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                        // this.lista = JSON.parse('{}');
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                            // this.lista = JSON.parse('{}');
                        } else {
                            this.listasService.consultarTodosUsuarios({rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
                                .subscribe(data => {
                                    console.log(data);
                                    this.listaUsuarios = data;
                            });

                            this.listasService.consultarTiposSolicitudes({rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
                                .subscribe(data => {
                                    this.listaTipos = data;
                            });
                        }
                    }
                }
            },
            error => {
                this.alertService.error(error);
            });
    }


    public asignarSolicitud() : void {
        //window.open(`${process.env.LOGIN}`, '_self');
        //window.open(`${config.createrequest}` + "?param=" + this.sessionid, '_self');

        // Aquí se debe consumir la capacidad que obtenga el CdEventChain a través del tipo de solicitud seleccionada.
        let requestDTO = {
            txRole: this.role, 
            sessionid: this.sessionid, 
            frontend: `${process.env.FRONTEND}`, 
            next: `${process.env.NEXT}`, 
            cdEventChain: 1, 
            active: "S", 
            txCreationUser: this.dni, 
            requestCode: this.request.cdRequest, 
            cdUser: this.requestForm.value.user 
        };

        this.listasService.asignarSolicitudUsuario(requestDTO)
            .subscribe(data => {
                //console.log(data);
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                } else {
                    this.alertService.success(data['message']);
                }
        });
    }

    public onClickActivityPerformed(){
        this.alertService.clear();
        this.asignarSolicitud();
        this.router.navigate(['']);
    }

    public goBackRequestList() {
        // this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid, type: '2', value:'123456' }});
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }
}
