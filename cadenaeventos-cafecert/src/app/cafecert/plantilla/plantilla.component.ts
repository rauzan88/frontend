
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';

@Component({ templateUrl: 'plantilla.component.html' })
export class PlantillaComponent implements OnInit {
    lista = [];
    sessionId: any;
    msgfromprocesaevento: any;


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

    codrequest: any;
    userrole: any;
    userdni: any;
    cdRequest:any;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }
    ngOnInit() {
        //localStorage.setItem('msgfromprocesaevento',JSON.stringify("basura"));
        //console.log("este es vvarible cookie: " + localStorage.getItem('msgfromprocesaevento')); 
        //this.msgfromprocesaevento = JSON.parse(localStorage.getItem('msgfromprocesaevento'));
        //console.log("this.msgfromprocesaevento: " + this.msgfromprocesaevento);
        if (localStorage.getItem('msgfromprocesaevento') != null) {
            this.alertService.success(localStorage.getItem('msgfromprocesaevento'));
        }

        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));
        this.sessionId = JSON.parse(localStorage.getItem('sessionid'));
        this.cdRequest = JSON.parse(localStorage.getItem('cdRequest'));

        this.rutaActiva.queryParams.subscribe(params => {
            //this.sessionId = params['param'];
            if (this.sessionId === null) {
                this.lista = [];
                this.alertService.error('No se ha podido validar la sesion.');
            } else {

                //this.alertService.success("Esto es una prueba de alert");
                this.validarsesion();

            }
        });
    }

    public pagination(pag: number) {
        if (this.paginationList.length > this.pageLength) {
            let maxPerPage = this.pageLength / 2;
            if ((pag + 1 / 2) > (maxPerPage + 1)) {
                if (pag >= (this.maxPage - maxPerPage - 1)) {
                    this.minPageShow = this.maxPage - this.pageLength;
                    this.maxPageShow = this.minPageShow + this.pageLength + 1;
                } else {
                    this.minPageShow = pag - maxPerPage;
                    this.maxPageShow = this.minPageShow + this.pageLength;
                }
            } else {
                this.minPageShow = 0;
                this.maxPageShow = this.pageLength;
            }
        } else {
            this.minPageShow = 0;
            this.maxPageShow = this.pageLength;
        }

        this.minRow = this.itemsPerPage * pag;
        this.maxRow = this.itemsPerPage * (pag + 1);
        this.selectedPage = pag;
    }

    public createPagination(lista: Array<any>) {
        let maxPageSelect = this.listRowSize[this.listRowSize.length - 1];
        for (let i = 0; i <= this.listRowSize.length - 1; i++) {
            if (lista.length >= this.listRowSize[i] && lista.length <= this.listRowSize[i + 1]) {
                maxPageSelect = this.listRowSize[i + 1];
            }
        }
        let x = this.itemsPerPage;
        if (x > maxPageSelect) {
            x = maxPageSelect;
        }
        // this.tableHeight = (this.itemsPerPage * 51) + 60;
        this.paginationList = [];
        let listaLength = lista.length / x;
        for (let k = 0; k < Math.ceil(listaLength); k++) {
            this.paginationList.push(k);
        }
        this.maxPage = Math.ceil(listaLength) - 1;

    }

    public onChangePag() {
        this.createPagination(this.lista);
        this.pagination(0);
    }

    onSubmit() {
        this.alertService.clear();
    }

    public validarsesion(): void {
        console.log("ha entrado a validar");
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
                            this.userrole = data['role'];
                            this.userdni = data['dni'];
                            console.log(JSON.stringify({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionId, userrole: data['role'], userdni: data['dni'], requestcode: this.codrequest }));
                            this.listasService.plantilla({ frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sesionid: this.sessionId, userrole: data['role'], userdni: data['dni'], requestcode: this.codrequest })
                                .subscribe(data => {
                                    this.lista = data;
                                    this.createPagination(this.lista);
                                });
                        }
                    }
                }
            },
                error => {
                    console.log("Estatus: " + error);
                    this.alertService.error(error);
                });
    }

    validationFileNameToDownload(data: string) {
        let result = false;
        result = data.indexOf('OPEV-F-020') != -1 && this.userrole == 'AnalistaCertificacion_SICERT';
        if (!result)
            result = data.indexOf('OPEV-F-021') != -1 && this.userrole == 'AnalistaCertificacion_SICERT';
        if (!result)
            result = data.indexOf('OPEV-F-028') != -1 && this.userrole == 'AuxiliarAdministrativo_SICERT';
        if (!result)
            result = data.indexOf('OPEV-F-042') != -1 && (this.userrole == 'AnalistaCertificacion_SICERT' || this.userrole == 'GerenteGeneral_SICERT');
        if (!result)
            result = data.indexOf('OPEV-F-052') != -1 && this.userrole == 'AuxiliarAdministrativo_SICERT';
        if (!result)
            result = data.indexOf('OPEV-F-061') != -1 && this.userrole == 'AnalistaCertificacion_SICERT';
        if (!result)
            result = data.indexOf('OPEV-F-063') != -1 && this.userrole == 'AnalistaCertificacion_SICERT';
        if (!result)
            result = data.indexOf('OPEV-F-066') != -1 && this.userrole == 'AnalistaCertificacion_SICERT';
        if (!result)
            result = data.indexOf('OPEV-F-067') != -1 && this.userrole == 'AnalistaCertificacion_SICERT';
        return result;
    }

    public regresarLista(): void {
        localStorage.setItem('msgfromprocesaevento', null)
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionId } });
    }

    download(variable: any) {
        var { txUrl, txNombre, txFiltro, txFormato } = variable;
        return `http://jasper.federaciondecafeteros.org/jasperserver-pro/flow.html?_flowId=viewReportFlow&reportUnit=${txUrl}&j_username=cedurl&j_password=jasCed$FNC2013&COD_CERTIFICADO=null&${txFiltro}=${this.cdRequest}&viewAsDashboardFrame=false&output=${txFormato}`
    }
}
