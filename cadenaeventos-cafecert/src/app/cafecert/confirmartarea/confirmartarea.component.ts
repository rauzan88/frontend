
import { AlertService, ListasService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ selector: 'app-confirmartarea', templateUrl: 'confirmartarea.component.html' })
export class ConfirmartareaComponent implements OnInit {
    lista = [];
    flujoalterno = [];
    controllista = [];
    myModel: Array<any> = [];
    user: any;
    role: any;
    sessionid: any;
    eventchain: any;
    typerequestid: any;
    typerequest: String;
    cdRequest: any;
    codrequest: any;
    controlChain: any;
    group: any;
    errormensaje = "";
    ocurreerror = false;
    fileToUpload: FileList = null;
    assigned: any;
    nexteventchain: any;
    typeEventLog: any;
    nameCurrentChain: any;
    nameNextChain: any;
    btnconfirmartarea = false;
    dtCreation: String;
    nit: any;
    company: String;
    constructor(
        private router: Router,
        private alertService: AlertService,
        private listasService: ListasService,
        private rutaActiva: ActivatedRoute,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.eventchain = JSON.parse(localStorage.getItem('evenchain'));
        this.typerequestid = JSON.parse(localStorage.getItem('typerequestid'));
        this.typerequest = JSON.parse(localStorage.getItem('typerequest'));
        this.assigned = JSON.parse(localStorage.getItem('assigneduser'));
        this.nexteventchain = JSON.parse(localStorage.getItem('nextEventChain'));
        this.nameCurrentChain = JSON.parse(localStorage.getItem('nameCurrentChain'));
        this.nameNextChain = JSON.parse(localStorage.getItem('nameNextChain'));
        this.typeEventLog = 1; //valor quemado tipo log evento validacion
        this.sessionid = JSON.parse(localStorage.getItem('sessionid'));
        this.eventchain = JSON.parse(localStorage.getItem('eventchain'));
        this.cdRequest = JSON.parse(localStorage.getItem('cdRequest'));
        this.codrequest = JSON.parse(localStorage.getItem('codrequest'));
        this.controlChain = JSON.parse(localStorage.getItem('controlChain'));
        this.nit = JSON.parse(localStorage.getItem('nit'));
        this.company = JSON.parse(localStorage.getItem('empresa'));
        this.fn_dateConvert();

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
                            this.listasService.validaciones({ codrequest: this.cdRequest, eventChain: this.eventchain, typeEventLog: '1', frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: data[`role`], textuserdni: data[`dni`] })
                                .subscribe(data => {
                                    this.controllista = data;
                                    this.controllista.map(item => { this.group = item[`group`] });
                                    //console.log("grupo: " + this.group);
                                });
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
                    //this.router.navigate(['/cafecert/controlevento']);
                });
    }

    public regresarflujo(): void {
        //this.router.navigate(['/cafecert/detalle']);
        this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
    }

    public validarRespuestas(respuesta: any): void {
        this.ocurreerror = false;
        let mensajeerror = "Ocurrio un error al validar los campos del formulario";

        for (let item of respuesta) {

            //console.log(item.txQuestions + " respuesta: " + item.answer);
            //console.log(" radio: " + item.radio);

            //console.log(" files: " + item.files);
            if (item.typeValidation === 1 && item.files === null) {
                this.ocurreerror = true;
                item.watch = "S";
                item.messagewrite = " Olvido adjuntar archivos";
            } else {
                this.ocurreerror = false;
                item.watch = "N";
            }

            //console.log(" error  ala altura 136: " + this.ocurreerror + " es: " + item.messagewrite);

            if ((item.typeValidation === 2 || item.typeValidation === 3)) {
                if (item.answer === null) {
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
            }

            if (item.typeValidation === 4) {
                item.answer = 0;
                if ((item.observation === null || item.observation === "") && item.txValidate === 'S') {
                    this.ocurreerror = true;
                    item.writeobs = "S";
                    item.messagewrite = " Olvido llenar la observacion";
                } else {
                    this.ocurreerror = false;
                    item.writeobs = "N";

                }
            }

            //console.log(" existe error  ala altura 157: " + this.ocurreerror + " es: " + item.messagewrite);
            //console.log(" respuesta: " + JSON.stringify(respuesta));

        }
        if (this.ocurreerror) {
            this.btnconfirmartarea = false;
            this.lista = respuesta;
            this.alertService.error(this.errormensaje);

        } else {
            this.btnconfirmartarea = true;
            //console.log(JSON.stringify(respuesta));
            this.guardarRespuesta(respuesta);
            //this.errormensaje = this.errormensaje + "- Proceso de validacion formulario con preguntas cerradas fue ejecutado.";

            this.alertService.success("Se ha guardado la información" + (this.group === undefined ? '': ' de '+this.group));
        }
        //console.log(this.errormensaje);


    }


    public guardarRespuesta(respuesta: any): void {

        this.ocurreerror = false;
        for (let item of respuesta) {

            //console.log("control change guardarrespuesta: " + item.cdControlChain);
            //Guarda las respuestas del usuario en eventlog
            if (item.typeValidation === 1) {
                //this.uploadFileToActivity();

                this.saveFile(this.fileToUpload, item.cdControlChain);
                
                //this.saveFile(item.files);
                // this.errormensaje = this.errormensaje + "- Proceso de validacion formulario con archivos fue ejecutado.";
                this.listasService.saveTrace({
                    "codrequest": this.cdRequest,
                    "cdControlChain": item.cdControlChain,
                    "cdEventChain": item.nuEventChain,
                    "cdTypeEventLog": "1",
                    "nuValue": this.fileToUpload.length,
                    "txJson": JSON.stringify(item),
                    "txDescription": "numero de achivos " + this.fileToUpload.length,
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
            }  // if (item.typeValidation === 2 || item.typeValidation === 3) {
            else {
                this.listasService.changeTrace({
                    "codrequest": this.cdRequest,
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

    toArray = (fileList) => Array.prototype.slice.call(fileList);

    handleFileInput(files: FileList) {
        if (this.fileToUpload == null) this.fileToUpload = files;
        else {
            var joined = this.toArray(this.fileToUpload).concat(this.toArray(files));
            this.fileToUpload = joined;
        }
    }

    eliminarArchivo(index: number) {
        let tmpFileToUpload = this.toArray(this.fileToUpload)
        tmpFileToUpload.splice(index, 1);
        this.fileToUpload = tmpFileToUpload;
    }

    saveFile(varfiles: FileList, controlchain: any): void {
        Array.from(varfiles).forEach(file => {
            const formData = new FormData();
            formData.append('directory', "cafecertfile");
            formData.append('subdirectory', this.cdRequest);
            formData.append('file', file);

            

            this.http.post<any>(`${process.env.FILECRUD}` + '/cafecert/savefile/', formData)
                .subscribe(data => {
                    if (data['status'] === `Internal Server Error`) {
                        this.errormensaje = this.errormensaje + " - " + data['message'];
                        this.ocurreerror = true;
                    } else {

                        console.log("desde trazafile" +JSON.stringify({
                            "codrequest": this.cdRequest,
                            "eventChain": this.eventchain,
                            "controlChain": controlchain,
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
                        }));
                        this.listasService.trazaFile({
                            "codrequest": this.cdRequest,
                            "eventChain": this.eventchain,
                            "controlChain": controlchain,
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
                    this.alertService.error(error['message']);
                    //console.log(error);
                });
        });

    }

    public validarPreguntasNextEslabon(): void {
        /*console.log(JSON.stringify({
            codRequest: this.codrequest,
            assigned: this.assigned,
            nexteventchain: this.nexteventchain,
            namenexteventchain: this.namenexteventchain,
            eventChain: this.eventchain,
            typeEventLog: this.typeEventLog,
            sessionid: this.sessionid,
            TxRole: this.role,
            txuserdni: this.user,
            frontend: `${process.env.FRONTEND}` + `/cafecert/confirmatarea/`,
            next: `${process.env.NEXT}` + `/cafecert/confirmatarea/`
        }));
        */
        this.http.post<any>(`${process.env.EVENTBUSINESS}` + `/cafecert/processevenchain/`, {
            codRequest: this.cdRequest,
            assigned: this.assigned,
            nexteventchain: this.nexteventchain,
            namenexteventchain: this.nameCurrentChain,
            eventChain: this.eventchain,
            typeEventLog: this.typeEventLog,
            sessionid: this.sessionid,
            TxRole: this.role,
            txuserdni: this.user,
            frontend: `${process.env.FRONTEND}` + `/cafecert/confirmatarea/`,
            next: `${process.env.NEXT}` + `/cafecert/confirmatarea/`
        })
            .subscribe(data => {
                //console.log(data)
                if (data['status'] === `Internal Server Error`) {
                    this.alertService.error(data['message']);
                } else {
                    /*
                    this.alertService.success("Solicitud " + this.codrequest + " ha pasado al evento " + this.namenexteventchain + ". " + data['message']);
                    localStorage.setItem('msgfromprocesaevento', "Solicitud " + this.codrequest + " ha pasado al evento " + this.nexteventchain + ". " + data['message']);
                    this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
                  */
                    //validar si tiene flujo alterno parametrizado
                    //si hay flujo alterno ir a formulario justificar
                    this.listasService.flujoAlterno({ eventChain: this.eventchain, typerequest: this.typerequestid, frontend: `${process.env.FRONTEND}`, next: `${process.env.NEXT}`, sessionid: this.sessionid, textrole: data[`role`], textuserdni: data[`dni`] })
                        .subscribe(data => {
                            this.flujoalterno = data;

                            this.alertService.success("Solicitud " + this.codrequest + " ha pasado del evento " + this.nameCurrentChain + " hacia el evento " + this.nameNextChain + ".");
                            localStorage.setItem('msgfromprocesaevento', "Solicitud " + this.codrequest + " ha pasado del evento " + this.nameCurrentChain + " hacia el evento " + this.nameNextChain + ".");

                            if (this.flujoalterno.length > 0) {
                                console.log("flujoalterno: " + this.flujoalterno);
                                this.router.navigate(['/cafecert/justificar/']);
                            } else {
                                //no hay flujo alterno ir hoja de trabajo

                                this.router.navigate([`${process.env.FRONTEND}`], { queryParams: { param: this.sessionid } });
                            }
                        });

                }
            },
                error => {
                    this.alertService.error(error['message']);
                });

    }

    //Función que convierte la fecha a formato DD/MM/YYYY
    fn_dateConvert() {
        this.dtCreation = "";
        let aux = JSON.parse(localStorage.getItem('dtCreation'));
        let fechaF = "";
        let i = 0;
        while (i < 10)
            fechaF += aux[i++];
        let fechaN = fechaF.split("-");
        this.dtCreation += fechaN[2] + "/";
        this.dtCreation += fechaN[1] + "/";
        this.dtCreation += fechaN[0];
    }

}
