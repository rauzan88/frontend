import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService} from '@/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    homeForm: FormGroup;
    loading = false;
    submitted = false;
    sessionId: any;
    constructor(
        private formBuilder: FormBuilder,
        private rutaActiva: ActivatedRoute
    ) {

    }

    ngOnInit() {
       
        this.rutaActiva.queryParams.subscribe(params => {
            console.log("desde queryparam: "+params['param']);

        });
        this.rutaActiva.queryParams.subscribe(params => {
            this.sessionId = params['param'];
        });
        this.rutaActiva.params.subscribe(
            (params: Params) => {
              console.log("desde home: " +params.param);

            }
          );
        this.homeForm = this.formBuilder.group({
        });
    }

}
