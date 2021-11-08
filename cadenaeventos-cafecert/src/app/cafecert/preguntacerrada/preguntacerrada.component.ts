
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ selector: 'app-preguntacerrada', templateUrl: 'preguntacerrada.component.html' })
export class PreguntacerradaComponent implements OnInit {
    lista = [];
    myModel: Array<any> = [];
    user: any;
    role: any;
    sessionid: any;
    eventchain: any;
    codrequest: any;
    controlChain: any;
    group: any;
    errormensaje = "";
    ocurreerror = false;
    fileToUpload: FileList = null;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        this.eventchain = JSON.parse(localStorage.getItem('evenchain'));
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));
        this.controlChain = JSON.parse(localStorage.getItem('controlChain'));

        console.log("desde control sesionid: " + this.sessionid);
        console.log("desde control evencahin: " + this.eventchain);
        //this.lista = JSON.parse("{}");


        if (this.sessionid === null) {
            this.lista = [];
            this.alertService.error('No se ha podido validar la sesion.');
        } else {
            this.validarsesion();

        }
    }

    onSubmit() {
        this.alertService.clear();
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
                            this.user = data[`dni`];
                            this.role = data[`role`];
                            this.listasService.preguntas({ eventChain: this.eventchain, group: this.group, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: data[`role`], textuserdni: data[`dni`] })
                                .subscribe(data => {
                                    this.lista = data;
                                });
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                    this.router.navigate(['/cafecert/controlevento']);
                });
    }

    public regresarflujo(): void {
        this.router.navigate(['/cafecert/detalle']);
    }

    public validarRespuestas(respuesta: any): void {
        this.ocurreerror = false;
        let mensajeerror = "Ocurrio un error al validar los campos del formulario";

        for (let item of respuesta) {

            //console.log(item.txQuestions + " respuesta: " + item.answer);
            //console.log(" radio: " + item.radio);

            console.log(" files: " + item.files);
            if (item.typeValidation === 1 && item.files === null) {
                this.ocurreerror = true;
                item.watch = "S";
                item.messagewrite = " Olvido adjuntar archivos";
            } else {
                this.ocurreerror = false;
                item.watch = "N";
            }

            if ((item.typeValidation === 2 || item.typeValidation === 3) && item.answer === null) {
                this.ocurreerror = true;
                item.watch = "S";
                item.messageradio = " Olvido escoger una opcion";
            } else {
                this.ocurreerror = false;
                item.watch = "N";


                if (item.typeValidation === 3 && (item.observation === null || item.observation === "") && item.txValidate === 'S') {
                    this.ocurreerror = true;
                    item.writeobs = "S";
                    item.messagewrite = " Olvido llenar la observacion";
                } else {
                    this.ocurreerror = false;
                    item.writeobs = "N";
                }
            }

            //console.log(" respuesta: " + JSON.stringify(respuesta));
            if (this.ocurreerror) {
                this.lista = respuesta;
                this.alertService.error(mensajeerror);

            } else {
                if (item.typeValidation === 1) {
                    //this.uploadFileToActivity();

                    this.saveFile(this.fileToUpload);
                    //this.saveFile(item.files);
                    this.errormensaje = this.errormensaje + "- Proceso de validacion formulario con archivos fue ejecutado.";
                } else {
                    this.guardarRespuesta(respuesta);
                    this.errormensaje = this.errormensaje + "- Proceso de validacion formulario con preguntas cerradas fue ejecutado.";
                }

            }

            if (this.ocurreerror) {
                this.alertService.error(this.errormensaje);
            } else {
                this.alertService.success(this.errormensaje);
            }
            console.log(this.errormensaje );

        }
    }


    public guardarRespuesta(respuesta: any): void {
        
        this.ocurreerror = false;
        for (let item of respuesta) {
            //Guarda las respuestas del usuario en eventlog
            if (item.typeValidation === 2 || item.typeValidation === 3) {
                this.listasService.changeTrace({
                    "codrequest": this.codrequest,
                    "cdControlChain": item.cdControlChain,
                    "cdEventChain": item.nuEventChain,
                    "cdTypeEventLog": "1",
                    "nuValue": item.answer,
                    "txJson": JSON.stringify(item),
                    "txDescription": item.observation,
                    "txCreationUser": this.user,
                    "frontend": `${process.env.FRONTEND}`,
                    "next": `${process.env.NEXT}`,
                    "session": this.sessionid
                }).subscribe(data => {
                    if (data['status'] === `Internal Server Error`) {
                        //this.alertService.error(data['message']);
                        this.errormensaje = this.errormensaje + " - " + data['message'];
                        this.ocurreerror = true;
                    }
                });
            } else {
                this.listasService.saveTrace({
                    "codrequest": this.codrequest,
                    "cdControlChain": item.cdControlChain,
                    "cdEventChain": item.nuEventChain,
                    "cdTypeEventLog": "1",
                    "nuValue": item.answer,
                    "txJson": JSON.stringify(item),
                    "txDescription": item.observation,
                    "txCreationUser": this.user,
                    "frontend": `${process.env.FRONTEND}`,
                    "next": `${process.env.NEXT}`,
                    "session": this.sessionid
                }).subscribe(data => {
                    if (data['status'] === `Internal Server Error`) {
                        //this.alertService.error(data['message']);
                        this.errormensaje = this.errormensaje + " - " + data['message'];
                        this.ocurreerror = true;
                    }
                });
            }
        }
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files;
    }



    saveFile(varfiles: FileList): void {
        Array.from(varfiles).forEach(file => {
            const formData = new FormData();
            formData.append('directory', "cafecertfile");
            formData.append('subdirectory', this.codrequest);
            formData.append('file', file);

            this.http.post<any>(`${process.env.FILECRUD}` + '/cafecert/savefile/', formData)
                .subscribe(data => {
                    if (data['status'] === `Internal Server Error`) {
                        this.errormensaje = this.errormensaje + " - " + data['message'];
                        this.ocurreerror = true;
                    } else {
                        this.listasService.trazaFile({
                            "codrequest": this.codrequest,
                            "eventChain": this.eventchain,
                            "controlChain": this.controlChain,
                            "typeEventLog": "1",
                            "frontend": `${process.env.FRONTEND}`,
                            "next": `${process.env.NEXT}`,
                            "sessionid": this.sessionid,
                            "txRole": this.role,
                            "txuserdni": this.user,
                            "nuValue": "1",
                            "tipo": data['type'],
                            "name": data['name'],
                            "path": data['path']
                        }).subscribe(data => {
                            if (data['status'] === `Internal Server Error`) {
                                this.errormensaje = this.errormensaje + " - " + data['message'];
                                this.ocurreerror = true;
                            }
                        });
                    }
                }, error => {
                    this.ocurreerror = true;
                    this.alertService.error(error);
                    console.log(error);
                });
        });
        
    }

}
