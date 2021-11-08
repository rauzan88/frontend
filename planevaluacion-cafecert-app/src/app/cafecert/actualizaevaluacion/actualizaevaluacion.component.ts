import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, ListasService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({ templateUrl: 'actualizaevaluacion.component.html' })
export class ActualizaealuacionComponent implements OnInit {

    sessionid: any;
    txRole: any;
    txuserdni: any;
    edicionForm: FormGroup;
    ocurreerror = false;
    errormensaje = "";
    lista = [];
    txCodeRequest;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private listasService: ListasService,
        private alertService: AlertService,
        private http: HttpClient
    ) {

    }

    // convenience getter for easy access to form fields
    get f() { return this.edicionForm.controls; }

    ngOnInit() {

        this.sessionid = JSON.parse(localStorage.getItem('idsession'));
        this.txCodeRequest = JSON.parse(localStorage.getItem('txCodRequest'));

        //console.log("sesion desde crear evaluacion : " + this.sessionid);
        if (this.sessionid === null) {
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();

        this.edicionForm = this.formBuilder.group({
            txCodRequest: ['', Validators.required],
            dtApplication: ['', Validators.required]
        });



        console.log("codigo: " + this.f.txCodRequest.value);
    }


    public validarRespuestas(respuesta: any): void {
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
                if ((item.txAnswer === 'S') && (item.nuEssay === null || item.nuEssay === "")) {
                    this.ocurreerror = true;
                    item.messageessay = " Olvido digitar el numero de ensayos";
                    this.errormensaje = this.errormensaje + "- Olvido escoger una opcion ";
                } else {
                    this.ocurreerror = false;
                }
            }
        }

        if (this.ocurreerror) {
            this.lista = respuesta;
            this.alertService.error("Ocurrio un error al guardar el plan de evaluacion.");

        } else {
            this.errormensaje = "Proceso de actualizar nuevo plan evaluacion fue ejecutado satisfactoriamente.";
            //console.log(respuesta);
            this.actualizarEvaluacion(respuesta);
            this.alertService.success(this.errormensaje);
        }

    }


    onSubmit() {
        this.alertService.clear();

        // stop here if form is invalid
        if (this.edicionForm.invalid) {
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
                            this.listasService.upevaluaciones({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionid, "userrole": data['role'], "txuser": data['dni'], "txcode": this.txCodeRequest })
                                .subscribe(data => {
                                    this.lista = data;
                                    this.lista.map(item => {
                                        this.f.dtApplication.setValue(this.convertDate(item[`dtApplication`]));
                                        this.f.txCodRequest.setValue(this.txCodeRequest);
                                    });
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }


    public actualizarEvaluacion(variable: any): void {
        console.log(variable);
        this.ocurreerror = false;
        for (let item of variable) {
            this.listasService.updateEvaluation({
                "cdEvaluationPlan": item.cdEvaluationPlan,
                "txCodRequest": this.f.txCodRequest.value,
                "dtApplication": this.f.dtApplication.value,
                "txAnswer": item.txAnswer,
                "nuEssay": item.nuEssay,
                "txCreationUser": this.txuserdni,
                "cdLaboratory": item.cdLaboratory,
                "frontend": `${process.env.FRONTEND}`,
                "next": `${process.env.NEXT}`,
                "sessionid": this.sessionid
            })
                .subscribe(data => {
                    if (data['status'] === `Internal Server Error`) {
                        //this.alertService.error(data['message']);
                        //console.log(this.errormensaje);
                        this.errormensaje = this.errormensaje + " - " + data['message'];
                        this.ocurreerror = true;
                    }
                });
        }

    }

    public regresarLista(): void {

        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    private convertDate(date: Date): string{
        let dp = new DatePipe("en-US");
        let format = 'yyyy-MM-dd'; // YYYY-MM-DD
        let dtr = dp.transform(date, format);
        return dtr;
    }
}
