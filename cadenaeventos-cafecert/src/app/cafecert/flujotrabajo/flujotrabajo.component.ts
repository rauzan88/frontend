
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'flujotrabajo.component.html' })
export class FlujotrabajoComponent implements OnInit {
    lista = [];
    sessionId: any;
    msgfromprocesaevento: any;
    rol: string;
    dni: string;
    isSearch: boolean = false;
    listRequestsForm: FormGroup;

    // public listRowSize: Array<number> = [5,10,20,50];
    public listRowSize: Array<number> = [10, 25, 50, 100];

    public itemsPerPage: number = this.listRowSize[0];
    public minRow: number = 0;
    public maxRow: number = this.itemsPerPage;
    public paginationList: Array<number> = [];
    public selectedPage: number = 0;
    public maxPage: number = 0;
    public tableHeight: number = 0;
    public minPageShow: number = 0;
    public pageLength: number = 8;
    public maxPageShow: number = this.pageLength;




    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }
    ngOnInit() {
        this.listRequestsForm = this.formBuilder.group({
            txtfiltro: ['', Validators.required],
            rdresfilto: ['', Validators.required]
        });


        //console.log(localStorage.getItem('msgfromprocesaevento'));
        if (localStorage.getItem('msgfromprocesaevento') != null) {
            this.alertService.success(localStorage.getItem('msgfromprocesaevento'));
        }

        this.rutaActiva.queryParams.subscribe(params => {
            this.sessionId = params['param'];
            if (this.sessionId === null) {
                this.lista = [];
                this.alertService.error('No se ha podido validar la sesion.');
            } else {

                //this.alertService.success("Esto es una prueba de alert");
                this.validarsesion();

            }
        });
    }

    onSubmit() {
        this.alertService.clear();
    }

    // convenience getter for easy access to form fields
    get f() { return this.listRequestsForm.controls; }

    public validarsesion(): void {
        //console.log("ha entrado a validar");
        this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionId
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
                            console.log("Hola");
                            this.dni = data['dni'];
                            this.rol = data['role'];
                            this.listasService.flujotrabajo({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionId, userrole: data['role'], userdni: data['dni'] })
                                .subscribe(data => {
                                    this.lista = data;
                                    console.log("Flujo trabajo:");
                                    console.log(data);
                                });
                        }
                    }
                }
            },
                error => {
                    //console.log("Estatus: " + error);
                    this.alertService.error(error);
                });
    }


    gestionarsolicitud(variable: any) {
        console.log('variable => ', variable);
        const { cdRequest, eventChain, typerequestid, typerequest, assigneduser, nameCurrentChain, nameNextChain, nextEventChain, dtCreation, codrequest, nit, empresa, representante, username, txCreationUser } = variable;

        localStorage.setItem("cdRequest", JSON.stringify(cdRequest));
        localStorage.setItem("codrequest", JSON.stringify(codrequest));
        localStorage.setItem("assigneduser", JSON.stringify(assigneduser));
        localStorage.setItem("nextEventChain", JSON.stringify(nextEventChain));
        localStorage.setItem("nameCurrentChain", JSON.stringify(nameCurrentChain));
        localStorage.setItem("nameNextChain", JSON.stringify(nameNextChain));
        localStorage.setItem("eventchain", JSON.stringify(eventChain));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionId));
        localStorage.setItem("typerequestid", JSON.stringify(typerequestid));
        localStorage.setItem("typerequest", JSON.stringify(typerequest));
        localStorage.setItem("empresa", JSON.stringify(empresa));
        localStorage.setItem("txCreationUser", JSON.stringify(txCreationUser));
        localStorage.setItem("dtCreation", JSON.stringify(dtCreation));
        //localStorage.setItem("requestcode", JSON.stringify(codrequest));
        localStorage.setItem("nit", JSON.stringify(nit));

        this.router.navigate(['/cafecert/confirmartarea']);

    }

    listararchivos(variable: any) {
        const { cdRequest, codrequest, eventChain, typerequestid, typerequest, assigneduser, linkchain, nextEventChain, dtCreation, requestcode, nit, empresa, representante, username, txCreationUser } = variable;


        localStorage.setItem("cdRequest", JSON.stringify(cdRequest));
        localStorage.setItem("codrequest", JSON.stringify(codrequest));
        localStorage.setItem("assigneduser", JSON.stringify(assigneduser));
        localStorage.setItem("nextEventChain", JSON.stringify(nextEventChain));
        localStorage.setItem("linkchain", JSON.stringify(linkchain));
        localStorage.setItem("eventchain", JSON.stringify(eventChain));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionId));
        localStorage.setItem("typerequestid", JSON.stringify(typerequestid));
        localStorage.setItem("typerequest", JSON.stringify(typerequest));
        localStorage.setItem("empresa", JSON.stringify(empresa));
        localStorage.setItem("txCreationUser", JSON.stringify(txCreationUser));
        localStorage.setItem("dtCreation", JSON.stringify(dtCreation));
        localStorage.setItem("requestcode", JSON.stringify(requestcode));

        this.router.navigate(['/cafecert/archivos']);

    }

    gestionarplantilla(variable: any) {
        const { cdRequest, codrequest, eventChain, typerequestid, typerequest, assigneduser, linkchain, nextEventChain, dtCreation, requestcode, nit, empresa, representante, username, txCreationUser } = variable;

        //console.log("desde flujo codrequest: " + codrequest);
        //console.log("desde flujo eventChain: " + JSON.stringify(eventChain));
        //console.log("desde flujo nextEventChain: " + JSON.stringify(nextEventChain));

        localStorage.setItem("cdRequest", JSON.stringify(cdRequest));
        localStorage.setItem("codrequest", JSON.stringify(codrequest));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionId));

        this.router.navigate(['/cafecert/plantilla']);

    }

    public asignarSolicitud(variable: any): void {
        const { creationrequest, cdRequest, codrequest, eventChain, typerequestid, typerequest, assigneduser, linkchain, nextEventChain, dtCreation, requestcode, nit, empresa, representante, username, txCreationUser } = variable;

        localStorage.setItem("cdRequest", JSON.stringify(cdRequest));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionId));
        localStorage.setItem("codrequest", JSON.stringify(codrequest));
        localStorage.setItem("creationrequest", JSON.stringify(creationrequest));
        localStorage.setItem("assigneduser", JSON.stringify(assigneduser));
        localStorage.setItem("eventchain", JSON.stringify(eventChain));
        this.router.navigate(['/cafecert/asignar']);
    }

    public nuevaEvaluacion(variable: any): void {
        const { cdRequest, codrequest, eventChain, typerequestid, typerequest, assigneduser, linkchain, nextEventChain, dtCreation, requestcode, nit, empresa, representante, username, txCreationUser } = variable;

        localStorage.setItem("cdRequest", JSON.stringify(cdRequest));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionId));
        localStorage.setItem("codrequest", JSON.stringify(codrequest));
        localStorage.setItem("typerequest", JSON.stringify(typerequest));
        localStorage.setItem("empresa", JSON.stringify(empresa));

        //console.log("requestcode en lista: "+ requestcode);
        this.router.navigate(['/cafecert/nuevaevaluacion']);
    }

    validaBoton(variable: any) {
        let { nuIdUser } = variable;
        //if(this.dni == txCreationUser && this.rol == "AnalistaCertificacion_SICERT")
        //console.log("rol: " + this.rol);
        //console.log("nuIdUser: " + nuIdUser);
        //console.log("this.dni: " + this.dni);
        if (this.dni === nuIdUser && (this.rol === "AnalistaCertificacion_SICERT" || this.rol === "AnalistaProgramacion_SICERT"))

            return "inline";
        else
            return "none";
    }

    public onSearch(): void {
        this.lista = [];
        //this.alertService.type = this.f.rdresfilto.value;
        //this.alertService.value = this.f.txtfiltro.value;
        // this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid, type: this.f.rdresfilto.value, value:this.f.txtfiltro.value }});
        let textoFiltro: string;
        // Aquí se realiza la búsqueda de solicitudes por el filtro seleccionado.

        console.log("this.f.txtfiltro.value:" + this.f.txtfiltro.value);
        textoFiltro = this.f.txtfiltro.value.trim();
        this.alertService.clear();

        if (textoFiltro.toString().trim() === "") {
            let tipoFiltro: string = this.f.rdresfilto.value.toString();
            if (tipoFiltro === "3") {
                // Se hace la búsqueda por usuario.
                this.listasService.flujotrabajo({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionId, userrole: this.rol, userdni: this.dni })
                    .subscribe(data => {
                        this.lista = data;
                    });
            } else {
                console.log("NO se digitó nada.");
                this.alertService.error("Debe digitar el filtro para buscar.");
            }

        } else if (this.f.rdresfilto.value.toString().trim() === "") {
            console.log("NO se seleccionó nada.");

            this.alertService.error("Debe seleccionar el tipo de filtro para buscar.");
        } else {
            console.log("SI se digitó algo:" + textoFiltro);

            this.cargarConsultaFiltro(textoFiltro);
        }
    }

    cargarConsultaFiltro(textoFiltro: string): void {
        let tipoFiltro: string = this.f.rdresfilto.value.toString();
        this.isSearch = false;
        console.log("this.f.rdresfilto.value: " + this.f.rdresfilto.value);
        if (tipoFiltro === "1") {
            // Se hace la búsqueda por NIT.
            this.listasService.flujotrabajonit({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionId, userrole: this.rol, userdni: this.dni, nit: this.f.txtfiltro.value })
                .subscribe(data => {
                    this.isSearch = true;
                    this.lista = data;
                });
        } else if (tipoFiltro === "2") {
            // Se hace la búsqueda por Código de Solicitud.
            this.listasService.flujocoderequest({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionId, userrole: this.rol, userdni: this.dni, coderequest: this.f.txtfiltro.value })
                .subscribe(data => {
                    this.isSearch = true;
                    this.lista = data;
                });
        } else if (tipoFiltro === "3") {
            // Se hace la búsqueda por usuario.
            this.listasService.flujotrabajo({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionId, userrole: this.rol, userdni: this.dni })
                .subscribe(data => {
                    this.lista = data;
                });
        } else {
            // No hay ningún filtro seleccionado.
            console.log("No hay ningún filtro seleccionado.");
        }
    }

}
