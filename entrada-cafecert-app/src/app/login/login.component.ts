import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@/_services';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    foods: Array<any> = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private http: HttpClient

    ) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        console.log("mensaje: " + JSON.parse(localStorage.getItem('message')));
        if (JSON.parse(localStorage.getItem('message')) != null) {
            this.alertService.success(JSON.parse(localStorage.getItem('message')));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;


        if (validar_clave(this.f.password.value) === 1) {
            console.log(JSON.stringify({
                "frontend": `${process.env.FRONTEND}`,
                "next": `${process.env.NEXT}`,
                "username": this.f.username.value,
                "password": this.f.password.value,
                "portlet": "Sicert"
            }));
            this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/credentials/`, {
                "frontend": `${process.env.FRONTEND}`,
                "next": `${process.env.NEXT}`,
                "username": this.f.username.value,
                "password": this.f.password.value,
                "portlet": "Sicert"
            })
                .pipe(catchError(err => {
                    if (err.status === 401 || err.status === 500 || err.status === 501) {
                        // auto logout if 401 response returned from api
                        this.alertService.error('Error numero' + err.status + ' consumiendo servicio, por favor comunicarse con el administrador de la aplicación web.');
                        location.reload(true);
                    }
                    const error = err.error.message || err.statusText;
                    return throwError(error['message']);
                }))
                .subscribe(data => {
                    console.log("estado: " + data['status']);
                    if (data['status'] === `Internal Server Error`) {
                        this.alertService.error(data['message']);
                        this.router.navigate(['/']);
                    } else {
                        console.log("tipo inicio: " + data['starttype']);
                        if (data['starttype'] === `CAMBIO CLAVE`) {

                            localStorage.setItem("usersession", JSON.stringify(data['serverid']));
                            localStorage.setItem("username", JSON.stringify(this.f.username.value));
                            localStorage.setItem("userpassword", JSON.stringify(this.f.password.value));

                            this.router.navigate(['/changepassword']);
                        } else {
                            if (data['starttype'] === `NORMAL`) {
                                window.open(data['next'] + "?param=" + data['serverid'], '_self');
                            }
                        }
                    }
                    this.loading = false;
                },
                    error => {
                        this.alertService.error(error['message']);
                        this.loading = false;
                    }
                );
        } else {
            this.alertService.error("La credencial privada debe tener un tamaño de mínimo 8 y máximo 20 caracteres. Estos caracteres deben ser letras, números y símbolos especiales. Una de las letras debe ser mayúscula y uno de los caracteres debe ser especial como sigue ! # . $ % & / ( ) = ? ¡ ' ¿ / *");
            this.loading = false;
        }

        function validar_clave(clave) {
            var respuesta = 0;
            if ((validar_numeros(clave) === 1) &&
                (validar_letrasMin(clave) === 1) &&
                (validar_letrasMay(clave) === 1)
            ) {
                return 1;
            } else {
                return 0;
            }
        }

        function validar_numeros(texto) {
            var letras = "0123456789"
            // valida si la clave tiene letras, numeros y almenos un caracter especial
            for (var i = 0; i < texto.length; i++) {
                if (letras.indexOf(texto.charAt(i), 0) != -1) {
                    return 1;
                }
            }
            return 0;
        }

        function validar_letrasMin(texto) {
            var letras = "abcdefghijklmnñopqrstuvwxyz";
            // valida si la clave tiene letras, numeros y almenos un caracter especial
            for (var i = 0; i < texto.length; i++) {
                if (letras.indexOf(texto.charAt(i), 0) != -1) {
                    return 1;
                }
            }
            return 0;
        }

        function validar_letrasMay(texto) {
            var letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
            // valida si la clave tiene letras, numeros y almenos un caracter especial
            for (var i = 0; i < texto.length; i++) {
                if (letras.indexOf(texto.charAt(i), 0) != -1) {
                    return 1;
                }
            }
            return 0;
        }

        function validar_simbolosEsp(texto) {
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

    recuperrarclave() {
        console.log("Vamos al formulario recuperar clave");
        localStorage.setItem('message', null);
        this.router.navigate(['/recoverypassword']);

    }

}