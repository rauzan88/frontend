import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@/_services';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({ templateUrl: 'changepassword.component.html' })
export class ChangepasswordComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    sessionid: any;
    hero = { name: 'Dr.' };
    //user: User;
    //message: MessageDTO;
    constructor(
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {
        this.router.navigate(['/changepassword']);

    }

    ngOnInit() {
        console.log("estoy en el initcambio clave");
        this.sessionid = JSON.parse(localStorage.getItem('usersession'));
        console.log("sesion desde crear evaluacion : " + this.sessionid);
        if (this.sessionid === null) {
            this.alertService.error('No se ha podido validar la sesion.');
        } else {

            this.validarsesion();
        }

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            newpassword: ['', Validators.maxLength(20)],
            confirmpassword: ['', Validators.required]
        });

        this.f.username.setValue( JSON.parse(localStorage.getItem('username')));
        this.f.password.setValue( JSON.parse(localStorage.getItem('userpassword')));

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();
        //console.log("Accion actualizar clave");
        //console.log("this.f.newpassword.value: " + this.f.newpassword.value);
        //console.log("this.f.confirmpassword.value: " + this.f.confirmpassword.value);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            //console.log("this.loginForm.invalid: " + this.loginForm.invalid);
            //console.log("this.loginForm.errors: " + this.loginForm.errors);
            return;
        }

        if (this.f.newpassword.value != this.f.confirmpassword.value) {
            console.log("Por favor verifique los datos ingresados, la nueva contraseña y la confirmación de la nueva contraseña no coinciden.");
            this.alertService.error('Por favor verifique los datos ingresados, la nueva contraseña y la confirmación de la nueva contraseña no coinciden.');
            return;
        } else {

            if (this.validar_clave(this.f.newpassword.value) === 1) {
                //this.loading = true;
                //let crypto = require('crypto');
                //let passMd5 = crypto.createHash('md5').update(this.f.password.value).digest('hex');

                this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/changepassword/`, {
                    "application": "Sicert",
                    "username": this.f.username.value,
                    "password": this.f.password.value,
                    "newpassword": this.f.newpassword.value,
                    "frontend": `${process.env.FRONTEND}`,
                    "next": `${process.env.NEXT}`,
                    "sessionid": this.sessionid
                })
                    .pipe(catchError(err => {
                        if (err.status === 401 || err.status === 500 || err.status === 501) {
                            // auto logout if 401 response returned from api
                            this.alertService.error('Error numero' + err.status + ' consumiendo servicio, por favor comunicarse con el administrador de la aplicación web.');
                        }
                        const error = err.error.message || err.statusText;
                        return throwError(error);
                    }))
                    .subscribe(data => {

                        if (data['status'] === `Internal Server Error`) {
                            this.alertService.error(data['message']);
                            this.router.navigate(['/changepassword']);
                        } else {
                            this.alertService.success(data['message']);
                            localStorage.setItem('message', JSON.stringify(data['message']));
                            //window.open(`${process.env.LOGIN}` + '/login', '_self');
                            this.router.navigate(['/login']);
                        }

                    },
                        error => {
                            this.alertService.error(error);
                        }
                    );
            } else {
                this.alertService.error("Por favor verifique los datos nueva contraseña ingresados, la " +
                    "contraseña debe contener letras, n&uacute;meros y un como mínimo un sibolo como [!#$%&/()=?'¡¿*/.].");
            }
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
                        }
                    }
                }
            },
                error => {
                    this.alertService.error(error);
                });
    }

    volveralogin() {
        console.log("Vamos al formulario loguear");
        this.router.navigate(['/login']);

    }

    validar_clave(clave) {
        var respuesta = 0;

        if ((this.validar_numeros(clave) === 1)) {
            respuesta = 1;
        }

        if ((this.validar_letrasMin(clave) === 1)) {
            respuesta = 1;
        }

        if ((this.validar_letrasMay(clave) === 1)) {
            respuesta = 1;
        }

        if ((this.validar_simbolosEsp(clave) === 1)) {
            respuesta = 1;
        }

        return respuesta;
    }

    validar_numeros(texto) {
        var letras = "0123456789"
        // valida si la clave tiene letras, numeros y almenos un caracter especial
        for (var i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) != -1) {
                return 1;
            }
        }
        return 0;
    }

    validar_letrasMin(texto) {
        var letras = "abcdefghijklmnñopqrstuvwxyz";
        // valida si la clave tiene letras, numeros y almenos un caracter especial
        for (var i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) != -1) {
                return 1;
            }
        }
        return 0;
    }

    validar_letrasMay(texto) {
        var letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
        // valida si la clave tiene letras, numeros y almenos un caracter especial
        for (var i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) != -1) {
                return 1;
            }
        }
        return 0;
    }

    validar_simbolosEsp(texto) {
        var letras = ".!#$%&/()=?¡'¿/*"
        // valida si la clave tiene letras, numeros y almenos un caracter especial
        for (var i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) != -1) {
                return 1;
            }
        }
        return 0;
    }


}
