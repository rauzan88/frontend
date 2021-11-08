import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, ListasService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as fileSaver from 'file-saver';

@Component({ templateUrl: 'listarcertificado.component.html' })
export class ListarcertificadoComponent implements OnInit {
    objCertificate: any;
    sessionid: any;
    txRole: any;
    txuserdni: any;
    programselected: any;
    certificadoForm: FormGroup;
    lista = [];
    listaestados = [];
    estadoselected: any;
    listapresencafe = [];
    listadescricafe = [];
    listaProgramas = [];
    listaMarcas=[];
    certificaciones = [];
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
        this.objCertificate = JSON.parse(localStorage.getItem("itemcertificate"));
        console.log("objCertificate")
        console.log(this.objCertificate)

        console.log("sesion desde crear ceertificado : " + this.sessionid);
        if (this.sessionid === null) {
            this.lista = [];
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();

        this.certificadoForm = this.formBuilder.group({
            txStatus: ['', Validators.required],
            dtGrantCertificate: ['', Validators.required],
            dtUpdateCertificate: ['', Validators.required],
            dtRetireCertificate: ['', Validators.required],
            dtSupervision: [''],
            txLanguage: ['', Validators.required],
            txEurope: ['', Validators.required],
            txActivityPerformed: ['', Validators.required]
        });

        this.cargarValores();
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
                            this.txRole = data['role'];
                            this.txuserdni = data['dni'];
                            
                            //alert(localStorage.getItem("certificate"));
                            //alert(this.objCertificate[0].cdRequest);
                            this.listasService.plantilla({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionid, userrole: data['role'], userdni: data['dni'], requestcode: this.objCertificate.cdRequest })
                                .subscribe(data => {
                                    this.lista = data;
                                    //console.log("Lista: "+data);
                                    //this.createPagination(this.lista);
                                });
                            console.log("pwneeeeeeee")
                            console.log(this.objCertificate)
                            this.cargarValores();
                            //console.log(JSON.stringify({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionid, userrole: data['role'], userdni: data['dni'], requestcode: this.objCertificate.cdRequest }));
                            this.listasService.certificateByRequest({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionid, userrole: data['role'], userdni: data['dni'], requestcode: this.objCertificate.cdRequest, certificatecode: this.objCertificate.txCodCertificate })
                                .subscribe(data => {
                                    this.listaMarcas = data;
                                    console.log("this.listaMarcas nuevo: ");
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

    public cargarValores(): void {

        this.listasService.estados({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionid, "userrole": this.txRole, "action": "all" })
            .subscribe(data => this.listaestados = data);
        this.certificadoForm.get('txStatus').setValue(this.objCertificate.cdCertificateStatus);

        this.certificadoForm.get('dtGrantCertificate').setValue(this.changeDate(this.objCertificate.dtGrantCertificate));
        this.certificadoForm.get('dtUpdateCertificate').setValue(this.changeDate(this.objCertificate.dtUpdateCertificate));
        this.certificadoForm.get('dtRetireCertificate').setValue(this.changeDate(this.objCertificate.dtRetireCertificate));
        this.certificadoForm.get('dtSupervision').setValue(this.changeDate(this.objCertificate.dtSupervision));
        this.certificadoForm.get('txLanguage').setValue(this.objCertificate.txLanguage);

        this.certificadoForm.get('txEurope').setValue(this.objCertificate.txEurope);

        this.f.txActivityPerformed.setValue(this.objCertificate.txActivityPerformed);
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
    download(variable: any) {
        var { txUrl, txNombre, txFiltro, txFormato } = variable;
        console.log("url: " + txUrl);
        this.listasService.downloadPlantilla({
            "frontend": `${process.env.FRONTEND}`,
            "next": `${process.env.NEXT}`,
            "sessionid": this.sessionid,
            "userrole": this.txRole,
            "userdni": this.txuserdni,
            "txname": txNombre,
            "txfilter": txFiltro,
            "requestcode": this.objCertificate.cdRequest,
            "certificatecode": this.objCertificate.txCodCertificate,
            "outputformat": txFormato,
            "urltemplate": txUrl
        }).subscribe(
            (response) => {
                if (response.byteLength > 0) {
                    let blob: any;
                    switch (txFormato.toUpperCase()) {
                        case "XLS": {
                            let blobxls: any = new Blob([response], { type: 'application/vnd.ms-excel' });
                            // const url = window.URL.createObjectURL(blobxls);
                            //window.open(url);
                            fileSaver.saveAs(blobxls, `${txNombre}.xls`);
                            break;
                        }
                        case "DOC": {
                            let blobxls: any = new Blob([response], { type: 'application/msword' });
                            fileSaver.saveAs(blobxls, `${txNombre}.doc`);
                            break;
                        }
                        case "PDF":{
                            let blobpdf: any = new Blob([response], { type: 'application/pdf' });
                            fileSaver.saveAs(blobpdf, `${txNombre}.pdf`);
                            break;
                        }
                        case "CVS":{
                            let blobcsv: any = new Blob([response], { type: 'text/csv' });
                            fileSaver.saveAs(blobcsv, `${txNombre}.csv`);
                            break;
                        }
                        case "DOCX":{
                            let blobcsv: any = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                            fileSaver.saveAs(blobcsv, `${txNombre}.docx`);
                            break;
                        }
                        case "XLSX":{
                            let blobcsv: any = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                            fileSaver.saveAs(blobcsv, `${txNombre}.xlsx`);
                            break;
                        }
                        case "RTF":{
                            let blobcsv: any = new Blob([response], { type: 'application/rtf' });
                            fileSaver.saveAs(blobcsv, `${txNombre}.rtf`);
                            break;
                        }
                        case "ODT":{
                            let blobcsv: any = new Blob([response], { type: 'application/vnd.oasis.opendocument.text' });
                            fileSaver.saveAs(blobcsv, `${txNombre}.odt`);
                            break;
                        }
                        case "ODS":{
                            let blobcsv: any = new Blob([response], { type: 'application/vnd.oasis.opendocument.spreadsheet' });
                            fileSaver.saveAs(blobcsv, `${txNombre}.ods`);
                            break;
                        }
                        default:{
                            this.alertService.error("Formato " + txFormato + " no expecificado.");
                            break;
                        }
                    }

                } else {
                    console.log("Ocurrió un error al descargar el archivo");
                    this.alertService.error("Ocurrió un error al descargar el archivo.");
                }
            }
        );
    }

    changeDate(date: string): string {
        if (date != null && date.toUpperCase().includes('T')) {
          date = date.substring(0, date.toUpperCase().indexOf('T'));
        }
        return date;
    }
}
