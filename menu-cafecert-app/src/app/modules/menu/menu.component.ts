import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const frontend: string = "http://192.168.169.142:8076";
const next: string = "http://192.168.169.142:8077";
const userbusiness: string = "http://192.168.169.142:8078";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() sessionId: string;
  @Input() toggleButton: boolean = false;
  public menu: Array<any> = [];
  public showLogoutButton: boolean = false;
  public role: string;
  public user: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.validateSession(this.sessionId).subscribe(data => {
      if (data['status'] === `Internal Server Error`) {
        // this.menu = JSON.parse('[{"menuid":"0","item":"Ocurrió un error, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
      } else {
        if (data['expired'] === `-1`) {
          // this.menu = JSON.parse('[{"menuid":"0","item":"Sesión ha expirado, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
        } else {
          if (data['role'] === null) {
            this.showLogoutButton = false;
            // this.menu = JSON.parse('[{"menuid":"0","item":"No existe rol de usuario registrado en el sistema, el menú principal ha sido remplazado por este enlase, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
          } else {
            this.showLogoutButton = true;
            this.role = data['role'];
            this.user = data['txFullUsername'];
            console.log("this.sessionId: " + this.sessionId);
            //console.log("data['role']: " +data['role']);
            this.getMenuByRole(this.sessionId, data['role'])
              .subscribe(data => {
                this.menu = data;
              });
          }
        }
      }
    });
  }

  chooseMenu(url: string) {
    window.open(url + "?param=" + this.sessionId, '_self');
  }

  public validateSession(sessionId: string): Observable<any> {
    let params = {
      frontend: frontend,
      next: next,
      sessionid: sessionId
    };
    let method = '/cafecert/findsession/';
    return this.http.post(userbusiness + method, params);
  }

  public getMenuByRole(sessionId: string, txRole: string) {
    let params = {
      "frontend": frontend,
      "next": next,
      "sessionid": sessionId,
      "txRole": txRole
    };
    let method = '/cafecert/menulist/';
    return this.http.post<any>(userbusiness + method, params);
  }

  public logout() {
    let params = {
      "frontend": frontend,
      "logoutreason": "2",
      "next": next,
      "txlogoutreason": "Sesion cerrada por el usuario",
      "sessionid": this.sessionId
    };
    let method = '/cafecert/cerrarsesion/';
    this.http.post<any>(userbusiness + method, params)
      .subscribe(
        data => {
          if (data['status'] === `Internal Server Error`) {
            // this.router.navigate(['/cafecert/home/']);
            console.log("Service Error");
          } else {
            window.open(data['next'], '_self');
          }
        },
        error => {
          console.log("Error");
        }
      );
  }
}
