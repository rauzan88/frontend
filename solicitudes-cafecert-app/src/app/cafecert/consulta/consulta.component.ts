
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs/operators';


@Component({ templateUrl: 'consulta.component.html' })
export class ConsultaComponent implements OnInit {
    viewRequestForm: FormGroup;
    role: any;
    dni: any;
    sessionid: any;
    listaPaises: any;
    listaTiposCertificaciones: Array<{ cdCertificationType: string, txDescription: string, check: boolean }> = [];
    listaTiposCert: Array<{ cdCertificationType: string, txDescription: string, check: boolean }> = [];
    listaProgramas: Array<{ id: string, text: string, check: boolean }> = [];
    listaProgramasDOR: Array<any> = [];
    listaActividadesIndustriales: Array<{ txNameActivity: string, txDesActivity: string, txActive: string, cdIndustrialActivity: string, check: boolean }> = [];
    listaActividadesIndustrialesCliente: Array<{ cdClientActivity: string, cdClient: string, cdIndustrialActivity: string }> = [];
    listaPaisesCliente: any;
    listaDepartamentos: any;
    listaCiudades: any;
    listaRespuestaMismaDir: Array<{ id: string, text: string, check: boolean }> = [];
    listaRespuestaMismoContacto: Array<{ id: string, text: string, check: boolean }> = [];
    listaTiposCafe: any;
    listaMarcas: Array<{ txName: string, txReference: string, cdCoffeeType: number, txDescription: string }> = [];
    isCertificationCodeVisible: boolean;
    objSolicitud: any;
    objCliente: any;
    objContacto: any;
    objRepresentante: any;
    isClientVisible: boolean;
    isProgramaDor: boolean;

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
    }

    ngOnInit() {
        this.viewRequestForm = this.formBuilder.group({
            codigosolicitud: [{ value: '', disabled: true }],
            itemPaises: [{ value: '', disabled: true }],
            paises: [{ value: '', disabled: true }],
            departamentos: [{ value: '', disabled: true }],
            ciudades: [{ value: '', disabled: true }],
            codigocertificado: [{ value: '', disabled: true }],
            rbtipocertificacion: [{ value: '', disabled: true }],
            fechasolicitud: [{ value: '', disabled: true }],
            rbtipoprograma: [{ value: '', disabled: true }],
            programador: [{ value: '', disabled: true }],
            nitcliente: [{ value: '', disabled: true }],
            nombreempresa: [{ value: '', disabled: true }],
            cbactividadindustrial: [{ value: '', disabled: true }],
            prefijo: [{ value: '', disabled: true }],
            indicativo: [{ value: '', disabled: true }],
            numerofijo: [{ value: '', disabled: true }],
            celular: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            direccionempresa: [{ value: '', disabled: true }],
            emailnotificacionjudicial: [{ value: '', disabled: true }],
            website: [{ value: '', disabled: true }],
            preguntadireccion: [{ value: '', disabled: true }],
            direccioncorrespondencia: [{ value: '', disabled: true }],
            nombrescontacto: [{ value: '', disabled: true }],
            apellidoscontacto: [{ value: '', disabled: true }],
            direccioncontacto: [{ value: '', disabled: true }],
            cargocontacto: [{ value: '', disabled: true }],
            emailcorpcontacto: [{ value: '', disabled: true }],
            telefonocontacto: [{ value: '', disabled: true }],
            nombresrepresentante: [{ value: '', disabled: true }],
            apellidosrepresentante: [{ value: '', disabled: true }],
            direccionrepresentante: [{ value: '', disabled: true }],
            emailcorprepresentante: [{ value: '', disabled: true }],
            telefonorepresentante: [{ value: '', disabled: true }],
            tiposcafe: [{ value: '', disabled: true }],
            referencia: [{ value: '', disabled: true }],
            nombremarca: [{ value: '', disabled: true }],
            preguntamismocontacto: [{ value: '', disabled: true }],
            sesioncontrolesrepresentante: [{ value: '', disabled: true }],
            adjuntarcorreo: [{ value: '', disabled: true }],
            adjuntarsol: [{ value: '', disabled: true }],
            adjuntarcamara: [{ value: '', disabled: true }],
            numfactura: [{ value: '', disabled: true }],
            fechafactura: [{ value: '', disabled: true }],
            fechaenviocorreo: [{ value: '', disabled: true }],
            fechafirmacuerdo: [{ value: '', disabled: true }],
            fechacartacompromiso: [{ value: '', disabled: true }],
            regtrilladora: [{ value: '', disabled: true }],
            regtostadora: [{ value: '', disabled: true }],
            regsolubilizador: [{ value: '', disabled: true }],
            regprodextracto: [{ value: '', disabled: true }]
        });

        this.validarSesion();
    }

    get f() { return this.viewRequestForm.controls; }

    public validarSesion(): void {
        this.sessionid = JSON.parse(localStorage.getItem("sessionid"));

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
                this.viewRequestForm.get('itemPaises').setValue(element.cdCountry);
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
    }

    cargarControlesCliente(cliente: any): void {
        let mismaDireccion: boolean;

        this.viewRequestForm.controls['nitcliente'].setValue(cliente.txNit);
        this.viewRequestForm.controls['nombreempresa'].setValue(cliente.txName);
        this.viewRequestForm.controls['direccionempresa'].setValue(cliente.txAddress);

        mismaDireccion = cliente.txAddress.toString() === cliente.txMailAddress.toString();
        this.listaRespuestaMismaDir.push({ id: "1", text: "Si", check: mismaDireccion });
        this.listaRespuestaMismaDir.push({ id: "2", text: "No", check: !mismaDireccion });

        if (mismaDireccion) {
            this.viewRequestForm.controls['direccioncorrespondencia'].disable();
        }
        this.viewRequestForm.controls['direccioncorrespondencia'].setValue(cliente.txMailAddress);
        this.viewRequestForm.controls['numerofijo'].setValue(cliente.txPhone);
        this.viewRequestForm.controls['celular'].setValue(cliente.txMobile);
        this.viewRequestForm.controls['email'].setValue(cliente.txEmail);
        this.viewRequestForm.controls['emailnotificacionjudicial'].setValue(cliente.txCourtNotice);
        this.viewRequestForm.controls['website'].setValue(cliente.txWeb);
        this.viewRequestForm.controls['paises'].setValue(cliente.cdCountry);
        this.viewRequestForm.controls['departamentos'].setValue(cliente.cdState);
        this.viewRequestForm.controls['ciudades'].setValue(cliente.cdCity);
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
                listaActividadesIndustrialesAux2.push({ txNameActivity: element.txNameActivity, txDesActivity: element.txDesActivity, txActive: element.txActive, cdIndustrialActivity: element.cdIndustrialActivity, check: false });
            }
        }
        this.listaActividadesIndustriales = listaActividadesIndustrialesAux1.concat(listaActividadesIndustrialesAux2);
    }

    consultarActividadesIndustrialesPorCliente(cdclient: string): void {
        this.listasService.consultarActividadesIndustrialesPorCliente({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdclient: this.objCliente.cdClient })
            .subscribe(data => {
                this.listaActividadesIndustrialesCliente = data;

                this.seleccionarActividadesIndustriales(cdclient);
            });
    }

    consultarInfoContacto(cdclient: any): void {
        this.objContacto = JSON.parse('{}');

        // Aquí se carga la infromación del contacto.
        this.listasService.consultarContactoPorCliente({ rol: this.role, sesionid: this.sessionid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, cdClient: cdclient })
            .subscribe(data => {
                this.objContacto = data;

                this.cargarControlesContacto(this.objContacto);
            });
    }

    cargarControlesContacto(contacto: any): void {
        this.viewRequestForm.controls['nombrescontacto'].setValue(contacto.txFirstName);
        this.viewRequestForm.controls['apellidoscontacto'].setValue(contacto.txLastName);
        this.viewRequestForm.controls['direccioncontacto'].setValue(contacto.txAddress);
        this.viewRequestForm.controls['cargocontacto'].setValue(contacto.txPosition);
        this.viewRequestForm.controls['emailcorpcontacto'].setValue(contacto.txEmail);
        this.viewRequestForm.controls['telefonocontacto'].setValue(contacto.txMobile);
    }

    consultarInfoRepresentante(cdclient: any): void {
        this.objContacto = JSON.parse('{}');

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
                        this.viewRequestForm.controls['nombresrepresentante'].disable();
                        this.viewRequestForm.controls['apellidosrepresentante'].disable();
                        this.viewRequestForm.controls['direccionrepresentante'].disable();
                        this.viewRequestForm.controls['emailcorprepresentante'].disable();
                        this.viewRequestForm.controls['telefonorepresentante'].disable();
                    }
                    this.listaRespuestaMismoContacto = [];
                    this.listaRespuestaMismoContacto.push({ id: "1", text: "Si", check: mismoContacto });
                    this.listaRespuestaMismoContacto.push({ id: "2", text: "No", check: !mismoContacto });
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

        this.viewRequestForm.controls['nombresrepresentante'].setValue(representante.txFirstName);
        this.viewRequestForm.controls['apellidosrepresentante'].setValue(representante.txLastName);
        this.viewRequestForm.controls['direccionrepresentante'].setValue(representante.txAddress);
        this.viewRequestForm.controls['emailcorprepresentante'].setValue(representante.txEmail);
        this.viewRequestForm.controls['telefonorepresentante'].setValue(representante.txMobile);
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

    changeDisable(): void {
        this.inicializarControlesCliente();
        this.inicialiarControlesMarcas();
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
        let cdCity = this.viewRequestForm.get('ciudades').value;
        let city = this.listaCiudades.filter(q => q.cdCity == cdCity)[0];
        if (typeof city != 'undefined') {
            this.f.indicativo.setValue(city.txAreaCode);
        } else {
            this.f.indicativo.setValue('');
        }
    }

    private setPrefijo() {
        let cdCountry = this.viewRequestForm.get('paises').value;
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

    public goBackRequestList() {
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    private convertDate(date: Date): string {
        let dp = new DatePipe("en-US");
        let format = 'yyyy-MM-dd'; // YYYY-MM-DD
        let dtr = dp.transform(date, format);
        return dtr;
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

    private buscarTipoCafe(cdCoffeeType: number) {
        try {
            return this.listaTiposCafe.filter(q => q.cdCoffeeType == cdCoffeeType)[0];
        } catch (error) {
            return;
        }
    }
}