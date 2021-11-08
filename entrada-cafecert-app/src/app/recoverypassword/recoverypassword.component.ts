import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@/_services';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({ templateUrl: 'recoverypassword.component.html' })
export class RecoverypasswordComponent implements OnInit {
    recoveryForm: FormGroup;
    submitted = false;
    returnUrl: string;
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
        this.router.navigate(['/recoverypassword']);

    }

    ngOnInit() {
        console.log("estoy en el init recuperar clave");
        this.recoveryForm = this.formBuilder.group({
            username: ['', Validators.required]
        });
     }

    // convenience getter for easy access to form fields
    get f() { return this.recoveryForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.recoveryForm.invalid) {
            console.log("this.loginForm.invalid: " + this.recoveryForm.invalid);
            console.log("this.loginForm.errors: " + this.recoveryForm.errors);
            return;
        } else {
            this.http.post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/recoverypassword/`, {
                "frontend": `${process.env.FRONTEND}`,
                "next": `${process.env.NEXT}`,
                "application": "Sicert",
                "username": this.f.username.value
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
                        console.log("mensaje de error: " + data['message']);
                        this.alertService.error(data['message']);
                        this.router.navigate(['/recoverypassword']);
                    } else {
                        console.log("mensaje de ok: " + data['message']);
                        this.alertService.success(data['message']);
                        localStorage.setItem('message', JSON.stringify(data['message']));
                        //this.router.navigate(['/login']);
                    }
                },
                    error => {
                        this.alertService.error(error);
                    }
                );
        }
    }

    volveralogin() {
        console.log("Vamos al formulario loguear");
        this.router.navigate(['/login']);

    }

}
