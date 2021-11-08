import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, ListasService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface ListInitial {
    cdLaboratory: string;
    dtApplication: any;
    laboratoryName: string;
    messageessay: string;
    messageradio: string;
    ptlistdto: [{
        cdProductType: number,
        nuEssay: any,
        txDescription: string
    }];
    txAnswer: any;
    txCodRequest: any;
    txCreationUser: any;
}

@Component({ templateUrl: 'nuevaevaluacion.component.html' })
export class NuevaealuacionComponent implements OnInit {

    sessionid: any;
    txRole: any;
    txuserdni: any;
    codrequest: any;
    cdRequest: any;
    evaluacionForm: FormGroup;
    ocurreerror = false;
    errormensaje = "";
    lista: ListInitial[] = [];
    openPanel: boolean = true;
    empresa: String;
    typerequest: String;
    constructor(
        private formBuilder: FormBuilder,
        private listasService: ListasService,
        private alertService: AlertService,
        private http: HttpClient,
        private router: Router
    ) {

    }

    // convenience getter for easy access to form fields
    get f() { return this.evaluacionForm.controls; }

    ngOnInit() {
        this.cdRequest = JSON.parse(localStorage.getItem('cdRequest'));
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        this.codrequest = JSON.parse(localStorage.getItem("codrequest"));
        this.empresa = JSON.parse(localStorage.getItem("empresa"));
        this.typerequest = JSON.parse(localStorage.getItem("typerequest"));
        //console.log("sesion desde crear evaluacion : " + this.sessionid);
        //console.log("codrequest : " + this.codrequest);
        if (this.sessionid === null) {
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();

        this.evaluacionForm = this.formBuilder.group({
            empresa: [],
            typerequest: [],
            txCodRequest: [{ value: '', disabled: true }, Validators.required],
            dtApplication: ['', Validators.nullValidator]
        });

    }


    public validarRespuestas(respuesta: ListInitial[]): void {
        this.ocurreerror = false;
        let mensajeerror = "Ocurrio un error al validar los campos del formulario";


        for (let item of respuesta) {

            //console.log(item.txQuestions + " respuesta: " + item.answer);
            //console.log(" radio: " + item.radio);
            if (item.txAnswer === null) {
                this.ocurreerror = true;
                this.errormensaje = this.errormensaje + "- Olvido escoger una opcion ";
                item.messageradio = " Olvido escoger una opcion";
            } else {
                this.ocurreerror = false;
                item.messageradio = null;
                if ((item.txAnswer === 'S')) {
                    for (const product of item.ptlistdto) {
                        if (product.nuEssay === null || product.nuEssay === "") {
                            this.ocurreerror = true;
                            item.messageessay = " Olvido digitar el numero de ensayos";
                            this.errormensaje = this.errormensaje + "- Olvido escoger una opcion ";
                        }
                    }   
                } else {
                    this.ocurreerror = false;
                }
            }
        }

        //console.log("this.ocurreerror: " + this.ocurreerror);
        //console.log(this.f.dtApplication);
        if (this.ocurreerror) {


            this.lista = respuesta;
            this.alertService.error("Ocurrio un error al guardar el plan de evaluacion.");

        } else {
            //console.log(this.f.dtApplication);
            if (this.f.dtApplication.value === null || this.f.dtApplication.value === '') {
                this.ocurreerror = true;
                this.errormensaje = "Olvido escoger una fecha"
                this.alertService.error(this.errormensaje);
            } else {
                this.errormensaje = "Proceso de guardar nuevo plan evaluacion fue ejecutado satisfactoriamente.";
                //console.log(respuesta);
                this.guardarEvaluacion(respuesta);
                this.alertService.success(this.errormensaje);
            }

        }

    }

    onSubmit() {
        this.alertService.clear();

        // stop here if form is invalid
        if (this.evaluacionForm.invalid) {
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
                            this.listasService.newevaluaciones({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionid, "userrole": data['role'], "txuser": data['dni'], "action": "allactive", requestcode:  `${this.cdRequest}` })
                                .subscribe(data => {
                                    
                                    this.lista = data;
                                    //let objSolicitud = JSON.parse(localStorage.getItem("request"));

                                    this.f.txCodRequest.setValue(this.codrequest);
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error['message']);
                });
    }

    showCoffeGreen(typeCoffeDescription: string, laboratoryName: string) {
        return typeCoffeDescription
            .includes('Café Tostado') && laboratoryName
                .includes('Centro Nacional de investigación de Café -Cenicafé')
                    ? '*Café verde materia prima del café tostado:': '*'+typeCoffeDescription+':'
    }

    public guardarEvaluacion(variable: ListInitial[]): void {
        //console.log(variable);
        this.ocurreerror = false;
        for (let item of variable) {
            console.log(JSON.stringify({
                "cdrequest": this.cdRequest,
                "txCodRequest": this.f.txCodRequest.value,
                "dtApplication": this.f.dtApplication.value,
                "txAnswer": item.txAnswer,
                "ptlistdto": item.ptlistdto,
                "txCreationUser": this.txuserdni,
                "cdLaboratory": item.cdLaboratory,
                "frontend": `${process.env.FRONTEND}`,
                "next": `${process.env.NEXT}`,
                "sessionid": this.sessionid
            }));

            for (let product of item.ptlistdto) {
                let varensayo = product.nuEssay;
                //console.log("antes ensayo:  " + item.nuEssay);
                if (varensayo === null || varensayo === "" || varensayo.length < 1) {
                    product.nuEssay = "0";
                }
                this.listasService.saveEvaluation({
                    "cdrequest": this.cdRequest,
                    "txCodRequest": this.f.txCodRequest.value,
                    "dtApplication": this.f.dtApplication.value,
                    "txAnswer": item.txAnswer,
                    "nuEssay": varensayo,
                    "cdProductType": product.cdProductType,
                    "txCreationUser": this.txuserdni,
                    "cdLaboratory": item.cdLaboratory,
                    "frontend": `${process.env.FRONTEND}`,
                    "next": `${process.env.NEXT}`,
                    "sessionid": this.sessionid
                }).subscribe(data => {
                    if (data['status'] === `Internal Server Error`) {
                        //this.alertService.error(data['message']);
                        //console.log(this.errormensaje);
                        this.errormensaje = this.errormensaje + " - " + data['message'];
                        this.ocurreerror = true;
                    }
                });
            }
        }

    }

    public goBackRequestList() {
        // this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid, type: '2', value:'123456' }});
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    onChangePanel(isFirstPanel: boolean = false) {
        if (isFirstPanel) {
            this.openPanel = true;
        } else {
            this.openPanel = false;
        }
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
}
