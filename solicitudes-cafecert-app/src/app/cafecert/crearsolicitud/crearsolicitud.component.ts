﻿import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({ templateUrl: 'crearsolicitud.component.html' })
export class CrearSolicitudComponent implements OnInit {
    createRequestForm: FormGroup;
    loading = false;
    submitted = false;
    role: any;
    dni: any;
    sessionid: any;
    //listaPlantas = [];
    listaPaises: any = [];
    listaTiposCertificaciones: any;
    listaProgramas: any;
    listaProgramasDOR: Array<any> = [];
    listaActividadesIndustriales: any;
    listaActividadesIndustrialesCliente: Array<{ cdClientActivity: string, cdClient: string, cdIndustrialActivity: string }> = [];
    listaPaisesCliente: any = [];
    seletedClientCountry: { cdCountry: string, txNameCountry: string };
    listaDepartamentos: Array<any> = [];
    seletedClientState: { cdState: string, txNameState: string, cdCountry: string };
    listaCiudades: any = [];
    seletedCity: { cdCity: string, txNameCity: string, cdState: string };
    listaRespuestaMismo: any;
    listaRespuestaMismaDir: Array<{ id: string, text: string, check: boolean }> = [];
    listaTiposCafe: any;
    listaMarcas: Array<{ txName: string, txReference: string, cdCoffeeType: string, txDescription: string }> = [];
    isCertificationCodeVisible: boolean;
    showMessageConfirm: boolean;
    objSolicitud: any;
    objAsignacion: any;
    objCliente: any;
    objContacto: any;
    objRepresentante: any;
    objMarca: any;
    isClientVisible: boolean;
    isProgramaDor: boolean;
    existeCliente: boolean;
    existeNit: boolean = false;
    existeContacto: boolean;
    existeRepresentante: boolean;
    direccionesIguales: boolean;
    mismoContacto: boolean;
    textoBotonBuscar: string;
    consecutivo: string;
    mostrarMsgValidacion: boolean;
    mostrarMsgValidacionMarcas: boolean;
    contAISeleccionadas: number;
    fileToUpload1: FileList = null;
    fileToUpload2: FileList = null;
    fileToUpload3: FileList = null;
    fileToUpload4: FileList = null;
    fileToUpload5: FileList = null;
    fileToUpload6: FileList = null;
    fileToUpload7: FileList = null;
    fileToUpload8: FileList = null;
    openPanel: boolean = true;

    constructor(
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.isCertificationCodeVisible = false;
        this.isClientVisible = false;
        this.direccionesIguales = false;
        this.mismoContacto = false;
        this.isProgramaDor = false;

        //this.createRequestForm = formBuilder.group({});

        this.seletedClientCountry = { cdCountry: "", txNameCountry: "" };
        this.seletedClientState = { cdState: "", txNameState: "", cdCountry: "" };
        this.seletedCity = { cdCity: "", txNameCity: "", cdState: "" };

        this.validarSesion();
    }

    ngOnInit() {
        this.createRequestForm = this.formBuilder.group({
            itemPaises: ['', Validators.required],
            codigocertificado: ['', Validators.nullValidator],
            rbtipocertificacion: ['', Validators.required],
            fechasolicitud: ['', Validators.required],
            rbtipoprograma: ['', Validators.required],
            /*programado: ['', Validators.nullValidator],
            programaigp: ['', Validators.nullValidator],*/
            programador: ['', Validators.nullValidator],
            nitcliente: ['', Validators.required],
            nombreempresa: ['', Validators.required],
            cbactividadindustrial: ['', Validators.required],
            paises: ['', Validators.required],
            departamentos: ['', Validators.required],
            ciudades: ['', Validators.required],
            direccionempresa: ['', Validators.required],
            direccioncorrespondencia: ['', Validators.required],
            prefijo: [{ value: '', disabled: true }, Validators.nullValidator],
            indicativo: [{ value: '', disabled: true }, Validators.nullValidator],
            numerofijo: ['', Validators.required],
            celular: ['', Validators.required],
            email: ['', Validators.required],
            emailnotificacionjudicial: ['', Validators.required],
            website: ['', Validators.nullValidator],
            preguntadireccion: ['', Validators.nullValidator],
            nombrescontacto: ['', Validators.nullValidator],
            apellidoscontacto: ['', Validators.nullValidator],
            direccioncontacto: ['', Validators.nullValidator],
            cargocontacto: ['', Validators.nullValidator],
            emailcorpcontacto: ['', Validators.nullValidator],
            telefonocontacto: ['', Validators.nullValidator],
            nombresrepresentante: [{ value: '', disabled: false }, Validators.nullValidator],
            apellidosrepresentante: [{ value: '', disabled: false }, Validators.nullValidator],
            direccionrepresentante: [{ value: '', disabled: false }, Validators.nullValidator],
            emailcorprepresentante: [{ value: '', disabled: false }, Validators.nullValidator],
            telefonorepresentante: [{ value: '', disabled: false }, Validators.nullValidator],
            tiposcafe: ['', Validators.nullValidator],
            referencia: ['', Validators.nullValidator],
            nombremarca: ['', Validators.nullValidator],
            //btnadicionar: ['', Validators.nullValidator],
            adjuntarcorreo: ['', Validators.required],
            adjuntarsol: ['', Validators.required],
            adjuntarcamara: ['', Validators.required],
            preguntamismocontacto: ['', Validators.nullValidator],
            numfactura: ['', Validators.nullValidator],
            fechafactura: ['', Validators.nullValidator],
            fechaenviocorreo: ['', Validators.nullValidator],
            fechafirmacuerdo: ['', Validators.nullValidator],
            fechacartacompromiso: ['', Validators.nullValidator],
            regtrilladora: [{ value: '', disabled: true }, Validators.nullValidator],
            regtostadora: [{ value: '', disabled: true }, Validators.nullValidator],
            regsolubilizador: [{ value: '', disabled: true }, Validators.nullValidator],
            regprodextracto: [{ value: '', disabled: true }, Validators.nullValidator],
            //sesioncontrolesrepresentante: ['', Validators.nullValidator],
            actividades01: []
        });
        // this.createRequestForm.controls['nombresrepresentante'].enable();
        // this.createRequestForm.controls['apellidosrepresentante'].enable();
        // this.createRequestForm.controls['direccionrepresentante'].enable();
        // this.createRequestForm.controls['emailcorprepresentante'].enable();
        // this.createRequestForm.controls['telefonorepresentante'].enable();
        this.isProgramaDor = false;
        this.existeNit = false;
        this.listaMarcas = [];
    }

    get f() { return this.createRequestForm.controls; }

    public validarSesion(): void {
        //console.log("ID de la sesión: " + localStorage.getItem("sessionid"));
        this.sessionid = JSON.parse(localStorage.getItem("sessionid"));

        //console.log("ID de la sesión en el método validarSesion(): " + this.sessionid);

        this.textoBotonBuscar = "Buscar";

        this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/findsession/`, {
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionid
        })
            .subscribe(data => {
                this.role = data['role'];
                this.dni = data['dni'];

                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                    //this.lista = JSON.parse('{}');
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                        //this.lista = JSON.parse('{}');
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                            //this.lista = JSON.parse('{}');
                        } else {
                            this.listasService.consultarTiposCertificaciones({ rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
                                .subscribe(data => {
                                    this.listaTiposCertificaciones = data;
                                });

                            this.listasService.consultarTodosPaises({ rol: data['role'], sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
                                .subscribe(data => {
                                    this.listaPaises = data;
                                });

                            //console.log("Antes de ejecutar la carga de controles de Marcas.");
                            this.inicialiarControlesMarcas();
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });

        this.cargarPorDefectoListas();
    }

    cargarPorDefectoListas(): void {
        this.listaRespuestaMismo = [];
        this.listaRespuestaMismo.push({ id: "1", text: "Si", check: false });
        this.listaRespuestaMismo.push({ id: "2", text: "No", check: true });

        this.listaRespuestaMismaDir = [];
        this.listaRespuestaMismaDir.push({ id: "1", text: "Si", check: false });
        this.listaRespuestaMismaDir.push({ id: "2", text: "No", check: true });

        // Cargar valores de Programa de Certificación.
        this.listaProgramas = [{ "id": "1", "text": "DO Denominación de Origen Café de Colombia" }, { "id": "2", "text": "IGP Indicación Geográfica Protegida Café" }, { "id": "3", "text": "DOR Denominación de Origen Café Regional" }] || [];

        // this.listaProgramasDOR = [
        //     { id: "1", text: "Café de Cauca", check: false },
        //     { id: "2", text: "Café de Huila", check: false },
        //     { id: "3", text: "Café de Santander", check: false },
        //     { id: "4", text: "Café de Nariño", check: false },
        //     { id: "5", text: "Café de la Sierra Nevada", check: false },
        //     { id: "6", text: "Café de Tolima", check: false }
        // ];

        this.listasService.consultarTodasRegiones({}).subscribe(
            (data) => {
                this.listaProgramasDOR = data;
            }, (error) => {

            }
        );
    }

    public onClickCreatePerformed() {
        this.alertService.clear();
        if (this.isFormValid()) {
            if (!this.existeCliente) {
                //console.log("El cliente no existe.");
                this.crearCliente();
            } else {
                // Se llama la creación de la Solicitud.
                this.actualizarCliente();
            }
        }
    }

    public isFormValid(): boolean {
        if (this.f.itemPaises.value == '' || this.f.rbtipocertificacion.value == '' ||
            this.f.fechasolicitud.value == '' ||
            //this.f.rbtipoprograma.value == '' ||
            this.f.nitcliente.value == '' || this.f.nombreempresa.value == '' ||
            this.f.paises.value == '' || this.f.departamentos.value == '' ||
            this.f.ciudades.value == '' || this.f.direccionempresa.value == '' ||
            this.f.direccioncorrespondencia.value == '' || //this.f.numerofijo.value == '' ||
            this.f.celular.value == '' || this.f.email.value == '' ||
            this.f.emailnotificacionjudicial.value == '' || this.f.nombrescontacto.value == '' ||
            this.f.apellidoscontacto.value == '' || this.f.direccioncontacto.value == '' ||
            this.f.cargocontacto.value == '' || this.f.emailcorpcontacto.value == '' ||
            this.f.telefonocontacto.value == '' || this.f.nombresrepresentante.value == '' ||
            this.f.apellidosrepresentante.value == '' || this.f.direccionrepresentante.value == '' ||
            this.f.emailcorprepresentante.value == '' || this.f.telefonorepresentante.value == '' ||
            this.f.adjuntarcorreo.value == '' || this.f.adjuntarsol.value == '' ||
            this.f.adjuntarcamara.value == '' ||
            (this.validateIndustrialActivity()) ||
            (this.isCertificationCodeVisible && this.f.codigocertificado.value == '') ||
            (this.validateProgramType()) ||
            (this.isProgramaDor && this.validateProgramDor())) {
            return false;
        }
        return true;
    }

    public validateProgramType() {
        return this.listaProgramas.filter(element => element.check).length == 0;
    }

    public validateProgramDor() {
        return this.listaProgramasDOR.filter(element => element.check).length == 0;
    }

    public validateIndustrialActivity() {
        try {
            return this.listaActividadesIndustriales.filter(element => element.check).length == 0;
        } catch (error) {
            return true;
        }
    }

    public crearSolicitud(): void {
        let programaDO: any = "N";
        let programaIGP: any = "N";
        let programaDOR: any = "N";
        // let programaCertificacion: string;

        this.listaProgramas.forEach(programa => {
            if (programa.check) {
                switch (programa.id) {
                    case "1":
                        programaDO = "S";
                        break;
                    case "2":
                        programaIGP = "S";
                        break;
                    case "3":
                        programaDOR = "S";
                        break;
                }
            }
        });

        // if (this.f.rbtipoprograma.value.toString() === "1") {
        //     programaDO = "S";
        //     // programaCertificacion = "DO";
        // }
        // console.log("Programa DO: " + programaDO);
        // if (this.f.rbtipoprograma.value.toString() === "2") {
        //     programaIGP = "S";
        //     // programaCertificacion = "IGP";
        // }
        // console.log("Programa IGP: " + programaIGP);
        // if (this.f.rbtipoprograma.value.toString() === "3") {
        //     programaDOR = "S";
        //     // programaCertificacion = "DOR";
        // }
        // console.log("Programa DOR: " + programaDOR);

        // Aquí se debe consumir la capacidad que crear una nueva solicitud de certificación.

        if (this.f.fechafactura.value === "") this.f.fechafactura.setValue(null);
        if (this.f.fechaenviocorreo.value === "") this.f.fechaenviocorreo.setValue(null);
        if (this.f.fechafirmacuerdo.value === "") this.f.fechafirmacuerdo.setValue(null);
        if (this.f.fechacartacompromiso.value === "") this.f.fechacartacompromiso.setValue(null);

        /* 
         console.log(JSON.stringify({
             rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
             sanitaryStd: "S", identifyPrc: "S", declare: "S",
             certificationType: this.f.rbtipocertificacion.value, cdClient: this.objCliente.cdClient, cdCountry: this.f.itemPaises.value,
             creationuser: this.dni, requestdate: this.f.fechasolicitud.value,
             txDo: programaDO, txIgp: programaIGP, txDor: programaDOR, codCertificate: this.f.codigocertificado.value, codClient: this.objCliente.txCodClient, cdStateRequest: 1,
             nuinvoice: this.f.numfactura.value,dtinvoice: this.f.fechafactura.value,dtemailin: this.f.fechaenviocorreo.value, dtsignagree: this.f.fechafirmacuerdo.value,
             dtcommitatter: this.f.fechacartacompromiso.value, nuregthresher: this.f.regtrilladora.value, nuregtoaster: this.f.regtostadora.value,
             nuregsolubilizer: this.f.regsolubilizador.value, nuregextract: this.f.regprodextracto.value
         }));
         */



        this.listasService.crearSolicitud({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            sanitaryStd: "S", identifyPrc: "S", declare: "S",
            certificationType: this.f.rbtipocertificacion.value, cdClient: this.objCliente.cdClient, cdCountry: this.f.itemPaises.value,
            creationuser: this.dni, requestdate: this.f.fechasolicitud.value,
            txDo: programaDO, txIgp: programaIGP, txDor: programaDOR, codCertificate: this.f.codigocertificado.value, codClient: this.objCliente.txCodClient, cdStateRequest: 1,
            nuinvoice: this.f.numfactura.value, dtinvoice: this.f.fechafactura.value, dtemailin: this.f.fechaenviocorreo.value, dtsignagree: this.f.fechafirmacuerdo.value,
            dtcommitatter: this.f.fechacartacompromiso.value, nuregthresher: this.f.regtrilladora.value, nuregtoaster: this.f.regtostadora.value,
            nuregsolubilizer: this.f.regsolubilizador.value, nuregextract: this.f.regprodextracto.value
        })
            .subscribe(data => {
                this.objSolicitud = data;
                // Se llama la creación de la Asignación a Usuario por defecto(el mismo que la está creando).
                this.crearAsignacion();
                // Se llama la creación de las Marcas.
                this.crearMarcas();
                // Se llama la creación de los Soportes.
                this.crearSoportes();
                // Crea 
                if (this.isProgramaDor) {
                    this.createRequestRegion();
                }
                // Enviar mensaje de confirmación del registro.
                this.mostrarMensajeConfirmacion();
            });
    }

    private convertDate(date: Date): string {
        let dp = new DatePipe("en-US");
        let format = 'yyyy-MM-dd'; // YYYY-MM-DD
        let dtr = dp.transform(date, format);
        return dtr;
    }

    private createRequestRegion() {
        this.listaProgramasDOR.forEach(programaDor => {
            if (programaDor.check) {
                let request = {
                    "cdRequest": this.objSolicitud.cdRequest,
                    "cdRegion": programaDor.cdRegion
                };
                this.listasService.crearSolicitudRegion(request).subscribe();
            }
        });
    }

    mostrarMensajeConfirmacion(): void {
        this.consecutivo = this.objSolicitud.txCodRequest;
        let data = { message: 'Registro Exitoso', content: 'Se ha registrado la solicitud ' + this.consecutivo, result: '' };
        let dialogRef = this.alertService.openDialog(data);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
                this.openPanel = true;
                this.isClientVisible = false;
                this.fileToUpload1 = null;
                this.fileToUpload2 = null;
                this.fileToUpload3 = null;
                this.fileToUpload4 = null;
                this.fileToUpload5 = null;
                this.fileToUpload6 = null;
                this.fileToUpload7 = null;
                this.fileToUpload8 = null;
                this.validarSesion();
                window.scrollTo(0, 0);
            }
        });
    }

    crearAsignacion(): void {
        // Se llama a la capacidad que Asigna la Solicitud.
        this.listasService.asignarSolicitudPorDefecto({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            eventchain: 1, active: "S", requestcode: this.objSolicitud.cdRequest, creationuser: this.dni
        })
            .subscribe(data => {
                this.objAsignacion = data;
            });
    }

    crearCliente(): void {
        let phoneNumber: any;
        let dirCorres: any;

        // phoneNumber = this.f.prefijo.value + this.f.indicativo.value + this.f.numerofijo.value;
        phoneNumber = this.f.numerofijo.value;

        // Se llama la capacidad que crea un cliente.
        //console.log("Entrar en el que crear el nuevo cliente.");
        console.log("this.f.direccioncorrespondencia.value:" + this.f.direccioncorrespondencia.value);

        if (this.direccionesIguales) {
            dirCorres = this.f.direccionempresa.value;
        } else {
            dirCorres = this.f.direccioncorrespondencia.value;
        }

        this.listasService.crearCliente({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            name: this.f.nombreempresa.value, nit: this.f.nitcliente.value, pbx: phoneNumber, phone: phoneNumber, mobile: this.f.celular.value,
            email: this.f.email.value, address: this.f.direccionempresa.value, mailAddress: dirCorres,
            web: this.f.website.value, courtNotice: this.f.emailnotificacionjudicial.value, city: this.f.ciudades.value, creationUser: this.dni
        })
            .subscribe(data => {
                this.objCliente = data;
                console.log(this.objCliente);
                this.createRequestForm.controls['direccioncorrespondencia'].enable();
                // Se crean las actividades industriales.
                this.crearActividadesIndustriales();

                if (!this.existeContacto) {
                    //console.log("El contacto no existe.");
                    this.crearContacto();
                }
                if (!this.existeRepresentante) {
                    this.crearRepresentante();
                }

                // Se llama la creación de la Solicitud.
                this.crearSolicitud();
            });
    }

    crearActividadesIndustriales(): void {
        console.log("Entra a enviar a crear las Actividades Industriales.");

        // Luego se crean las nuevas actividades industriales seleccionadas.
        for (let actIndustrial of this.listaActividadesIndustriales) {
            console.log("Recorrido de Actividades Industriales.");

            if (actIndustrial.check === true) {
                console.log("Actividad Industrial seleccionada.");
                this.crearActividadIndustrial(this.objCliente.cdClient, actIndustrial.cdIndustrialActivity);
            } else {
                console.log("Actividad Industrial deseleccionada.");
            }
        }
    }

    crearActividadIndustrial(client: string, industrialactivity: string): void {
        this.listasService.crearActividadIndustrialCliente({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdclient: client, cdindustrialactivity: industrialactivity
        })
            //cdclient: client, cdindustrialactivity: industrialactivity, creationUser: this.dni})
            .subscribe(data => {
                this.objMarca = data;
            });
    }

    crearContacto(): void {
        this.listasService.crearContacto({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdClient: this.objCliente.cdClient, position: this.f.cargocontacto.value, firstName: this.f.nombrescontacto.value,
            lastName: this.f.apellidoscontacto.value, address: this.f.direccioncontacto.value, mobile: this.f.telefonocontacto.value,
            email: this.f.emailcorpcontacto.value, creationUser: this.dni
        })
            .subscribe(data => {
                this.objContacto = data;
            });
    }

    crearRepresentante(): void {
        let nombres, apellidos, cargo, direccion, email, telefono: any;

        // Se llama la capacidad que crea un representante.
        console.log("Entrar en el que crear el nuevo representante.");
        console.log("this.objCliente.cdClient:" + this.objCliente.cdClient);
        console.log("this.f.nombresrepresentante.value:" + this.f.nombresrepresentante.value);
        console.log("this.f.apellidosrepresentante.value:" + this.f.apellidosrepresentante.value);
        console.log("this.f.direccionrepresentante.value:" + this.f.direccionrepresentante.value);
        console.log("this.f.emailcorprepresentante.value:" + this.f.emailcorprepresentante.value);
        console.log("this.f.telefonorepresentante.value:" + this.f.telefonorepresentante.value);

        if (this.mismoContacto) {
            nombres = this.f.nombrescontacto.value;
            apellidos = this.f.apellidoscontacto.value;
            cargo = this.f.cargocontacto.value;
            direccion = this.f.direccioncontacto.value;
            email = this.f.emailcorpcontacto.value;
            telefono = this.f.telefonocontacto.value;
        } else {
            nombres = this.f.nombresrepresentante.value;
            apellidos = this.f.apellidosrepresentante.value;
            cargo = "Representante Legal";
            direccion = this.f.direccionrepresentante.value;
            email = this.f.emailcorprepresentante.value;
            telefono = this.f.telefonorepresentante.value;
        }

        this.listasService.crearRepresentante({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdClient: this.objCliente.cdClient, position: cargo, firstName: nombres, lastName: apellidos,
            address: direccion, mobile: telefono, email: email, creationUser: this.dni
        })
            .subscribe(data => {
                this.objContacto = data;
                this.createRequestForm.controls['nombresrepresentante'].enable();
                this.createRequestForm.controls['apellidosrepresentante'].enable();
                this.createRequestForm.controls['direccionrepresentante'].enable();
                this.createRequestForm.controls['emailcorprepresentante'].enable();
                this.createRequestForm.controls['telefonorepresentante'].enable();
            });
    }
 
    crearMarcas(): void {
        // Se llama la capacidad que crea una marca.
        console.log("Entrar en el que crear la nueva marca.");
        console.log("this.objSolicitud.cdRequest:" + this.objSolicitud.cdRequest);
        console.log("this.f.tiposcafe.value:" + this.f.tiposcafe.value);
        console.log("this.f.referencia.value:" + this.f.referencia.value);
        console.log("this.f.nombremarca.value:" + this.f.nombremarca.value);

        // Se recorren las marcas agregadas a la lista y se crean desde el BE.
        for (let marca of this.listaMarcas) {
            this.crearMarca(marca.txName, marca.txReference, marca.cdCoffeeType);
        }
    }

    crearMarca(nombre: string, referencia: string, cdtipocafe: string): void {
        this.listasService.crearMarca({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            txName: nombre, txReference: referencia, cdCoffeeType: cdtipocafe, cdRequest: this.objSolicitud.cdRequest, creationUser: this.dni
        })
            .subscribe(data => {
                this.objMarca = data;
            });
    }

    crearSoportes(): void {
        let cdReq: string = this.objSolicitud.cdRequest;
        //console.log("this.f.codigocertificado.value: " + this.f.codigocertificado.value);

        // Aquí se llama la capacidad de BE para guardar los archivos de soporte.
        if (this.fileToUpload1 != null) {
            Array.from(this.fileToUpload1).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        if (this.fileToUpload2 != null) {
            Array.from(this.fileToUpload2).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        if (this.fileToUpload3 != null) {
            Array.from(this.fileToUpload3).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        if (this.fileToUpload4 != null) {
            Array.from(this.fileToUpload4).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        if (this.fileToUpload5 != null) {
            Array.from(this.fileToUpload5).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        if (this.fileToUpload6 != null) {
            Array.from(this.fileToUpload6).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        if (this.fileToUpload7 != null) {
            Array.from(this.fileToUpload7).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        if (this.fileToUpload8 != null) {
            Array.from(this.fileToUpload8).forEach(file => {
                this.crearArchivo(file, cdReq);
            });
        }

        // Aquí se envía a guardar trazabilidad de la creación de archivos.
        // codrequest: any, controlchain: any, eventchain: any, answer: any, json: any, observation: any
        this.guardarTraza(this.objSolicitud.cdRequest, "0", "0", "1", this.objSolicitud, "Creación de archivos como soportes.");
    }

    crearArchivo(file: File, codRequest: string): void {
        //const formData = new FormData();

        //console.log("file.name: " + file.name);
        //this.listasService.crearArchivo(file, "SICERT", codRequest).subscribe(data => {
        this.listasService.crearArchivo(file, "cafecertfile", codRequest).subscribe(data => {
            if (data['status'] === `Internal Server Error`) {
                this.alertService.error(data['message']);
            } else {
                // this.alertService.error(data['message']);
                let request = {
                    "frontend": `${process.env.FRONTEND}`,
                    "next": `${process.env.NEXT}`,
                    "sessionid": this.sessionid,
                    "txCodRequest": codRequest,
                    "txName": data['name'],
                    "txType": data['type'],
                    "txPath": data['path'],
                    "txCreationUser": this.dni
                }
                this.listasService.guardarRegistroArchivoSolicitud(request).subscribe();
            }
        }, error => {
            this.alertService.error(error);
            console.log(error);
        });
    }

    guardarTraza(codrequest: any, controlchain: string, eventchain: string, answer: string, json: any, observation: string): void {
        this.listasService.saveTrace({
            "codrequest": codrequest,
            "cdControlChain": controlchain,
            "cdEventChain": eventchain,
            "cdTypeEventLog": "4",
            "nuValue": answer,
            "txJson": JSON.stringify(json),
            "txDescription": observation,
            "txCreationUser": this.dni,
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "session": this.sessionid
        }).subscribe(data => {
            // Aquí llega la respuesta de a trazabilidad.
        });
    }

    public onChangeCertificationType(event: any): void {
        console.log("Ejecución de evento onChange(): " + this.f.rbtipocertificacion.value);

        if ( this.f.rbtipocertificacion.value == "2" || this.f.rbtipocertificacion.value == "4") {
            this.isCertificationCodeVisible = true;
        } else {
            this.isCertificationCodeVisible = false;
            this.f.codigocertificado.setValue('');
        }
    }

    public onPerformanceSearchClient(): void {
        if (this.f.nitcliente.value == '') {
            return;
        }
        this.consultarInfoCliente();
        console.log("this.listaActividadesIndustriales: " +this.listaActividadesIndustriales);
        
    }



    public onPerformanceCleanClient(): void {
        this.listaRespuestaMismo = [];
        this.listaRespuestaMismo.push({ id: "1", text: "Si", check: false });
        this.listaRespuestaMismo.push({ id: "2", text: "No", check: true });

        this.listaRespuestaMismaDir = [];
        this.listaRespuestaMismaDir.push({ id: "1", text: "Si", check: false });
        this.listaRespuestaMismaDir.push({ id: "2", text: "No", check: true });

        this.isClientVisible = false;
        this.objCliente = { txNit: '', txName: '', txAddress: '', txMailAddress: '', txPhone: '', txMobile: '', txEmail: '', txCourtNotice: '', txWeb: '' };
        this.createRequestForm.get('paises').setValue('');
        this.createRequestForm.get('departamentos').setValue('');
        this.createRequestForm.get('ciudades').setValue('');
        this.seletedClientCountry = { cdCountry: "", txNameCountry: "" };
        this.seletedClientState = { cdState: "", txNameState: "", cdCountry: "" };
        this.seletedCity = { cdCity: "", txNameCity: "", cdState: "" };

        this.objContacto = {};
        this.objRepresentante = {};

        this.createRequestForm.controls['nitcliente'].reset();
        this.createRequestForm.controls['nombreempresa'].setValue('');
        this.createRequestForm.controls['direccionempresa'].setValue('');
        this.createRequestForm.controls['direccioncorrespondencia'].setValue('');
        this.createRequestForm.controls['numerofijo'].setValue('');
        this.createRequestForm.controls['celular'].setValue('');
        this.createRequestForm.controls['email'].setValue('');
        this.createRequestForm.controls['emailnotificacionjudicial'].setValue('');
        this.createRequestForm.controls['website'].setValue('');

        this.createRequestForm.controls['nombrescontacto'].setValue('');
        this.createRequestForm.controls['apellidoscontacto'].setValue('');
        this.createRequestForm.controls['direccioncontacto'].setValue('');
        this.createRequestForm.controls['cargocontacto'].setValue('');
        this.createRequestForm.controls['emailcorpcontacto'].setValue('');
        this.createRequestForm.controls['telefonocontacto'].setValue('');

        this.createRequestForm.controls['nombresrepresentante'].setValue('');
        this.createRequestForm.controls['apellidosrepresentante'].setValue('');
        this.createRequestForm.controls['direccionrepresentante'].setValue('');
        this.createRequestForm.controls['emailcorprepresentante'].setValue('');
        this.createRequestForm.controls['telefonorepresentante'].setValue('');

        this.createRequestForm.controls['nombresrepresentante'].enable();
        this.createRequestForm.controls['apellidosrepresentante'].enable();
        this.createRequestForm.controls['direccionrepresentante'].enable();
        this.createRequestForm.controls['emailcorprepresentante'].enable();
        this.createRequestForm.controls['telefonorepresentante'].enable();

        this.createRequestForm.controls['direccioncorrespondencia'].enable();

        this.createRequestForm.controls['regtrilladora'].disable();
        this.createRequestForm.controls['regtostadora'].disable();
        this.createRequestForm.controls['regsolubilizador'].disable();
        this.createRequestForm.controls['regprodextracto'].disable();
        this.existeNit = false;
    }

    public onClickAdd(): void {
        console.log("Ejecución de evento para Agregar Marca.");

        if (this.f.nombremarca.value.toString() != "" && this.f.referencia.value.toString() != "" && this.f.tiposcafe.value.toString() != "") {
            console.log("Los campos de Marca están con datos.");
            let trademark = {
                txName: this.f.nombremarca.value,
                txReference: this.f.referencia.value,
                cdCoffeeType: this.f.tiposcafe.value,
                txDescription: this.buscarTipoCafe(this.f.tiposcafe.value).txDescription
            };
            let trademarkObj = this.listaMarcas.filter(q => q.txName == trademark.txName
                && q.txReference == trademark.txReference
                && q.cdCoffeeType == trademark.cdCoffeeType);

            if (trademarkObj.length == 0) {
                this.listaMarcas.push(trademark);
                //this.msgControlesVacios = "";
                this.mostrarMsgValidacion = false;
                this.mostrarMsgValidacionMarcas = false;
                this.limpiarCamposMarca();
            } else {
                this.mostrarMsgValidacion = true;
                this.mostrarMsgValidacionMarcas = true;
            }


        } else {
            console.log("Los campos de Marca NO tienen con datos.");
            //this.msgControlesVacios = "Debe escoger un Tipo de Café de la lista";
            this.mostrarMsgValidacion = true;
            this.mostrarMsgValidacionMarcas = false;
        }
    }

    limpiarCamposMarca(): void {
        // Limpiar Campos
        this.f.nombremarca.setValue("");
        this.f.referencia.setValue("");
        this.f.tiposcafe.setValue("");
    }

    public removeTrademark(trademark: any): void {
        this.listaMarcas = this.listaMarcas.filter(q => q.txName != trademark.txName
            && q.txReference != trademark.txReference
            && q.cdCoffeeType != trademark.cdCoffeeType);
    }

    cambiarHabilitacionCamposRegistroFNC(): void {
       
        for (let element of this.listaActividadesIndustriales) {
            if (element.check) {
                if (element.txNameActivity.toString() === "Trilla") {
                    this.createRequestForm.controls['regtrilladora'].enable();
                }
                if (element.txNameActivity.toString() === "Torrefacción") {
                    this.createRequestForm.controls['regtostadora'].enable();
                }
                if (element.txNameActivity.toString() === "Producción de descafeinados") {
                    this.createRequestForm.controls['regsolubilizador'].enable();
                }
                if (element.txNameActivity.toString() === "Producción de solubles extractos") {
                    this.createRequestForm.controls['regprodextracto'].enable();
                }
            }
        }
    }

    public onClickAttach(): void {
        console.log("Ejecución de evento para Adjuntar Archivo.");
    }

    public handleFileInput1(files: FileList) {
        this.fileToUpload1 = files;
    }

    public handleFileInput2(files: FileList) {
        this.fileToUpload2 = files;
    }

    public handleFileInput3(files: FileList) {
        this.fileToUpload3 = files;
    }

    public handleFileInput4(files: FileList) {
        this.fileToUpload4 = files;
    }

    public handleFileInput5(files: FileList) {
        this.fileToUpload5 = files;
    }

    public handleFileInput6(files: FileList) {
        this.fileToUpload6 = files;
    }

    public handleFileInput7(files: FileList) {
        this.fileToUpload7 = files;
    }

    public handleFileInput8(files: FileList) {
        this.fileToUpload8 = files;
    }

    consultarInfoCliente(): void {

        //this.objCliente = JSON.parse('{}');
        this.objCliente = { txNit: '', txName: '', txAddress: '', txMailAddress: '', txPhone: '', txMobile: '', txEmail: '', txCourtNotice: '', txWeb: '' };
        this.objContacto = {};
        this.objRepresentante = { txFirstName: "", txLastName: "", txAddress: "", txEmail: "", txMobile: "" };
        this.existeCliente = false;
        this.existeNit = false;
        //console.log("eerores this.f.nitcliente: " + this.f.nitcliente.errors);
        //console.log("this.f.nitcliente: " + this.f.nitcliente.value);
        // Aquí se valida si el nit del cliente existe, si existe se cargan los campos sino, se habilitan para crearlo.
        this.listasService.consultarClientePorNit({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, nit: this.f.nitcliente.value })
            .subscribe(data => {
                if (data.txNit != null && !(Object.keys(data).length === 0 && data.constructor === Object)) {
                    this.objCliente = data;
                    console.log(this.objCliente);

                    this.listaRespuestaMismaDir = [];
                    let mismaDireccion = false;
                    try {
                        mismaDireccion = this.objCliente.txAddress.toString() === this.objCliente.txMailAddress.toString();
                    } catch (error) {

                    }
                    this.listaRespuestaMismaDir.push({ id: "1", text: "Si", check: mismaDireccion });
                    this.listaRespuestaMismaDir.push({ id: "2", text: "No", check: !mismaDireccion });
                    if (mismaDireccion) {
                        this.createRequestForm.controls['direccioncorrespondencia'].disable();
                    }
                    this.f.preguntadireccion.setValue(mismaDireccion ? 'Si' : 'No');
                    // this.consultarInfoContacto();
                    // this.consultarInfoRepresentante();
                    this.consultarPersonasPorCliente();

                    this.existeCliente = true;
                } else {
                    // this.objCliente = { txNit: '', txName: '', txAddress: '', txMailAddress: '', txPhone: '', txMobile: '', txEmail: '', txCourtNotice: '', txWeb: '' };
                    // this.objRepresentante = {txFirstName:"", txLastName:"", txAddress:"", txEmail:"", txMobile:""};
                    this.existeNit = true;
                }

                this.isClientVisible = true;
                this.changeDisable();
            });

        this.textoBotonBuscar = "Limpiar";
       
    }

    consultarInfoContacto(): void {
        this.objContacto = {};
        this.existeContacto = false;

        // Aquí se valda si el contacto existe, si exste se cargan los campos sino, se habilitan para crearlo.
        this.listasService.consultarContactoPorCliente({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdClient: this.objCliente.cdClient })
            .subscribe(data => {
                this.objContacto = data;
                console.log(this.objContacto);
                this.createRequestForm.controls['nombrescontacto'].setValue(this.objContacto.txFirstName);
                this.createRequestForm.controls['apellidoscontacto'].setValue(this.objContacto.txLastName);
                this.createRequestForm.controls['direccioncontacto'].setValue(this.objContacto.txAddress);
                this.createRequestForm.controls['cargocontacto'].setValue(this.objContacto.txPosition);
                this.createRequestForm.controls['emailcorpcontacto'].setValue(this.objContacto.txEmail);
                this.createRequestForm.controls['telefonocontacto'].setValue(this.objContacto.txMobile);
                console.log("Valores del objeto Contacto consultado desde el BE: ");
                console.log("this.objContacto.txFirstName: " + this.objContacto.txFirstName);
                console.log("this.objContacto.txLastName: " + this.objContacto.txLastName);
                console.log("this.objContacto.txAddress: " + this.objContacto.txAddress);

                // Validar si el contacto existe.
                if (this.objContacto.cdClient != undefined && this.objContacto.cdClient.toString() === this.objCliente.cdClient.toString()) {
                    this.existeContacto = true;
                }
            });
    }

    consultarInfoRepresentante(): void {
        //this.objContacto = JSON.parse('{}');
        this.objRepresentante = {};
        this.existeRepresentante = false;

        // Aquí se valda si el representante existe, si exste se cargan los campos sino, se habilitan para crearlo.
        this.listasService.consultarRepresentanteCliente({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdClient: this.objCliente.cdClient })
            .subscribe(data => {
                this.objRepresentante = data;
                console.log(this.objRepresentante);
                this.createRequestForm.controls['nombresrepresentante'].setValue(this.objRepresentante.txFirstName);
                this.createRequestForm.controls['apellidosrepresentante'].setValue(this.objRepresentante.txLastName);
                this.createRequestForm.controls['direccionrepresentante'].setValue(this.objRepresentante.txAddress);
                this.createRequestForm.controls['emailcorprepresentante'].setValue(this.objRepresentante.txEmail);
                this.createRequestForm.controls['telefonorepresentante'].setValue(this.objRepresentante.txMobile);

                let mismoContacto: boolean = this.validacionInfoContactos(this.objRepresentante);
                this.listaRespuestaMismo = [];
                this.listaRespuestaMismo.push({ id: "1", text: "Si", check: mismoContacto });
                this.listaRespuestaMismo.push({ id: "2", text: "No", check: !mismoContacto });

                //console.log("Valores del objeto Representante consultado desde el BE: " + this.objRepresentante);

                // Validar si el representante existe.
                if (this.objRepresentante.cdClient != undefined && this.objRepresentante.cdClient.toString() === this.objCliente.cdClient.toString()) {
                    this.existeRepresentante = true;
                }
            });
    }

    consultarPersonasPorCliente() {
        this.objContacto = {};
        this.objRepresentante = {};
        this.existeContacto = false;
        this.existeRepresentante = false;
        this.listasService.consultarPersonasPorCliente(this.objCliente.cdClient).subscribe(
            (data) => {
                if (data.length > 0) {
                    data.forEach((person: any) => {
                        if (person.cdContactType == 1) {//Representante legal
                            this.objRepresentante = person;
                            this.createRequestForm.controls['nombresrepresentante'].setValue(this.objRepresentante.txFirstName);
                            this.createRequestForm.controls['apellidosrepresentante'].setValue(this.objRepresentante.txLastName);
                            this.createRequestForm.controls['direccionrepresentante'].setValue(this.objRepresentante.txAddress);
                            this.createRequestForm.controls['emailcorprepresentante'].setValue(this.objRepresentante.txEmail);
                            this.createRequestForm.controls['telefonorepresentante'].setValue(this.objRepresentante.txMobile);

                            //console.log("Valores del objeto Representante consultado desde el BE: " + this.objRepresentante);

                            // Validar si el representante existe.
                            if (this.objRepresentante.cdClient != undefined && this.objRepresentante.cdClient.toString() === this.objCliente.cdClient.toString()) {
                                this.existeRepresentante = true;
                            }
                        } else if (person.cdContactType == 2) {//Contacto Principal
                            this.objContacto = person;
                            this.createRequestForm.controls['nombrescontacto'].setValue(this.objContacto.txFirstName);
                            this.createRequestForm.controls['apellidoscontacto'].setValue(this.objContacto.txLastName);
                            this.createRequestForm.controls['direccioncontacto'].setValue(this.objContacto.txAddress);
                            this.createRequestForm.controls['cargocontacto'].setValue(this.objContacto.txPosition);
                            this.createRequestForm.controls['emailcorpcontacto'].setValue(this.objContacto.txEmail);
                            this.createRequestForm.controls['telefonocontacto'].setValue(this.objContacto.txMobile);

                            // Validar si el contacto existe.
                            if (this.objContacto.cdClient != undefined && this.objContacto.cdClient.toString() === this.objCliente.cdClient.toString()) {
                                this.existeContacto = true;
                            }
                        }
                    });
                    let mismoContacto: boolean = this.validacionInfoContactos(this.objRepresentante);
                    this.listaRespuestaMismo = [];
                    this.listaRespuestaMismo.push({ id: "1", text: "Si", check: mismoContacto });
                    this.listaRespuestaMismo.push({ id: "2", text: "No", check: !mismoContacto });
                    this.f.preguntamismocontacto.setValue(mismoContacto ? 'Si' : 'No');
                }
            }
        );
    }

    changeDisable(): void {
        //console.log("Entrar al método 'changeDisable()'");

        // Se valida si en cliente consultado existe, verificado si el nit encontrado en el consumo del backend es igual al digitado.
        //console.log("Valor del nit del cliente: " + this.f.nitcliente.value);
        //console.log("Valor del nit consultado desde el BE: " + this.objCliente.txNit);
        //console.log("Valores del Cliente consultado desde el BE: " + this.objCliente);
        try {
            if (this.objCliente.txNit != undefined && this.objCliente.txNit.toString() === this.f.nitcliente.value.toString()) {
                //console.log("Validación de si NIT del cliente es el mismo. R/ SI");
                // this.existeCliente = true;
                //this.cargarInfoCliente();
            } else {
                //console.log("Validación de si NIT del cliente es el mismo. R/ NO");
                // this.existeCliente = false;
            }
        } catch (error) {

        }

        this.inicializarControlesCliente();
        
        //console.log("El nit del cliente existe: " + this.existeCliente);
    }

    inicializarControlesCliente(): void {
        //console.log("Entra al método que carga la información por defecto de los campos del cliente.");

        // Se consultan las actividades industriales.
        this.listasService.consultarTodasActividadesIndustriales({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                this.listaActividadesIndustriales = data;
                if (!this.existeNit) {
                    this.consultarActividadesIndustrialesPorCliente(this.objCliente.cdClient);
                }

            });

        if (!this.existeNit) {
            this.cargarControlesCliente(this.objCliente);
        }

        this.buscarPaisesCliente();
        this.buscarDepartamentos(this.objCliente.cdCountry);
        this.buscarCiudades(this.objCliente.cdState);
    }

    consultarActividadesIndustrialesPorCliente(cdclient: string): void {
        //console.log("Entra a consultar la actividades industriales asociadas al cliente, cdclient): " + cdclient);
        //console.log("Entra a consultar la actividades industriales asociadas al cliente, this.objCliente.cdClient: " + this.objCliente.cdClient);

        this.listasService.consultarActividadesIndustrialesPorCliente({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdclient: this.objCliente.cdClient })
            .subscribe(data => {
                this.listaActividadesIndustrialesCliente = data;

                this.seleccionarActividadesIndustriales(cdclient);
            });
    }

    seleccionarActividadesIndustriales(cdcliente: string): void {
        let listaActividadesIndustrialesAux1: Array<{ txNameActivity: string, txDesActivity: string, txActive: string, cdIndustrialActivity: string, check: boolean }> = [];
        let listaActividadesIndustrialesAux2: Array<{ txNameActivity: string, txDesActivity: string, txActive: string, cdIndustrialActivity: string, check: boolean }> = [];

        console.log("this.listaActividadesIndustrialesCliente: " + this.listaActividadesIndustrialesCliente.length);
        // Se recorren las actividades industriales seleccionadas.
        for (let ActIndSel of this.listaActividadesIndustrialesCliente) {
            console.log("Recorrido de una AI del cliente.");

            this.listaActividadesIndustriales.forEach(element => {
                console.log("Recorrido de una AI.");
                if (ActIndSel.cdIndustrialActivity === element.cdIndustrialActivity) {
                    console.log("AI del cliente igual a la del catalogo: " + element.cdIndustrialActivity);
                    listaActividadesIndustrialesAux1.push({ txNameActivity: element.txNameActivity, txDesActivity: element.txDesActivity, txActive: element.txActive, cdIndustrialActivity: element.cdIndustrialActivity, check: true });
                }
            });
        }

        for (let element of this.listaActividadesIndustriales) {
            let actIndAux = listaActividadesIndustrialesAux1.find(x => x.cdIndustrialActivity === element.cdIndustrialActivity);
            console.log("AI actIndAux: " + actIndAux);
            if (actIndAux === undefined) {
                // No se hace nada si ya está en la lista.
                listaActividadesIndustrialesAux2.push({ txNameActivity: element.txNameActivity, txDesActivity: element.txDesActivity, txActive: element.txActive, cdIndustrialActivity: element.cdIndustrialActivity, check: false });
            }
        }
        
        this.listaActividadesIndustriales = listaActividadesIndustrialesAux1.concat(listaActividadesIndustrialesAux2);
        //console.log("AI despues concatenar this.listaActividadesIndustriales: " + JSON.stringify(this.listaActividadesIndustriales));
        this.cambiarHabilitacionCamposRegistroFNC();
    }

    private buscarCiudades(cdState: number): void {
        let request = {
            rol: this.role,
            sesionid: this.sessionid,
            frontend: `${process.env.FRONTEND}`,
            next: `${process.env.NEXT}`,
            cdState: cdState
        };
        this.listasService.consultarCiudadesPorDepartamento(request).subscribe(
            (data) => {
                this.listaCiudades = data;
                this.setIndicativo();
            }, (error) => {

            }
        );
    }

    private setIndicativo() {
        let cdCity = this.createRequestForm.get('ciudades').value;
        let city = this.listaCiudades.filter(q => q.cdCity == cdCity)[0];
        if (typeof city != 'undefined') {
            this.f.indicativo.setValue(city.txAreaCode);
        } else {
            this.f.indicativo.setValue('');
        }
    }

    private setPrefijo() {
        let cdCountry = this.createRequestForm.get('paises').value;
        let country = this.listaPaisesCliente.filter(q => q.cdCountry == cdCountry)[0];
        if (typeof country != 'undefined') {
            this.f.prefijo.setValue(country.txAreaCode);
        } else {
            this.f.prefijo.setValue('');
        }
    }

    private buscarDepartamentos(cdCountry: number): void {
        let request = {
            rol: this.role,
            sesionid: this.sessionid,
            frontend: `${process.env.FRONTEND}`,
            next: `${process.env.NEXT}`,
            cdCountry: cdCountry
        };

        this.listasService.consultarDepartamentosPorPais(request).subscribe(
            (data) => {
                this.listaDepartamentos = data;
            }, (error) => {
                console.log(error);
            }
        );
    }

    private buscarPaisesCliente(): void {
        // Se consultan los países.
        this.listasService.consultarTodosPaises({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                try {
                    if (!((Object.keys(data).length === 0 && data.constructor === Object))) {
                        this.listaPaisesCliente = data;
                        this.setPrefijo();
                    }
                } catch (error) {
                    console.log(error);
                }

                if (!this.existeNit) {
                    // this.createRequestForm.get('paises').setValue(this.objCliente.cdCountry);
                    // this.seleccionarPaisCliente(this.seletedClientState.cdCountry);
                }

            });
    }

    cargarControlesCliente(cliente: any): void {
        if (typeof cliente != 'undefined') {
            this.createRequestForm.controls['nitcliente'].setValue(cliente.txNit);
            this.createRequestForm.controls['nombreempresa'].setValue(cliente.txName);
            this.createRequestForm.controls['direccionempresa'].setValue(cliente.txAddress);
            this.createRequestForm.controls['direccioncorrespondencia'].setValue(cliente.txMailAddress);
            this.createRequestForm.controls['numerofijo'].setValue(cliente.txPhone);
            this.createRequestForm.controls['celular'].setValue(cliente.txMobile);
            this.createRequestForm.controls['email'].setValue(cliente.txEmail);
            this.createRequestForm.controls['emailnotificacionjudicial'].setValue(cliente.txCourtNotice);
            this.createRequestForm.controls['website'].setValue(cliente.txWeb);
            this.createRequestForm.controls['paises'].setValue(cliente.cdCountry);
            this.createRequestForm.controls['departamentos'].setValue(cliente.cdState);
            this.createRequestForm.controls['ciudades'].setValue(cliente.cdCity);
        }
    }

    inicialiarControlesMarcas(): void {
        // Se consultan los Tipos de Café.
        this.listasService.consultarTiposCafe({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                this.listaTiposCafe = data;
            });
    }

    public onChangeQuestionAddres(event): void {
        //console.log("Entrar al evento del cambio de pregunta Misma dirección de la empresa.");
        var target = event.target;

        //console.log("target.value: " + target.value);
        //console.log("this.f.preguntadireccion.value: " + this.f.preguntadireccion.value);
        console.log("this.direccionesIguales: " + this.direccionesIguales);
        if (this.f.preguntadireccion.value.toString() === "Si") {
            console.log("Si el valor de la respuesta es SI");
            //console.log("this.f.direccionempresa.value: " + this.f.direccionempresa.value);
            this.createRequestForm.controls['direccioncorrespondencia'].setValue(this.f.direccionempresa.value);
            this.objCliente.txMailAddress = this.f.direccionempresa.value;

            this.direccionesIguales = true;
            this.createRequestForm.controls['direccioncorrespondencia'].disable();
            //this.createRequestForm.get('name').disable();
        } else {
            console.log("Si el valor de la respuesta es NO");
            //this.createRequestForm.controls['direccioncorrespondencia'].setValue("");
            this.objCliente.txMailAddress = "";
            this.direccionesIguales = false;
            this.createRequestForm.controls['direccioncorrespondencia'].enable();
        }
    }

    public onChangeQuestionContact(event): void {
        console.log("this.mismoContacto: " + this.mismoContacto);
        if (this.f.preguntamismocontacto.value.toString() === "Si") {
            console.log("Si el valor de la respuesta es SI");
            this.cargarControlesRepresentante(true);
            this.changeActiveRepresentant(true);
            this.mismoContacto = true;
            //this.createRequestForm.get('name').disable();
        } else {
            console.log("Si el valor de la respuesta es NO");
            this.cargarControlesRepresentante(false);
            this.changeActiveRepresentant(false);
            this.mismoContacto = false;
        }
    }

    cargarControlesRepresentante(llenar: boolean): void {
        if (llenar) {
            this.objRepresentante.txFirstName = this.f.nombrescontacto.value;
            this.objRepresentante.txLastName = this.f.apellidoscontacto.value;
            this.objRepresentante.txAddress = this.f.direccioncontacto.value;
            this.objRepresentante.txEmail = this.f.emailcorpcontacto.value;
            this.objRepresentante.txMobile = this.f.telefonocontacto.value;

            this.createRequestForm.controls['nombresrepresentante'].setValue(this.objRepresentante.txFirstName);
            this.createRequestForm.controls['apellidosrepresentante'].setValue(this.objRepresentante.txLastName);
            this.createRequestForm.controls['direccionrepresentante'].setValue(this.objRepresentante.txAddress);
            this.createRequestForm.controls['emailcorprepresentante'].setValue(this.objRepresentante.txEmail);
            this.createRequestForm.controls['telefonorepresentante'].setValue(this.objRepresentante.txMobile);

            this.createRequestForm.controls['nombresrepresentante'].disable();
            this.createRequestForm.controls['apellidosrepresentante'].disable();
            this.createRequestForm.controls['direccionrepresentante'].disable();
            this.createRequestForm.controls['emailcorprepresentante'].disable();
            this.createRequestForm.controls['telefonorepresentante'].disable();
        } else {
            this.objRepresentante.txFirstName = "";
            this.objRepresentante.txLastName = "";
            this.objRepresentante.txAddress = "";
            this.objRepresentante.txEmail = "";
            this.objRepresentante.txMobile = "";

            this.createRequestForm.controls['nombresrepresentante'].setValue('');
            this.createRequestForm.controls['apellidosrepresentante'].setValue('');
            this.createRequestForm.controls['direccionrepresentante'].setValue('');
            this.createRequestForm.controls['emailcorprepresentante'].setValue('');
            this.createRequestForm.controls['telefonorepresentante'].setValue('');

            this.createRequestForm.controls['nombresrepresentante'].enable();
            this.createRequestForm.controls['apellidosrepresentante'].enable();
            this.createRequestForm.controls['direccionrepresentante'].enable();
            this.createRequestForm.controls['emailcorprepresentante'].enable();
            this.createRequestForm.controls['telefonorepresentante'].enable();
        }
    }

    changeActiveRepresentant(disable: boolean): void {
        if (disable) {
            this.createRequestForm.controls['nombresrepresentante'].disable();
            this.createRequestForm.controls['apellidosrepresentante'].disable();
            this.createRequestForm.controls['direccionrepresentante'].disable();
            this.createRequestForm.controls['emailcorprepresentante'].disable();
            this.createRequestForm.controls['telefonorepresentante'].disable();
        } else {
            this.createRequestForm.controls['nombresrepresentante'].enable();
            this.createRequestForm.controls['apellidosrepresentante'].enable();
            this.createRequestForm.controls['direccionrepresentante'].enable();
            this.createRequestForm.controls['emailcorprepresentante'].enable();
            this.createRequestForm.controls['telefonorepresentante'].enable();
        }
    }

    /*
     public onChangeIndustryActivity(actIndustrial: any, event): void {
         var target = event.target;
         //console.log("Ejecución de evento cuando se cambia una Actividad Industrial.");
 
         //this.createRequestForm.controls['cbactividadindustrial']
         if (target.checked) {
             //console.log("Se selecciona la actividad industrial: " + actIndustrial.txNameActivity);
             actIndustrial.check = true;
         } else {
             //console.log("Se deselecciona la actividad industrial: " + actIndustrial.txNameActivity);
             actIndustrial.check = false;
         }
     }*/



    public onChangeIndustryActivity(actIndustrial: any, event): void {
        var target = event.target;
        if (target.checked) {
            actIndustrial.check = true;
            this.contAISeleccionadas = this.contAISeleccionadas + 1;
            if (actIndustrial.txNameActivity.toString() === "Trilla") {
                this.createRequestForm.controls['regtrilladora'].enable();
            } else if (actIndustrial.txNameActivity.toString() === "Torrefacción") {
                this.createRequestForm.controls['regtostadora'].enable();
            } else if (actIndustrial.txNameActivity.toString() === "Producción de descafeinados") {
                this.createRequestForm.controls['regsolubilizador'].enable();
            } else if (actIndustrial.txNameActivity.toString() === "Producción de solubles extractos") {
                this.createRequestForm.controls['regprodextracto'].enable();
            }
        } else {
            actIndustrial.check = false;
            this.contAISeleccionadas = this.contAISeleccionadas - 1;
            if (actIndustrial.txNameActivity.toString() === "Trilla") {
                this.createRequestForm.controls['regtrilladora'].disable();
                this.f.regtrilladora.setValue(null);
            } else if (actIndustrial.txNameActivity.toString() === "Torrefacción") {
                this.createRequestForm.controls['regtostadora'].disable();
                this.f.regtostadora.setValue(null);
            } else if (actIndustrial.txNameActivity.toString() === "Producción de descafeinados") {
                this.createRequestForm.controls['regsolubilizador'].disable();
                this.f.regsolubilizador.setValue(null);
            } else if (actIndustrial.txNameActivity.toString() === "Producción de solubles extractos") {
                this.createRequestForm.controls['regprodextracto'].disable();
                this.f.regprodextracto.setValue(null);
            }
        }
    }


    public onChangeProgram(program: any, event): void {
        var target = event.target;
        program.check = target.checked;
        if (program.id == 3) {
            this.isProgramaDor = program.check;
            if (this.isProgramaDor) {
                this.listaProgramasDOR.forEach((programador) => {
                    programador.check = false;
                })
            }
        }
    }

    public onKeyUpSame(field: number) {
        console.log(this.f.preguntamismocontacto.value);
        try {
            switch (field) {
                case 1:
                    if (this.f.preguntadireccion.value.toString() === "Si") {
                        this.objCliente.txMailAddress = this.f.direccionempresa.value;
                        this.f.direccioncorrespondencia.setValue(this.f.direccionempresa.value);
                    }
                    break;
                case 2:
                    if (this.f.preguntamismocontacto.value.toString() === "Si") {
                        this.objRepresentante.txFirstName = this.f.nombrescontacto.value;
                        this.f.nombresrepresentante.setValue(this.f.nombrescontacto.value);
                    }
                    break;
                case 3:
                    if (this.f.preguntamismocontacto.value.toString() === "Si") {
                        this.objRepresentante.txLastName = this.f.apellidoscontacto.value;
                        this.f.apellidosrepresentante.setValue(this.f.apellidoscontacto.value);
                    }
                    break;
                case 4:
                    if (this.f.preguntamismocontacto.value.toString() === "Si") {
                        this.objRepresentante.txAddress = this.f.direccioncontacto.value;
                        this.f.direccionrepresentante.setValue(this.f.direccioncontacto.value);
                    }
                    break;
                case 5:
                    if (this.f.preguntamismocontacto.value.toString() === "Si") {
                        this.objRepresentante.txEmail = this.f.emailcorpcontacto.value;
                        this.f.emailcorprepresentante.setValue(this.f.emailcorpcontacto.value);
                    }
                    break;
                case 6:
                    if (this.f.preguntamismocontacto.value.toString() === "Si") {
                        this.objRepresentante.txMobile = this.f.telefonocontacto.value;
                        this.f.telefonorepresentante.setValue(this.f.telefonocontacto.value);
                    }
                    break;
            }
        } catch (error) {

        }
    }

    validacionInfoContactos(representante: any): boolean {
        let result: boolean;

        try {
            if (this.objContacto.txFirstName.toString() === representante.txFirstName.toString() &&
                this.objContacto.txLastName.toString() === representante.txLastName.toString() &&
                this.objContacto.txAddress.toString() === representante.txAddress.toString() &&
                this.objContacto.txEmail.toString() === representante.txEmail.toString() &&
                this.objContacto.txMobile.toString() === representante.txMobile.toString()) {
                result = true;
                this.createRequestForm.controls['nombresrepresentante'].disable();
                this.createRequestForm.controls['apellidosrepresentante'].disable();
                this.createRequestForm.controls['direccionrepresentante'].disable();
                this.createRequestForm.controls['emailcorprepresentante'].disable();
                this.createRequestForm.controls['telefonorepresentante'].disable();
            } else {
                result = false;
            }
        } catch (error) {
            result = false;
        }

        return result;
    }

    onChangePanel(isFirstPanel: boolean = false) {
        if (isFirstPanel) {
            this.openPanel = true;
        } else {
            this.openPanel = false;
        }
    }

    public onChangeCountry() {
        let cdCountry = this.createRequestForm.get('paises').value;
        this.setPrefijo();

        this.listaDepartamentos = [];
        this.listaCiudades = [];
        this.f.departamentos.setValue('');
        this.f.ciudades.setValue('');
        this.f.indicativo.setValue('');

        this.buscarDepartamentos(cdCountry);
    }

    public onChangeState() {
        let cdState = this.createRequestForm.get('departamentos').value;
        this.f.ciudades.setValue('');
        this.f.indicativo.setValue('');
        this.buscarCiudades(cdState);
    }

    public onChangeCity() {
        this.setIndicativo();
    }

    public goBackRequestList() {
        // this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid, type: '2', value:'123456' }});
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    actualizarCliente(): void {
        let nomEmpresa, nitEmpresa, numTelefono, celular, correoElec, direccion, correoElecNotJudicial, dirCorres, sitioWeb, ciudad: any;

        nomEmpresa = this.objCliente.txName;
        if (this.objCliente.txName != this.f.nombreempresa.value) {
            nomEmpresa = this.f.nombreempresa.value;
        }

        nitEmpresa = this.f.nitcliente.value;
        if (this.objCliente.txNit != this.f.nitcliente.value) {
            nitEmpresa = this.f.nitcliente.value;
        }

        numTelefono = this.objCliente.txPhone;
        // if (this.objCliente.txPhone != (this.f.prefijo.value + this.f.indicativo.value + this.f.numerofijo.value)) {
        if (this.objCliente.txPhone != (this.f.numerofijo.value)) {
            // numTelefono = this.f.prefijo.value + this.f.indicativo.value + this.f.numerofijo.value;
            numTelefono = this.f.numerofijo.value;
        }

        celular = this.objCliente.txMobile;
        if (this.objCliente.txMobile != this.f.celular.value) {
            celular = this.f.celular.value;
        }

        correoElec = this.objCliente.txEmail;
        if (this.objCliente.txEmail != this.f.email.value) {
            correoElec = this.f.email.value;
        }

        direccion = this.objCliente.txAddress;
        if (this.objCliente.txAddress != this.f.direccionempresa.value) {
            direccion = this.f.direccionempresa.value;
        }

        correoElecNotJudicial = this.objCliente.txCourtNotice;
        if (this.objCliente.txCourtNotice != this.f.emailnotificacionjudicial.value) {
            correoElecNotJudicial = this.f.emailnotificacionjudicial.value;
        }

        sitioWeb = this.objCliente.txWeb;
        if (this.objCliente.txWeb != this.f.website.value) {
            sitioWeb = this.f.website.value;
        }

        if (this.direccionesIguales) {
            dirCorres = this.f.direccionempresa.value;
        } else {
            dirCorres = this.f.direccioncorrespondencia.value;
        }

        //console.log("this.objCliente.cdCity: " + this.objCliente.cdCity);
        ciudad = this.objCliente.cdCity;
        if (this.objCliente.cdCity != this.f.ciudades.value) {
            ciudad = this.f.ciudades.value;
        }
        //console.log("ciudad: " + ciudad);

        this.listasService.editarCliente({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdclient: this.objCliente.cdClient, name: nomEmpresa, nit: nitEmpresa, pbx: numTelefono, phone: numTelefono, mobile: celular, email: correoElec,
            address: direccion, mailAddress: dirCorres, web: sitioWeb, courtNotice: correoElecNotJudicial, city: ciudad, codClient: this.objCliente.txCodClient, updateUser: this.dni
        })
            .subscribe(data => {
                // this.objCliente = data;
                this.createRequestForm.controls['direccioncorrespondencia'].enable();
                console.log("Actualización del cliente.");
                this.actualizarActividadesIndustriales();
                this.actualizarContacto();
                this.actualizarRepresentante();
                this.crearSolicitud();
            });
    }

    actualizarActividadesIndustriales(): void {
        // Primero se borran las actividades industriales del cliente.
        this.eliminarActividadesIndustriales(this.objCliente.cdClient);
    }

    eliminarActividadesIndustriales(idclient: string): void {
        this.listasService.borrarActividadesIndustrialesPorCliente({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdclient: idclient
        }).subscribe(data => {
            // Aquí termina la ejecución de eliminación de actividades industriales.
            // Luego se crean las nuevas actividades industriales seleccionadas.
            for (let actIndustrial of this.listaActividadesIndustriales) {
                if (actIndustrial.check) {
                    this.crearActividadIndustrial(this.objCliente.cdClient, actIndustrial.cdIndustrialActivity);
                }
            }
        });
    }

    actualizarContacto(): void {
        let cargo, nombre, apellido, direccion, telefono, correo: any;

        cargo = this.objContacto.txPosition;
        if (cargo != this.f.cargocontacto.value) {
            cargo = this.f.cargocontacto.value;
        }

        nombre = this.objContacto.txFirstName;
        if (nombre != this.f.nombrescontacto.value) {
            nombre = this.f.nombrescontacto.value;
        }

        apellido = this.objContacto.txLastName;
        if (apellido != this.f.apellidoscontacto.value) {
            apellido = this.f.apellidoscontacto.value;
        }

        direccion = this.objContacto.txAddress;
        if (direccion != this.f.direccioncontacto.value) {
            direccion = this.f.direccioncontacto.value;
        }

        telefono = this.objContacto.txMobile;
        if (telefono != this.f.telefonocontacto.value) {
            telefono = this.f.telefonocontacto.value;
        }

        correo = this.objContacto.txEmail;
        if (correo != this.f.emailcorpcontacto.value) {
            correo = this.f.emailcorpcontacto.value;
        }

        // Se llama la capacidad que crea un contacto.
        this.listasService.editarPersona({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdperson: this.objContacto.cdPerson, cdClient: this.objContacto.cdClient, position: cargo, firstName: nombre, lastName: apellido, address: direccion,
            mobile: telefono, email: correo, contactType: this.objContacto.cdContactType, updateUser: this.dni
        })
            .subscribe(data => {
                this.objContacto = data;
                console.log("Actualización del contacto.");
            });
    }

    actualizarRepresentante(): void {
        let nombres, apellidos, cargo, direccion, email, telefono: any;

        if (this.mismoContacto) {
            nombres = this.objContacto.txFirstName;
            apellidos = this.objContacto.txLastName;
            direccion = this.objContacto.txAddress;
            email = this.objContacto.txEmail;
            telefono = this.objContacto.txMobile;
        } else {
            nombres = this.objRepresentante.txFirstName;
            if (nombres != this.f.nombresrepresentante.value) {
                nombres = this.f.nombresrepresentante.value;
            }

            apellidos = this.objRepresentante.txLastName;
            if (apellidos != this.f.apellidosrepresentante.value) {
                apellidos = this.f.apellidosrepresentante.value;
            }

            direccion = this.objRepresentante.txAddress;
            if (direccion != this.f.direccionrepresentante.value) {
                direccion = this.f.direccionrepresentante.value;
            }

            email = this.objRepresentante.txEmail;
            if (email != this.f.emailcorprepresentante.value) {
                email = this.f.emailcorprepresentante.value;
            }

            telefono = this.objContacto.txMobile;
            if (telefono != this.f.telefonorepresentante.value) {
                telefono = this.f.telefonorepresentante.value;
            }
        }
        cargo = "Representante Legal";

        console.log("this.f.apellidosrepresentante.value:" + this.f.apellidosrepresentante.value);

        // Se llama la capacidad que crea un representante.
        this.listasService.editarPersona({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdperson: this.objRepresentante.cdPerson, cdClient: this.objCliente.cdClient, position: cargo, firstName: nombres, lastName: apellidos,
            address: direccion, mobile: telefono, email: email, contactType: this.objRepresentante.cdContactType, updateUser: this.dni
        })
            .subscribe(data => {
                this.objContacto = data;
                console.log("Actualización del representante.");
                this.createRequestForm.controls['nombresrepresentante'].enable();
                this.createRequestForm.controls['apellidosrepresentante'].enable();
                this.createRequestForm.controls['direccionrepresentante'].enable();
                this.createRequestForm.controls['emailcorprepresentante'].enable();
                this.createRequestForm.controls['telefonorepresentante'].enable();
            });
    }

    public buscarTipoCafe(cdCoffeeType: number) {
        try {
            return this.listaTiposCafe.filter(q => q.cdCoffeeType == cdCoffeeType)[0];
        } catch (error) {
            return;
        }
    }
}