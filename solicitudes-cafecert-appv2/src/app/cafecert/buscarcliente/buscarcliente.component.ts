import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService, ListasService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'buscarcliente.component.html' })
export class BuscarclienteComponent implements OnInit {
    txRole: any;
    txuserdni: any;
    sessionid: any;
    values = '';
    listaclientes = [];
    listafiltrada = [];
    buscarclienteForm: FormGroup;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private listasService: ListasService,
        private alertService: AlertService,
        private http: HttpClient
    ) {

    }

    // convenience getter for easy access to form fields
    get f() { return this.buscarclienteForm.controls; }

    ngOnInit() {

        this.sessionid = JSON.parse(localStorage.getItem('idsession'));
        //console.log("sesion desde buscar cliente : " + this.sessionid);
        if (this.sessionid === null) {
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

            this.validarsesion();
        }

        this.alertService.clear();

        this.buscarclienteForm = this.formBuilder.group({
            txNit: ['', Validators.required],
            txNombre: ['', Validators.required],
            txTeleMovil: ['', Validators.required],
            txCiudad: ['', Validators.required],
            txEmail: ['', Validators.required],
        });

        this.listasService.clientesGeneral({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionid, "userrole": this.txRole, "filername": "all", "filtervalue": "" })
            .subscribe(data => this.listaclientes = data);

        this.listafiltrada = this.listaclientes;
        console.log("this.listaProgramas: " + this.listaclientes);

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


                            this.listasService.clientesGeneral({ "frontend": `${process.env.FRONTEND}`, "next": `${process.env.NEXT}`, "sessionid": this.sessionid, "userrole": data['role'], "filername": "all", "filtervalue": "" })
                                .subscribe(data => this.listaclientes = data);
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

    public buscarCliente() {

        localStorage.setItem("idsession", JSON.stringify(this.sessionid));
        //console.log("sessionid buscar cliente: " + localStorage.getItem("this.sessionid"));

        this.router.navigate(['/cafecert/buscarcliente']);
    }

    goBackNewCertificate() {
        localStorage.setItem("idsession", JSON.stringify(this.sessionid));
        this.router.navigate(['/cafecert/nuevocertificado']);
    }

    onKeyNit(event: any) {
        this.values = event.target.value;
        if (this.values.length > 0) {
            this.listafiltrada = this.listaclientes.filter(client => client.txNit.includes(this.values));
        } else {
            this.listafiltrada = [];
        }
        this.alertService.success("La busqueda realizada por nit " + this.values + " encontro " + this.listafiltrada.length + " registros en el sistema.");
    }


    onKeyNombre(event: any) {
        this.values = event.target.value;
        if (this.values.length > 0) {
            this.listafiltrada = this.listaclientes.filter(client => client.txName.includes(this.values));
        } else {
            this.listafiltrada = [];
        }
        this.alertService.success("La busqueda realizada por nombre " + this.values + " encontro " + this.listafiltrada.length + " registros en el sistema.");
    }

    onKeyTeleMovil(event: any) {
        this.values = event.target.value;
        if (this.values.length > 0) {
            console.log("this.values: " + this.values);
            var auxMovil = [];
            var auxPhone = [];
            var auxPbx = [];

            auxMovil = this.listaclientes.filter(client => client.txMobile === null ? false : client.txMobile.includes(this.values));
            auxPhone = this.listaclientes.filter(client1 => client1.txPhone === null ? false : client1.txPhone.includes(this.values));
            auxPbx = auxMovil.concat(auxPhone);
            this.listafiltrada = auxPbx.concat(this.listaclientes.filter(client2 => client2.txPbx === null ? false : client2.txPbx.includes(this.values)));
        } else {
            this.listafiltrada = [];
        }
        var number1 = this.listafiltrada.length - auxPbx.length;
        this.alertService.success("La busqueda realizada por telefono " + this.values + " encontro " + auxMovil.length + " moviles, " + auxPhone.length +" fijos y " + number1  +" pbx en el sistema.");
    }

    onKeyEmail(event: any) {
        this.values = event.target.value;
        if (this.values.length > 0) {
            //console.log("this.values: " + this.values);
            var auxEamilUno = [];
            var auxEmailDos = [];

            auxEamilUno = this.listaclientes.filter(client => client.txEmail === null ? false : client.txEmail.includes(this.values));
            auxEmailDos = this.listaclientes.filter(client1 => client1.txMailAddress === null ? false : client1.txMailAddress.includes(this.values));

            this.listafiltrada = auxEamilUno.concat(auxEmailDos);

        } else {
            this.listafiltrada = [];
        }
        this.alertService.success("La busqueda realizada por email " + this.values + " encontro " + this.listafiltrada.length + " registros en el sistema.");
    }

    public goSelectClient(item: any) {
        var { cdClient, txNit, txName } = item;
        localStorage.setItem("cdClient", JSON.stringify(cdClient));
        localStorage.setItem("txName", JSON.stringify(txName));
        localStorage.setItem("txNit", JSON.stringify(txNit));

        this.router.navigate(['/cafecert/crearsolicitud']);
    }
}
