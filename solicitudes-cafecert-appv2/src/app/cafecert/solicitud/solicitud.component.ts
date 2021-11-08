
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'solicitud.component.html' })
export class SolicitudComponent implements OnInit {
    listRequestsForm: FormGroup;
    lista = [];
    sessionid: any;
    rol: string;
    dni: string;
    isSearch: boolean = false;
    activeFile = true; 

    constructor(
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.listRequestsForm = this.formBuilder.group({
            txtfiltro: ['', Validators.required],
            rdresfilto: ['', Validators.required]
        });

        this.rutaActiva.queryParams.subscribe(params => {
            this.sessionid = params['param'];
            if (this.sessionid === null) {
                this.lista = JSON.parse('{}');
                this.alertService.error('No se ha podido validar la sesion.');
            } else {
                this.validarSesion();
            }

            let type = this.alertService.type;
            if (type != null && type != '') {
                this.f.rdresfilto.setValue(type);
            }

            let value = this.alertService.value;
            if (value != null && value != '') {
                this.f.txtfiltro.setValue(value);
            }

            if (type != null && type != '' && value != null && value != '') {
                this.onSearch();
            }
        });
    }

    get f() { return this.listRequestsForm.controls; }

    mostrarMensajeConfirmacionRegistroSolicitud(): void {
        // const CONSECUTIVE_KEY: string = "consecutivoconfirm";
        // let consecutivoCreacionSolicitud: string = "";

        // //console.log("localStorage.getItem(consecutivoconfirm): " + localStorage.getItem(CONSECUTIVE_KEY));
        // consecutivoCreacionSolicitud = JSON.parse(localStorage.getItem(CONSECUTIVE_KEY));

        // if (consecutivoCreacionSolicitud != null) {
        //     //console.log("consecutivoCreacionSolicitud: " + consecutivoCreacionSolicitud);
        //     this.alertService.clear();
        //     this.alertService.success("Se confirma la creación de la nueva Solicitud con el consecutivo: " + consecutivoCreacionSolicitud);

        //     // Se limpia el valor de session.
        //     localStorage.setItem(CONSECUTIVE_KEY, "");
        // }
    }

    onSubmit() {
        this.alertService.clear();
    }

    public validarSesion(): void {
        this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionid
        })
            .subscribe(data => {
                console.log(data);
                this.dni = data['dni'];
                this.rol = data['role'];
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
                            //this.consultarTodasSolicitudes(data['role']);

                            // Validar si llegó un consecutivo con creación de Solicitud en el formulario de registro.
                            this.mostrarMensajeConfirmacionRegistroSolicitud();
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                    console.log("error: " + error);
                });
    }

    consultarTodasSolicitudes(rol: string): void {
        this.listasService.obtenerSolicitudes({ rol: rol, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                this.lista = data;
                console.log(data);
            });
    }

    public asignarSolicitud(request: any): void {
        // localStorage.setItem("requestID", requestID);
        localStorage.setItem("request", JSON.stringify(request));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
        this.router.navigate(['/cafecert/asignar']);
    }

    public modificarSolicitud(request: any): void {
        //Se modifica para permitir que usuario que usuario pueda modificar, aunque no haya creado la solicitud
        // public modificarSolicitud(ev, request: any): void {
        // if (this.dni == request.txCreationUser) {
        //     //console.log("request.cdcdRequest: " + request.cdRequest);
        //     localStorage.setItem("request", JSON.stringify(request));
        //     localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
        //     this.router.navigate(['/cafecert/editarsolicitud']);
        // }
        // else {
        //     ev.preventDefault();
        // }
       
            //console.log("request.cdcdRequest: " + request.cdRequest);
            localStorage.setItem("request", JSON.stringify(request));
            localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
            this.router.navigate(['/cafecert/editarsolicitud']);
    
    }

    public verSolicitud(request: any): void {
        //console.log("request.cdcdRequest: " + request.cdRequest);
        localStorage.setItem("request", JSON.stringify(request));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
        this.router.navigate(['/cafecert/consulta']);
    }

    public crearSolicitud(): void {
        localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
        localStorage.setItem("txClientName", JSON.stringify("Buscar cliente"));
        this.router.navigate(['/cafecert/crearsolicitud']);
    }

    public nuevaEvaluacion(ev, request: any): void {
        localStorage.setItem("request", JSON.stringify(request));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
        this.router.navigate(['/cafecert/nuevaevaluacion']);
    }

    public onSearch(): void {
        this.lista = [];
        this.alertService.type = this.f.rdresfilto.value;
        this.alertService.value = this.f.txtfiltro.value;
        // this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid, type: this.f.rdresfilto.value, value:this.f.txtfiltro.value }});
        let textoFiltro: string;
        // Aquí se realiza la búsqueda de solicitudes por el filtro seleccionado.

        console.log("this.f.txtfiltro.value:" + this.f.txtfiltro.value);
        textoFiltro = this.f.txtfiltro.value.trim();
        this.alertService.clear();

        if (textoFiltro.toString().trim() === "") {
            console.log("NO se digitó nada.");

            this.alertService.error("Debe digitar el filtro para buscar.");
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
            this.listasService.obtenerSolicitudesPorNit({ rol: this.rol, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, txNit: textoFiltro })
                .subscribe(data => {
                    this.isSearch = true;
                    this.lista = data;
                    console.log(data);
                });
        } else if (tipoFiltro === "2") {
            // Se hace la búsqueda por Código de Cliente.
            this.listasService.obtenerSolicitudesPorCodCliente({ rol: this.rol, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, txCodClient: textoFiltro })
                .subscribe(data => {
                    this.isSearch = true;
                    this.lista = data;
                });
        } else if (tipoFiltro === "3") {
            // Se hace la búsqueda por Código de Cliente.
            this.listasService.obtenerSolicitudesPorCodSolicitud({ rol: this.rol, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, txCodRequest: textoFiltro })
                .subscribe(data => {
                    this.isSearch = true;
                    this.lista = data;
                });
                
        } else {
            // No hay ningún filtro seleccionado.
            console.log("No hay ningún filtro seleccionado.");
        }
    }

    listarArchivos(codrequest: any) {
        //const { codrequest, eventChain, typerequestid, typerequest, assigneduser, linkchain, nextEventChain, dtCreation, requestcode, nit, empresa, representante, username, txCreationUser } = variable;

        localStorage.setItem("codrequest", JSON.stringify(codrequest));
        //localStorage.setItem("assigneduser", JSON.stringify(assigneduser));
        //localStorage.setItem("nextEventChain", JSON.stringify(nextEventChain));
        //localStorage.setItem("linkchain", JSON.stringify(linkchain));
        //localStorage.setItem("eventchain", JSON.stringify(eventChain));
        localStorage.setItem("sessionid", JSON.stringify(this.sessionid));
        //localStorage.setItem("typerequestid", JSON.stringify(typerequestid));
        //localStorage.setItem("typerequest", JSON.stringify(typerequest));
        //localStorage.setItem("empresa", JSON.stringify(empresa));
        //localStorage.setItem("txCreationUser", JSON.stringify(txCreationUser));
        //localStorage.setItem("dtCreation", JSON.stringify(dtCreation));
        //localStorage.setItem("requestcode", JSON.stringify(requestcode));

        this.router.navigate(['/cafecert/archivos']);

    }

    //Funcion que permite ver la opcion "Nueva Evaluación".
    //validaBoton(txCreationUser: any){
    validaBoton(){
        //if(this.dni == txCreationUser && this.rol == "AnalistaCertificacion_SICERT")
        if(this.rol == "GerenteGeneral_SICERT")
            return "inline";
        else
            return "none"; 
    }
}
