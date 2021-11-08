import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {

    loadMenu: boolean = false;
    public sessionId: string;
    public show: boolean = false;
    constructor(
        private rutaActiva: ActivatedRoute,
        private route: Router
    ) {

    }

    ngOnInit() {
        // console.log("sesion desde App a: ");
        // this.rutaActiva.queryParams.subscribe(params => {
        //     this.sessionId = params['param'];
        //     this.show = true;
        // });
        console.log("Entra a componente y llama al menu");
        this.route.events.subscribe(
            params => {
                try {
                    this.sessionId = params['url'].split("=")[1];
                    let sessionStorage = localStorage.getItem("sessionid");
                    if (sessionStorage != null) {
                        try {
                            JSON.parse(sessionStorage);
                            if (this.sessionId != JSON.parse(sessionStorage)) {
                                if (this.sessionId != undefined) {
                                    localStorage.setItem('sessionid', JSON.stringify(this.sessionId));
                                } else {
                                    this.sessionId = JSON.parse(sessionStorage);
                                }
                            }
                        } catch (error) {
                            if (this.sessionId != undefined) {
                                localStorage.setItem('sessionid', JSON.stringify(this.sessionId));
                            }
                        }
                    } else {
                        if (this.sessionId != undefined) {
                            localStorage.setItem('sessionid', JSON.stringify(this.sessionId));
                        }
                    }
                    this.loadMenu = true;
                } catch (error) {
                }
            }
        );
    }


}