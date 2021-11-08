import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {

    loadMenu: boolean = false;
    public sessionId: string;
    constructor(
    private rutaActiva: ActivatedRoute,
    private route: Router
    ) {

        
    }
    ngOnInit(){
        this.route.events.subscribe(
            params => {
                try {
                    this.sessionId = params['url'].split("=")[1];
                    localStorage.setItem("sessionid", this.sessionId);
					// if(localStorage.getItem("sessionid") != null){
                    //     this.sessionId = JSON.parse(localStorage.getItem("sessionid"))
                    // }
                    this.loadMenu = true;
                } catch (error) {
                    // this.sessionId = '';          
                }
            }
        );
    }
    
}