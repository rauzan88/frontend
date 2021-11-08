
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs/operators';


@Component({ templateUrl: 'editarsolicitud.component.html' })
export class EditarSolicitudComponent implements OnInit {
    editRequestForm: FormGroup;
    role: any;
    dni: any;
    sessionid: any;
    listaPaises: any;
    seletedCountry: any;
    listaTiposCertificaciones: Array<{ cdCertificationType: string, txDescription: string, check: boolean }> = [];
    listaTiposCert: Array<{ cdCertificationType: string, txDescription: string, check: boolean }> = [];
    listaProgramas: Array<{ id: string, text: string, check: boolean }> = [];
    listaProgramasDOR: Array<any> = [];
    listaActividadesIndustriales: Array<{ txNameActivity: string, txDesActivity: string, txActive: string, cdIndustrialActivity: string, check: boolean }> = [];
    listaActividadesIndustrialesCliente: Array<{ cdClientActivity: string, cdClient: string, cdIndustrialActivity: string }> = [];
    listaPaisesCliente: any;
    seletedClientCountry: any;
    listaDepartamentos: any;
    seletedClientState: any;
    listaCiudades: any;
    seletedCity: any;
    listaRespuestaMismaDir: Array<{ id: string, text: string, check: boolean }> = [];
    listaRespuestaMismoContacto: Array<{ id: string, text: string, check: boolean }> = [];
    listaTiposCafe: any;
    listaMarcas: Array<{ txName: string, txReference: string, cdCoffeeType: number, txDescription: string }> = [];
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
    existeContacto: boolean;
    existeRepresentante: boolean;
    direccionesIguales: boolean;
    mismoContacto: boolean;
    textoBotonBuscar: string;
    consecutivo: string;
    contAISeleccionadas: number;
    mostrarMsgValidacion: boolean;
    mostrarMsgValidacionMarcas: boolean;
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

        this.seletedClientCountry = { cdCountry: "", txNameCountry: "" };
        this.seletedClientState = { cdState: "", txNameState: "", cdCountry: "" };
        this.seletedCity = { cdCity: "", txNameCity: "", cdState: "" };
    }

    ngOnInit() {
        this.editRequestForm = this.formBuilder.group({
            codigosolicitud: [{ value: '', disabled: true }, Validators.required],
            itemPaises: [{ value: '' }, Validators.required],
            paises: ['', Validators.nullValidator],
            departamentos: ['', Validators.nullValidator],
            ciudades: ['', Validators.nullValidator],
            codigocertificado: ['', Validators.nullValidator],
            rbtipocertificacion: [{ value: '' }, Validators.nullValidator],
            fechasolicitud: [{ value: '' }, Validators.nullValidator],
            rbtipoprograma: [{ value: '' }, Validators.nullValidator],
            programador: ['', Validators.nullValidator],
            nitcliente: [{ value: '', disabled: true }, Validators.nullValidator],
            nombreempresa: ['', Validators.nullValidator],
            cbactividadindustrial: ['', Validators.required],
            prefijo: [{ value: '', disabled: true }, Validators.nullValidator],
            indicativo: [{ value: '', disabled: true }, Validators.nullValidator],
            numerofijo: ['', Validators.nullValidator],
            celular: ['', Validators.nullValidator],
            email: ['', Validators.nullValidator],
            direccionempresa: ['', Validators.nullValidator],
            emailnotificacionjudicial: ['', Validators.nullValidator],
            website: ['', Validators.nullValidator],
            preguntadireccion: ['', Validators.nullValidator],
            direccioncorrespondencia: ['', Validators.nullValidator],
            nombrescontacto: ['', Validators.nullValidator],
            apellidoscontacto: ['', Validators.nullValidator],
            direccioncontacto: ['', Validators.nullValidator],
            cargocontacto: ['', Validators.nullValidator],
            emailcorpcontacto: ['', Validators.nullValidator],
            telefonocontacto: ['', Validators.nullValidator],
            nombresrepresentante: ['', Validators.nullValidator],
            apellidosrepresentante: ['', Validators.nullValidator],
            direccionrepresentante: ['', Validators.nullValidator],
            emailcorprepresentante: ['', Validators.nullValidator],
            telefonorepresentante: ['', Validators.nullValidator],
            tiposcafe: ['', Validators.nullValidator],
            referencia: ['', Validators.nullValidator],
            nombremarca: ['', Validators.nullValidator],
            preguntamismocontacto: ['', Validators.nullValidator],
            sesioncontrolesrepresentante: ['', Validators.nullValidator],
            adjuntarcorreo: [''],
            adjuntarsol: [''],
            adjuntarcamara: [''],
            numfactura: ['', Validators.nullValidator],
            fechafactura: ['', Validators.nullValidator],
            fechaenviocorreo: ['', Validators.nullValidator],
            fechafirmacuerdo: ['', Validators.nullValidator],
            fechacartacompromiso: ['', Validators.nullValidator],
            regtrilladora: [{value: '', disabled: true}, Validators.nullValidator],
            regtostadora: [{value: '', disabled: true}, Validators.nullValidator],
            regsolubilizador: [{value: '', disabled: true}, Validators.nullValidator],
            regprodextracto: [{value: '', disabled: true}, Validators.nullValidator],
            modificarsolicitud: ['', Validators.required]
        });

        this.validarSesion();
    }

    onSubmit() {
        this.alertService.clear();
    }

    get f() { return this.editRequestForm.controls; }

    public validarSesion(): void {
        this.sessionid = JSON.parse(localStorage.getItem("sessionid"));

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
                } else {
                    if (data['expired'] === `-1`) {
                        this.alertService.error('Sesión ha expirado, debe volver a loguearse en el sistema.');
                    } else {
                        if (data['role'] === null) {
                            this.alertService.error('No existe rol de usuario registrado en el sistema.');
                        } else {
                            this.cargarListasFormulario(data['role']);
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }

    cargarListasFormulario(role: any): void {
        this.objSolicitud = JSON.parse(localStorage.getItem("request"));

        this.f.fechasolicitud.setValue(this.convertDate(new Date(this.objSolicitud.dtRequest)));
        this.f.rbtipocertificacion.setValue(this.objSolicitud.cdCertificationType);
        this.f.codigocertificado.setValue(this.objSolicitud.txCodCertificate);
        this.f.codigosolicitud.setValue(this.objSolicitud.txCodRequest);

        this.listasService.consultarTiposCertificaciones({ rol: role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                this.listaTiposCertificaciones = data;

                this.cargarDatosSolicitud();
            });

        this.listasService.consultarTodosPaises({ rol: role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                this.listaPaises = data;

                this.seleccionarPaisCertificacion(this.objSolicitud.cdCountry);
            });

        this.cargarPorDefectoListas();
    }

    cargarPorDefectoListas(): void {
        this.listasService.consultarTodasRegiones({}).subscribe(
            (data) => {
                this.listaProgramasDOR = data;
                let request = {
                    cdRequest: this.objSolicitud.cdRequest
                };
                this.listasService.listaSolicitudRegionPorCdSolicitud(request).subscribe(
                    (requestRegions) => {
                        this.listaProgramasDOR.forEach((programador) => {
                            let requestRegionExist = requestRegions.filter(x => x.cdRegion == programador.cdRegion);
                            if (requestRegionExist.length > 0) {
                                programador.check = true;
                            }
                        });
                    }
                );
            }, (error) => {

            }
        );

        this.objRepresentante = JSON.parse('[{"txFirstName":"", "txLastName":"", "txAddress":"", "txEmail":"", "txMobile":""}]') || [];
    }

    validateProgramDor() {
        return this.listaProgramasDOR.filter(element => element.check).length == 0;
    }

    validateProgramType() {
        return this.listaProgramas.filter(element => element.check).length == 0;
    }

    cargarDatosSolicitud(): void {
        // seleccionar la opción del Tipo de Solicitud.
        this.seleccionarTipoCertificacion(this.objSolicitud.cdCertificationType);

        // Seleccionar la opción de Programa de Certificación.
        this.seleccionarProgramasCertificacion(this.objSolicitud);

        this.isCertificationCodeVisible = this.objSolicitud.txCodCertificate != null;

        // Cargar la información del cliente.
        this.consultarInfoCliente(this.objSolicitud.cdClient);

        // Cargar datos de Facturación.
        this.cargarControlesFactura(this.objSolicitud);

        // Cargar datos de Información Adicional.
        this.cargarControlesInfoAdicional(this.objSolicitud);

        // Cargar datos de Registro FNC.
        this.cargarControlesRegistroFNC(this.objSolicitud);
    }

    seleccionarPaisCertificacion(cdcountry: any): void {
        // Se muestra el país de la certificación.
        this.listaPaises.forEach(element => {
            if (element.cdCountry.toString() === cdcountry.toString()) {
                this.seletedCountry = element;
                this.editRequestForm.get('itemPaises').setValue(element.cdCountry);
            }
        });
    }

    seleccionarTipoCertificacion(cdcertificationtype: string): void {
        let seleccionado: boolean;
        for (let index = 0; index < this.listaTiposCertificaciones.length; index++) {
            const element = this.listaTiposCertificaciones[index];

            if (cdcertificationtype.toString() === element.cdCertificationType.toString()) {
                seleccionado = true;
            } else {
                seleccionado = false;
            }

            this.listaTiposCert.push({ cdCertificationType: element.cdCertificationType, txDescription: element.txDescription, check: seleccionado });
        }
    }

    seleccionarProgramasCertificacion(solicitud: any): void {
        let dopckeck, dorckeck, igpcheck: boolean;

        if (solicitud.txDo === "S") {
            dopckeck = true;
        }
        if (solicitud.txIgp === "S") {
            igpcheck = true;
        }
        if (solicitud.txDor === "S") {
            dorckeck = true;
        }

        this.listaProgramas.push({ id: "1", text: "DO Denominación de Origen Café de Colombia", check: dopckeck });
        this.listaProgramas.push({ id: "2", text: "IGP Indicación Geográfica Protegida Café", check: igpcheck });
        this.listaProgramas.push({ id: "3", text: "DOR Denominación de Origen Café Regional", check: dorckeck });

        this.loadProgramType();
    }

    consultarInfoCliente(cdclient: any): void {
        this.isClientVisible = true;

        this.listasService.consultarClientePorId({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, id: cdclient })
            .subscribe(data => {
                this.objCliente = data;
                this.changeDisable();
                this.consultarPersonasPorCliente();
            });
        this.textoBotonBuscar = "Limpiar";
    }

    cargarControlesCliente(cliente: any): void {
        let mismaDireccion: boolean;

        this.editRequestForm.controls['nitcliente'].setValue(cliente.txNit);
        this.editRequestForm.controls['nombreempresa'].setValue(cliente.txName);
        this.editRequestForm.controls['direccionempresa'].setValue(cliente.txAddress);

        mismaDireccion = cliente.txAddress.toString() === cliente.txMailAddress.toString();
        this.listaRespuestaMismaDir.push({ id: "1", text: "Si", check: mismaDireccion });
        this.listaRespuestaMismaDir.push({ id: "2", text: "No", check: !mismaDireccion });
        this.f.preguntadireccion.setValue(mismaDireccion ? 'Si' : 'No');

        if (mismaDireccion) {
            this.editRequestForm.controls['direccioncorrespondencia'].disable();
        }
        this.editRequestForm.controls['direccioncorrespondencia'].setValue(cliente.txMailAddress);
        this.editRequestForm.controls['numerofijo'].setValue(cliente.txPhone);
        this.editRequestForm.controls['celular'].setValue(cliente.txMobile);
        this.editRequestForm.controls['email'].setValue(cliente.txEmail);
        this.editRequestForm.controls['emailnotificacionjudicial'].setValue(cliente.txCourtNotice);
        this.editRequestForm.controls['website'].setValue(cliente.txWeb);
        this.editRequestForm.controls['paises'].setValue(cliente.cdCountry);
        this.editRequestForm.controls['departamentos'].setValue(cliente.cdState);
        this.editRequestForm.controls['ciudades'].setValue(cliente.cdCity);
    }

    seleccionarActividadesIndustriales(cdcliente: string): void {
        let listaActividadesIndustrialesAux1: Array<{ txNameActivity: string, txDesActivity: string, txActive: string, cdIndustrialActivity: string, check: boolean }> = [];
        let listaActividadesIndustrialesAux2: Array<{ txNameActivity: string, txDesActivity: string, txActive: string, cdIndustrialActivity: string, check: boolean }> = [];

        for (let ActIndSel of this.listaActividadesIndustrialesCliente) {
            this.listaActividadesIndustriales.forEach(element => {
                if (ActIndSel.cdIndustrialActivity === element.cdIndustrialActivity) {
                    listaActividadesIndustrialesAux1.push({ txNameActivity: element.txNameActivity, txDesActivity: element.txDesActivity, txActive: element.txActive, cdIndustrialActivity: element.cdIndustrialActivity, check: true });
                }
            });
        }

        for (let element of this.listaActividadesIndustriales) {
            let actIndAux = listaActividadesIndustrialesAux1.find(x => x.cdIndustrialActivity === element.cdIndustrialActivity);

            if (actIndAux === undefined) {
                // No se hace nada si ya está en la lista.
                listaActividadesIndustrialesAux2.push({ txNameActivity: element.txNameActivity, txDesActivity: element.txDesActivity, txActive: element.txActive, cdIndustrialActivity: element.cdIndustrialActivity, check: false });
            }
        }

        this.listaActividadesIndustriales = listaActividadesIndustrialesAux1.concat(listaActividadesIndustrialesAux2);

        this.cambiarHabilitacionCamposRegistroFNC();
    }

    public contActIndSeleccionadas(): number {
        let contador: number;

        console.log("Contabilizar las Actividades Industriales seleccionadas.");
        this.listaActividadesIndustriales.forEach(element => {
            if (element.check) {
                console.log("Esta Actividad Industrial SI está seleccionada.");
                contador = contador + 1;
            }
        });

        return contador;
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

    consultarInfoContacto(cdclient: any): void {
        this.objContacto = JSON.parse('{}');
        this.existeContacto = false;

        // Aquí se carga la infromación del contacto.
        this.listasService.consultarContactoPorCliente({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdClient: cdclient })
            .subscribe(data => {
                this.objContacto = data;

                this.cargarControlesContacto(this.objContacto);
            });
    }

    cargarControlesContacto(contacto: any): void {
        this.editRequestForm.controls['nombrescontacto'].setValue(contacto.txFirstName);
        this.editRequestForm.controls['apellidoscontacto'].setValue(contacto.txLastName);
        this.editRequestForm.controls['direccioncontacto'].setValue(contacto.txAddress);
        this.editRequestForm.controls['cargocontacto'].setValue(contacto.txPosition);
        this.editRequestForm.controls['emailcorpcontacto'].setValue(contacto.txEmail);
        this.editRequestForm.controls['telefonocontacto'].setValue(contacto.txMobile);
    }

    consultarInfoRepresentante(cdclient: any): void {
        this.objContacto = JSON.parse('{}');
        this.existeRepresentante = false;

        // Aquí se carga la información del representante.
        this.listasService.consultarRepresentanteCliente({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdClient: cdclient })
            .subscribe(data => {
                this.objRepresentante = data;

                this.cargarControlesRepresentante(this.objRepresentante);
            });
    }

    consultarPersonasPorCliente() {
        this.objContacto = {};
        this.objRepresentante = {};
        this.listasService.consultarPersonasPorCliente(this.objCliente.cdClient).subscribe(
            (data) => {
                if (data.length > 0) {
                    data.forEach((person: any) => {
                        if (person.cdContactType == 1) {//Representante legal
                            this.objRepresentante = person;
                            this.cargarControlesRepresentante(this.objRepresentante);
                        } else if (person.cdContactType == 2) {//Contacto Principal
                            this.objContacto = person;
                            this.cargarControlesContacto(this.objContacto);
                        }
                    });
                    let mismoContacto: boolean = this.validacionInfoContactos(this.objRepresentante);
                    if (mismoContacto) {
                        this.editRequestForm.controls['nombresrepresentante'].disable();
                        this.editRequestForm.controls['apellidosrepresentante'].disable();
                        this.editRequestForm.controls['direccionrepresentante'].disable();
                        this.editRequestForm.controls['emailcorprepresentante'].disable();
                        this.editRequestForm.controls['telefonorepresentante'].disable();
                    }
                    this.listaRespuestaMismoContacto = [];
                    this.listaRespuestaMismoContacto.push({ id: "1", text: "Si", check: mismoContacto });
                    this.listaRespuestaMismoContacto.push({ id: "2", text: "No", check: !mismoContacto });
                    this.f.preguntamismocontacto.setValue(mismoContacto ? 'Si' : 'No');
                }
            }
        );
    }

    consultarInfoMarcas(cdrequest: string): void {
        this.listasService.consultarMarcas({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdrequest: cdrequest })
            .subscribe(data => {
                this.listaMarcas = data;
                this.listaMarcas.forEach(marca => {
                    marca.txDescription = this.buscarTipoCafe(marca.cdCoffeeType).txDescription
                });
            });
    }

    cargarControlesRepresentante(representante: any): void {
        let mismoContacto: boolean = this.validacionInfoContactos(representante);
        this.listaRespuestaMismoContacto.push({ id: "1", text: "Si", check: mismoContacto });
        this.listaRespuestaMismoContacto.push({ id: "2", text: "No", check: !mismoContacto });

        this.editRequestForm.controls['nombresrepresentante'].setValue(representante.txFirstName);
        this.editRequestForm.controls['apellidosrepresentante'].setValue(representante.txLastName);
        this.editRequestForm.controls['direccionrepresentante'].setValue(representante.txAddress);
        this.editRequestForm.controls['emailcorprepresentante'].setValue(representante.txEmail);
        this.editRequestForm.controls['telefonorepresentante'].setValue(representante.txMobile);
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
            } else {
                result = false;
            }
        } catch (error) {
            result = false;
        }

        return result;
    }

    cargarControlesFactura(solicitud: any): void {
        this.f.numfactura.setValue(solicitud.nuInvoice);
        let dtInvoice = solicitud.dtInvoice != null ? new Date(solicitud.dtInvoice) : null;
        this.f.fechafactura.setValue(this.convertDate(dtInvoice));
    }

    cargarControlesInfoAdicional(solicitud: any): void {
        let dtEmailIn = solicitud.dtEmailIn != null ? new Date(solicitud.dtEmailIn) : null;
        this.f.fechaenviocorreo.setValue(this.convertDate(dtEmailIn));
        let dtSignAgree = solicitud.dtSignAgree != null ? new Date(solicitud.dtSignAgree) : null;
        this.f.fechafirmacuerdo.setValue(this.convertDate(dtSignAgree));
        let dtCommitAtter = solicitud.dtCommitAtter != null ? new Date(solicitud.dtCommitAtter) : null;
        this.f.fechacartacompromiso.setValue(this.convertDate(dtCommitAtter));
    }

    cargarControlesRegistroFNC(solicitud: any): void {
        this.f.regtrilladora.setValue(solicitud.nuRegThresher);
        this.f.regtostadora.setValue(solicitud.nuRegToaster);
        this.f.regsolubilizador.setValue(solicitud.nuRegSolubilizer);
        this.f.regprodextracto.setValue(solicitud.nuRegExtract);
    }

    cambiarHabilitacionCamposRegistroFNC(): void {
        for (let element of this.listaActividadesIndustriales) {
            if (element.check) {
                if (element.txNameActivity.toString() === "Trilla") {
                    this.editRequestForm.controls['regtrilladora'].enable();
                }
                if (element.txNameActivity.toString() === "Torrefacción") {
                    this.editRequestForm.controls['regtostadora'].enable();
                }
                if (element.txNameActivity.toString() === "Producción de descafeinados") {
                    this.editRequestForm.controls['regsolubilizador'].enable();
                }
                if (element.txNameActivity.toString() === "Producción de solubles extractos") {
                    this.editRequestForm.controls['regprodextracto'].enable();
                }
            }
        }
    }

    changeDisable(): void {
        this.inicializarControlesCliente();
        this.inicialiarControlesMarcas();
    }

    public onClickSavePerformed() {
        this.alertService.clear();
        this.actualizarSolicitud();
    }

    mostrarMensajeConfirmacion(): void {
        let data = { message: 'Modificación Exitosa', content: 'Se ha modificado la solicitud ' + this.objSolicitud.txCodRequest, result: '' };
        let dialogRef = this.alertService.openDialog(data);
        if (this.alertService.type == '3') {
            this.alertService.value = this.objSolicitud.txCodRequest;
        }
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.openPanel = true;
                window.scrollTo(0, 0);
            }
        });

        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    actualizarSolicitud(): void {
        let programaDO: any = "N";
        let programaIGP: any = "N";
        let programaDOR: any = "N";
        let programaCertificacion: string;

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

        if (programaDO == "S") {
            programaCertificacion = "DO";
        } else if (programaIGP == "S") {
            programaCertificacion = "IGP";
        } else if (programaDOR == "S") {
            programaCertificacion = "DOR";
        }

        let codRequest = this.objSolicitud.txCodRequest;
        let lastProgram = codRequest.split('-')[0];
        this.objSolicitud.txCodRequest = codRequest.replace(lastProgram, programaCertificacion);
        this.f.codigosolicitud.setValue(codRequest);
        console.log("Programa DOR: " + programaDOR);
        console.log(this.f.codigocertificado.value);
        this.listasService.editarSolicitud({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdrequest: this.objSolicitud.cdRequest, txCodRequest: this.objSolicitud.txCodRequest, sanitaryStd: "S", identifyPrc: "S", declare: "S",
            certificationType: this.f.rbtipocertificacion.value, cdClient: this.objCliente.cdClient, cdCountry: this.f.itemPaises.value,
            creationuser: this.dni, requestdate: this.f.fechasolicitud.value,
            txDo: programaDO, txIgp: programaIGP, txDor: programaDOR, codCertificate: this.f.codigocertificado.value, nuinvoice: this.f.numfactura.value, dtinvoice: this.f.fechafactura.value,
            dtemailin: this.f.fechaenviocorreo.value, dtsignagree: this.f.fechafirmacuerdo.value, dtcommitatter: this.f.fechacartacompromiso.value,
            nuregthresher: this.f.regtrilladora.value, nuregtoaster: this.f.regtostadora.value, nuregsolubilizer: this.f.regsolubilizador.value, nuregextract: this.f.regprodextracto.value,
            updateuser: this.dni, txReasonUpdate: this.f.modificarsolicitud.value
        })
            .subscribe(data => {
                console.log(data);
                if (!((Object.keys(data).length === 0 && data.constructor === Object))){
                    this.actualizarCliente();
                    this.actualizarActividadesIndustriales();
                    this.actualizarContacto();
                    this.actualizarRepresentante();
                    this.actualizarMarcas();
                    this.deleteRequestRegion();
                    this.crearSoportes();
                    // Aquí llega la respuesta de la modificación de la Solicitud.
                    this.mostrarMensajeConfirmacion();
                } else {
                    let data = { message: 'Error', content: 'Ocurrio un error al actualizar la solicitud ' + this.objSolicitud.txCodRequest, result: '' };
                    this.alertService.openDialog(data);
                }
            });
    }

    private deleteRequestRegion() {
        let request = {
            cdRequest: this.objSolicitud.cdRequest
        };

        this.listasService.borrarSolicitudRegionPorCdSolicitud(request).subscribe(
            () => {
                if (this.isProgramaDor) {
                    this.createRequestRegion();
                }
            }
        );
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
            //this.f.adjuntarcorreo.value == '' || this.f.adjuntarsol.value == '' || this.f.adjuntarcamara.value == '' || 
            this.f.modificarsolicitud.value == '' ||
            (this.validateIndustrialActivity()) ||
            (this.isCertificationCodeVisible && this.f.codigocertificado.value == '') ||
            this.validateProgramType() ||
            (this.isProgramaDor && this.validateProgramDor())) {
            return false;
        }
        return true;
    }

    public validateIndustrialActivity() {
        try {
            return this.listaActividadesIndustriales.filter(element => element.check).length == 0;
        } catch (error) {
            return true;
        }
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
        if (this.objCliente.txPhone != (this.f.prefijo.value + this.f.indicativo.value + this.f.numerofijo.value)) {
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

        ciudad = this.objCliente.cdCity;
        if (this.objCliente.cdCity != this.f.ciudades.value) {
            ciudad = this.f.ciudades.value;
        }

        this.listasService.editarCliente({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdclient: this.objCliente.cdClient, name: nomEmpresa, nit: nitEmpresa, pbx: numTelefono, phone: numTelefono, mobile: celular, email: correoElec,
            address: direccion, mailAddress: dirCorres, web: sitioWeb, courtNotice: correoElecNotJudicial, city: ciudad, codClient: this.objCliente.txCodClient, updateUser: this.dni
        })
            .subscribe(data => {
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
        }).subscribe(
            data => {
                // Aquí termina la ejecución de eliminación de actividades industriales.
                // Luego se crean las nuevas actividades industriales seleccionadas.
                for (let actIndustrial of this.listaActividadesIndustriales) {
                    if (actIndustrial.check) {
                        this.crearActividadIndustrial(this.objCliente.cdClient, actIndustrial.cdIndustrialActivity);
                    }
                }
            });
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

        // Se llama la capacidad que crea un representante.
        this.listasService.editarPersona({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdperson: this.objRepresentante.cdPerson, cdClient: this.objCliente.cdClient, position: cargo, firstName: nombres, lastName: apellidos,
            address: direccion, mobile: telefono, email: email, contactType: this.objRepresentante.cdContactType, updateUser: this.dni
        })
            .subscribe(data => {
                this.objContacto = data;
            });
    }

    actualizarMarcas(): void {
        // Se llama la capacidad que elimina las marcas asociadas a la solicitud.
        this.eliminarMarcas(this.objSolicitud.cdRequest);
    }

    crearMarca(nombre: string, referencia: string, cdtipocafe: number): void {
        this.listasService.crearMarca({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            txName: nombre, txReference: referencia, cdCoffeeType: cdtipocafe, cdRequest: this.objSolicitud.cdRequest, creationUser: this.dni
        })
            .subscribe(data => {
                this.objMarca = data;
            });
    }

    eliminarMarcas(cdrequest: string): void {
        this.listasService.borrarMarcas({
            rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`,
            cdRequest: cdrequest
        }).subscribe(data => {
            this.objMarca = data;
            // Se recorren las marcas agregadas a la lista y se crean desde el BE.
            for (let marca of this.listaMarcas) {
                this.crearMarca(marca.txName, marca.txReference, marca.cdCoffeeType);
            }
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
    }

    crearArchivo(file: File, codRequest: string): void {
        this.listasService.crearArchivo(file, "SICERT", codRequest).subscribe(data => {
            if (data['status'] === `Internal Server Error`) {
                this.alertService.error(data['message']);
            } else {
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

    public onChangeCertificationType(event: any): void {
        
        if (this.f.rbtipocertificacion.value == "2" || this.f.rbtipocertificacion.value == "4") {
            this.isCertificationCodeVisible = true;
        } else {
            this.isCertificationCodeVisible = false;
            this.f.codigocertificado.setValue('');
        }
    }

    public onClickAdd(): void {
        if (this.f.nombremarca.value.toString() != "" && this.f.referencia.value.toString() != "" && this.f.tiposcafe.value.toString() != "") {
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
        console.log("Ejecución de evento para Borrar Marca.");
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

    inicializarControlesCliente(): void {
        this.listasService.consultarTodasActividadesIndustriales({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                this.listaActividadesIndustriales = data;

                this.consultarActividadesIndustrialesPorCliente(this.objCliente.cdClient);
            });

        this.cargarControlesCliente(this.objCliente);

        this.buscarPaisesCliente();
        this.buscarDepartamentos(this.objCliente.cdCountry);
        this.buscarCiudades(this.objCliente.cdState);
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
        let cdCity = this.editRequestForm.get('ciudades').value;
        let city = this.listaCiudades.filter(q => q.cdCity == cdCity)[0];
        if (typeof city != 'undefined') {
            this.f.indicativo.setValue(city.txAreaCode);
        } else {
            this.f.indicativo.setValue('');
        }
    }

    private setPrefijo() {
        let cdCountry = this.editRequestForm.get('paises').value;
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
            });
    }

    inicialiarControlesMarcas(): void {
        // Se consultan los Tipos de Café.
        this.listasService.consultarTiposCafe({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}` })
            .subscribe(data => {
                this.listaTiposCafe = data;
                //Cargar datos de las marcas.
                this.consultarInfoMarcas(this.objSolicitud.cdRequest);
            });
    }

    public onChangeQuestionAddres(event): void {
        if (this.f.preguntadireccion.value.toString() === "Si") {
            this.objCliente.txMailAddress = this.f.direccionempresa.value;
            this.direccionesIguales = true;
            this.editRequestForm.controls['direccioncorrespondencia'].disable();
        } else {
            this.objCliente.txMailAddress = "";
            this.direccionesIguales = false;
            this.editRequestForm.controls['direccioncorrespondencia'].enable();
        }
    }

    public onChangeQuestionContact(event): void {
        if (this.f.preguntamismocontacto.value.toString() === "Si") {
            this.llenarControlesRepresentante(true);
            this.changeActiveRepresentant(true);
            this.mismoContacto = true;
        } else {
            this.llenarControlesRepresentante(false);
            this.changeActiveRepresentant(false);
            this.mismoContacto = false;
        }
    }

    llenarControlesRepresentante(llenar: boolean): void {
        if (llenar) {
            this.objRepresentante.txFirstName = this.f.nombrescontacto.value;
            this.objRepresentante.txLastName = this.f.apellidoscontacto.value;
            this.objRepresentante.txAddress = this.f.direccioncontacto.value;
            this.objRepresentante.txEmail = this.f.emailcorpcontacto.value;
            this.objRepresentante.txMobile = this.f.telefonocontacto.value;

            this.editRequestForm.controls['nombresrepresentante'].setValue(this.objRepresentante.txFirstName);
            this.editRequestForm.controls['apellidosrepresentante'].setValue(this.objRepresentante.txLastName);
            this.editRequestForm.controls['direccionrepresentante'].setValue(this.objRepresentante.txAddress);
            this.editRequestForm.controls['emailcorprepresentante'].setValue(this.objRepresentante.txEmail);
            this.editRequestForm.controls['telefonorepresentante'].setValue(this.objRepresentante.txMobile);
        } else {
            this.objRepresentante.txFirstName = "";
            this.objRepresentante.txLastName = "";
            this.objRepresentante.txAddress = "";
            this.objRepresentante.txEmail = "";
            this.objRepresentante.txMobile = "";

            this.editRequestForm.controls['nombresrepresentante'].setValue('');
            this.editRequestForm.controls['apellidosrepresentante'].setValue('');
            this.editRequestForm.controls['direccionrepresentante'].setValue('');
            this.editRequestForm.controls['emailcorprepresentante'].setValue('');
            this.editRequestForm.controls['telefonorepresentante'].setValue('');
        }
    }

    changeActiveRepresentant(disable: boolean): void {
        if (disable) {
            this.editRequestForm.controls['nombresrepresentante'].disable();
            this.editRequestForm.controls['apellidosrepresentante'].disable();
            this.editRequestForm.controls['direccionrepresentante'].disable();
            this.editRequestForm.controls['emailcorprepresentante'].disable();
            this.editRequestForm.controls['telefonorepresentante'].disable();
        } else {
            this.editRequestForm.controls['nombresrepresentante'].enable();
            this.editRequestForm.controls['apellidosrepresentante'].enable();
            this.editRequestForm.controls['direccionrepresentante'].enable();
            this.editRequestForm.controls['emailcorprepresentante'].enable();
            this.editRequestForm.controls['telefonorepresentante'].enable();
        }
    }

    public onChangeIndustryActivity(actIndustrial: any, event): void {
        var target = event.target;
        if (target.checked) {
            actIndustrial.check = true;
            this.contAISeleccionadas = this.contAISeleccionadas + 1;
            if (actIndustrial.txNameActivity.toString() === "Trilla") {
                this.editRequestForm.controls['regtrilladora'].enable();
            } else if (actIndustrial.txNameActivity.toString() === "Torrefacción") {
                this.editRequestForm.controls['regtostadora'].enable();
            } else if (actIndustrial.txNameActivity.toString() === "Producción de descafeinados") {
                this.editRequestForm.controls['regsolubilizador'].enable();
            } else if (actIndustrial.txNameActivity.toString() === "Producción de solubles extractos") {
                this.editRequestForm.controls['regprodextracto'].enable();
            }
        } else {
            actIndustrial.check = false;
            this.contAISeleccionadas = this.contAISeleccionadas - 1;
            if (actIndustrial.txNameActivity.toString() === "Trilla") {
                this.editRequestForm.controls['regtrilladora'].disable();
                this.f.regtrilladora.setValue(null);
            } else if (actIndustrial.txNameActivity.toString() === "Torrefacción") {
                this.editRequestForm.controls['regtostadora'].disable();
                this.f.regtostadora.setValue(null);
            } else if (actIndustrial.txNameActivity.toString() === "Producción de descafeinados") {
                this.editRequestForm.controls['regsolubilizador'].disable();
                this.f.regsolubilizador.setValue(null);
            } else if (actIndustrial.txNameActivity.toString() === "Producción de solubles extractos") {
                this.editRequestForm.controls['regprodextracto'].disable();
                this.f.regprodextracto.setValue(null);
            }
        }
    }

    public onChangeProgramaDOR(programaDOR: any, event): void {
        var target = event.target;

        programaDOR.check = target.checked;
    }

    onChangePanel(isFirstPanel: boolean = false) {
        if (isFirstPanel) {
            this.openPanel = true;
        } else {
            this.openPanel = false;
        }
    }

    public onChangeCountry() {
        let cdCountry = this.editRequestForm.get('paises').value;
        this.setPrefijo();

        this.listaDepartamentos = [];
        this.listaCiudades = [];
        this.f.departamentos.setValue('');
        this.f.ciudades.setValue('');
        this.f.indicativo.setValue('');

        this.buscarDepartamentos(cdCountry);
    }

    public onChangeState() {
        let cdState = this.editRequestForm.get('departamentos').value;
        this.f.ciudades.setValue('');
        this.f.indicativo.setValue('');
        this.buscarCiudades(cdState);
    }

    public onChangeCity() {
        this.setIndicativo();
    }

    public goBackRequestList() {
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    private convertDate(date: Date): string {
        let dp = new DatePipe("en-US");
        let format = 'yyyy-MM-dd'; // YYYY-MM-DD
        let dtr = dp.transform(date, format);
        return dtr;
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

    private loadProgramType() {
        this.listaProgramas.forEach(programa => {
            switch (programa.id) {
                case "1":
                    if (this.objSolicitud.txDo == 'S') {
                        programa.check = true;
                    }
                    break;
                case "2":
                    if (this.objSolicitud.txIgp == 'S') {
                        programa.check = true;
                    }
                    break;
                case "3":
                    if (this.objSolicitud.txDor == 'S') {
                        programa.check = true;
                        this.isProgramaDor = true;
                    }
                    break;
            }
        });
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

    public buscarTipoCafe(cdCoffeeType: number) {
        try {
            return this.listaTiposCafe.filter(q => q.cdCoffeeType == cdCoffeeType)[0];
        } catch (error) {
            return;
        }
    }

}