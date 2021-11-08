import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, ListasService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'nuevaevaluacion.component.html' })
export class NuevaealuacionComponent implements OnInit {

    sessionid: any;
    txRole: any;
    txuserdni: any;
    evaluacionForm: FormGroup;
    ocurreerror = false;
    errormensaje = "";
    lista = [];
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

        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        console.log("sesion desde crear evaluacion : " + this.sessionid);
        if (this.sessionid === null) {
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();

        this.evaluacionForm = this.formBuilder.group({
            txCodRequest: [{value:'',disabled:true}, Validators.required],
            dtApplication: ['', Validators.required]
        });
    }


    public validarRespuestas(respuesta: any): void {
        this.ocurreerror = false;
        let mensajeerror = "Ocurrio un error al validar los campos del formulario";

        for (let item of respuesta) {

            //console.log(item.txQuestions + " respuesta: " + item.answer);
            //console.log(" radio: " + item.radio);
            if (item.txAnswer === null) {
                this.ocurreerror = true;
                this.errormensaje = this.errormensaje +"- Olvido escoger una opcion ";
                item.messageradio = " Olvido escoger una opcion";
            } else {
                this.ocurreerror = false;
                item.messageradio = null;
                if ((item.txAnswer === 'S') && (item.nuEssay === null || item.nuEssay === "")) {
                    this.ocurreerror = true;
                    item.messageessay = " Olvido digitar el numero de ensayos";
                    this.errormensaje = this.errormensaje +"- Olvido escoger una opcion ";
                } else {
                    this.ocurreerror = false;
                }
            }
        }

        if (this.ocurreerror) {
            this.lista = respuesta;
            this.alertService.error("Ocurrio un error al guardar el plan de evaluacion.");

        } else {
            this.errormensaje = "Proceso de guardar nuevo plan evaluacion fue ejecutado satisfactoriamente.";
            //console.log(respuesta);
            this.guardarEvaluacion(respuesta);
            this.alertService.success(this.errormensaje);
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
                            this.listasService.newevaluaciones({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionid, "userrole": data['role'], "txuser": data['dni'], "action": "allactive" })
                                .subscribe(data => {
                                    console.log(data);
                                    this.lista = data;
                                    let objSolicitud = JSON.parse(localStorage.getItem("request"));
                                    this.f.txCodRequest.setValue(objSolicitud.txCodRequest);
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }


    public guardarEvaluacion(variable: any): void {
        //console.log(variable);
        this.ocurreerror = false;
        for (let item of variable) {
            this.listasService.saveEvaluation({
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
                        console.log(this.errormensaje);
                        this.errormensaje = this.errormensaje + " - " + data['message'];
                        this.ocurreerror = true;
                    }
                });
        }

    }

    public goBackRequestList(){
        // this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid, type: '2', value:'123456' }});
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid }});
    }
}
