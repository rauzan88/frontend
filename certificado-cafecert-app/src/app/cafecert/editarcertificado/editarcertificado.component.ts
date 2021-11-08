import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, ListasService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({ templateUrl: 'editarcertificado.component.html' })
export class EditarcertificadoComponent implements OnInit {
    objCertificate: any;
    itemCertificate: any;
    sessionid: any;
    txRole: any;
    txuserdni: any;
    programselected: any;
    certificadoForm: FormGroup;
    listaestados = [];
    estadoselected: any;
    listapresencafe = [];
    listadescricafe = [];
    listaProgramas = [];
    certificaciones = [];
    listaMarcas =[];
    nombreCliente = "No hay cliente en el sistema.";
    cdcliente: any;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private listasService: ListasService,
        private alertService: AlertService,
        private http: HttpClient
    ) {

    }

    // convenience getter for easy access to form fields
    get f() { return this.certificadoForm.controls; }

    ngOnInit() {

        this.cdcliente = JSON.parse(localStorage.getItem('cdClient'));
        this.nombreCliente = JSON.parse(localStorage.getItem('txName'));
        this.sessionid = JSON.parse(localStorage.getItem('idsession'));
        this.objCertificate = JSON.parse(localStorage.getItem("certificate"));
        this.itemCertificate = JSON.parse(localStorage.getItem("itemcertificate"));

        console.log("sesion desde crear ceertificado : " + this.sessionid);
        if (this.sessionid === null) {
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();

        this.certificadoForm = this.formBuilder.group({
            txStatus: ['', Validators.required],
            dtGrantCertificate: ['', Validators.required],
            dtUpdateCertificate: [''],
            dtRetireCertificate: [''],
            dtSupervision: [''],
            txLanguage: ['', Validators.required],
            txEurope: ['', Validators.required],
            txActivityPerformed: ['']
        });

        this.cargarValores();
    }



    actualizarCertificado() {


        if (this.certificadoForm.invalid) {
            this.alertService.error("Proceso guardar certificado no fue realizado, olvido llenar un campo.");
            console.log("Olvido llenar un campo..." + this.certificadoForm.invalid);
            console.log("txStatus: " + this.f.txStatus.value);
            console.log("dtGrantCertificate: " + this.f.dtGrantCertificate.value);
            console.log("dtSupervision: " + this.f.dtSupervision.value);
            console.log("dtUpdateCertificate: " + this.f.dtUpdateCertificate.value);
            console.log("dtRetireCertificate: " + this.f.dtRetireCertificate.value);
            console.log("txLanguage: " + this.f.txLanguage.value);
            console.log("txEurope: " + this.f.txEurope.value);
            console.log("txActivityPerformed: " + this.f.txActivityPerformed.value);
            console.log("cdCertificate: " + this.objCertificate[0].cdCertificate);

        } else {
            console.log("actualizando...");
            console.log("dtGrantCertificate: " +  this.f.dtGrantCertificate.value);
            console.log("dtSupervision: " + this.f.dtSupervision.value);
            console.log("cdCertificate: " + this.itemCertificate.cdCertificate);
            console.log("this.f.txStatus.value: " +  this.f.txStatus.value);
            this.listasService.upCertificate({
                "cdCertificate": this.itemCertificate.cdCertificate,
                "cdCertificateStatus": this.f.txStatus.value,
                "cdClient": this.itemCertificate.cdClient,
                "cdProduct": this.itemCertificate.cdProduct,
                "cdProgramType": this.itemCertificate.cdProgramType,
                "cdRequest": this.itemCertificate.cdRequest,
                "consecutive": this.itemCertificate.consecutive,
                "txLanguage": this.f.txLanguage.value,
                "txEurope": this.f.txEurope.value,
                "txActivityPerformed": this.f.txActivityPerformed.value,
                "txCreationUser": this.txuserdni,
                "dtGrantCertificate":this.f.dtGrantCertificate.value,
                "dtRetireCertificate": this.f.dtRetireCertificate.value,
                "dtUpdateCertificate": this.f.dtUpdateCertificate.value,
                "dtDiscontinued": "",
                "dtSupervision":this.f.dtSupervision.value,
                "txIsCertified": this.itemCertificate.txIsCertified,
                "txCodCertificate": this.itemCertificate.txCodCertificate,
                "frontend": `${process.env.FRONTEND}`,
                "next": `${process.env.NEXT}`,
                "sessionid": this.sessionid
            }).subscribe(data => {
                if (data['status'] === `Internal Server Error`) {
                    console.log(data['message']);
                    this.alertService.error(data['message']);
                } else {
                    this.alertService.success(data['message']);
                }
            });

        }
    }

    buscarInformacion() {
        console.log("buscando informacion...");
    }

    recorrearreglo(variable: any) {
        var frase = "";
        for (let item of variable) {
            frase = frase + item;
            frase = frase + '/'
        }
        return frase;
    }

    onSubmit() {
        this.alertService.clear();

        // stop here if form is invalid
        if (this.certificadoForm.invalid) {
            return;
        }

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
                            this.txRole = data['role'];
                            this.txuserdni = data['dni'];

                            this.cargarValores();
                            this.listasService.certificateByRequest({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionid, userrole: data['role'], userdni: data['dni'], requestcode: this.itemCertificate.cdRequest, certificatecode: this.itemCertificate.txCodCertificate })
                                .subscribe(data => {
                                    this.listaMarcas = data;
                                    console.log("this.listaMarcas: ");
                                    console.log(this.listaMarcas)
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }

    public regresarLista(): void {

        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

   onStatus(e: any) {
        console.log(e.target.value);
        this.f.txStatus.setValue(e.target.value);
    }

    public cargarValores(): void {
        console.log("this.itemCertificate")
        console.log(this.itemCertificate)
        console.log("desde cargar valores cdCertificate: " + this.objCertificate[0].cdCertificate);
        console.log("desde cargar valores itemCertificate.cdCertificate: " + this.itemCertificate.cdCertificate);
        this.listasService.estados({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionid, "userrole": this.txRole, "action": "all" })
            .subscribe(data => this.listaestados = data);
        this.certificadoForm.get('txStatus').setValue(this.itemCertificate.cdCertificateStatus);

        this.certificadoForm.get('dtGrantCertificate').setValue(this.changeDate(this.itemCertificate.dtGrantCertificate));
        this.certificadoForm.get('dtUpdateCertificate').setValue(this.changeDate(this.itemCertificate.dtUpdateCertificate));
        this.certificadoForm.get('dtRetireCertificate').setValue(this.changeDate(this.itemCertificate.dtRetireCertificate));
        this.certificadoForm.get('dtSupervision').setValue(this.changeDate(this.itemCertificate.dtSupervision));

        this.certificadoForm.get('txLanguage').setValue(this.itemCertificate.txLanguage);

        this.certificadoForm.get('txEurope').setValue(this.objCertificate[0].txEurope);

        this.f.txActivityPerformed.setValue(this.itemCertificate.txActivityPerformed);

        /*this.listaestados.forEach(item => {
            if (item.cdCertificateStatus === this.objCertificate.cdCertificateStatus) {
                this.estadoselected = item;
                this.certificadoForm.get('txStatus').setValue(item.cdCertificateStatus);
            }
        });*/
    }

    private convertDate(date: Date): string {
        let dp = new DatePipe("en-US");
        let format = 'yyyy-MM-dd'; // YYYY-MM-DD
        let dtr = dp.transform(date, format);
        return dtr;
    }

    _formatDatetime(date: Date, format: string) {
        const _padStart = (value: number): string => value.toString().padStart(2, '0');
        return format
            .replace(/yyyy/g, _padStart(date.getFullYear()))
            .replace(/dd/g, _padStart(date.getDate()))
            .replace(/mm/g, _padStart(date.getMonth() + 1))
            .replace(/hh/g, _padStart(date.getHours()))
            .replace(/ii/g, _padStart(date.getMinutes()))
            .replace(/ss/g, _padStart(date.getSeconds()));
    }

    isValidDate(d: Date): boolean {
        return !isNaN(d.getTime());
    }

    formatDate(date: any): string {
        var datetime = new Date(date);
        return this.isValidDate(datetime) ? this._formatDatetime(datetime, 'yyyy-mm-dd hh:ii:ss') : null;
    }

    changeDate(date: string): string {
        if (date != null && date.toUpperCase().includes('T')) {
        date = date.substring(0, date.toUpperCase().indexOf('T'));
        }
        return date;
    }
}
