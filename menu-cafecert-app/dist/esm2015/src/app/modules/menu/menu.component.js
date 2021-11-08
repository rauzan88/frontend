import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const frontend = "http://192.168.169.142:8076";
const next = "http://192.168.169.142:8077";
const userbusiness = "http://192.168.169.142:8078";
let MenuComponent = class MenuComponent {
    constructor(http) {
        this.http = http;
        this.toggleButton = false;
        this.menu = [];
        this.showLogoutButton = false;
    }
    ngOnInit() {
        this.validateSession(this.sessionId).subscribe(data => {
            if (data['status'] === `Internal Server Error`) {
                // this.menu = JSON.parse('[{"menuid":"0","item":"Ocurrió un error, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
            }
            else {
                if (data['expired'] === `-1`) {
                    // this.menu = JSON.parse('[{"menuid":"0","item":"Sesión ha expirado, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
                }
                else {
                    if (data['role'] === null) {
                        this.showLogoutButton = false;
                        // this.menu = JSON.parse('[{"menuid":"0","item":"No existe rol de usuario registrado en el sistema, el menú principal ha sido remplazado por este enlase, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
                    }
                    else {
                        this.showLogoutButton = true;
                        this.role = data['role'];
                        this.user = data['txFullUsername'];
                        this.getMenuByRole(this.sessionId, data['role'])
                            .subscribe(data => {
                            this.menu = data;
                        });
                    }
                }
            }
        });
    }
    chooseMenu(url) {
        window.open(url + "?param=" + this.sessionId, '_self');
    }
    validateSession(sessionId) {
        let params = {
            frontend: frontend,
            next: next,
            sessionid: sessionId
        };
        let method = '/cafecert/findsession/';
        return this.http.post(userbusiness + method, params);
    }
    getMenuByRole(sessionId, txRole) {
        let params = {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionId,
            "txRole": txRole
        };
        let method = '/cafecert/menulist/';
        return this.http.post(userbusiness + method, params);
    }
    logout() {
        let params = {
            "frontend": frontend,
            "logoutreason": "2",
            "next": next,
            "txlogoutreason": "Sesion cerrada por el usuario",
            "sessionid": this.sessionId
        };
        let method = '/cafecert/cerrarsesion/';
        this.http.post(userbusiness + method, params)
            .subscribe(data => {
            if (data['status'] === `Internal Server Error`) {
                // this.router.navigate(['/cafecert/home/']);
                console.log("Service Error");
            }
            else {
                window.open(data['next'], '_self');
            }
        }, error => {
            console.log("Error");
        });
    }
};
MenuComponent.ctorParameters = () => [
    { type: HttpClient }
];
tslib_1.__decorate([
    Input()
], MenuComponent.prototype, "sessionId", void 0);
tslib_1.__decorate([
    Input()
], MenuComponent.prototype, "toggleButton", void 0);
MenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menu',
        template: "<nav id=\"sidebar\" style=\"height: 100%;\" [ngClass]=\"{'active': toggleButton}\">\n  <div class=\"sidebar-header\">\n\n  </div>\n\n  <ul class=\"list-unstyled components\">\n    <div *ngFor=\"let enlace of menu\">\n      <li>\n        <a class=\"btn text-left\" (click)=\"chooseMenu(enlace.url)\">{{enlace.item}}</a>\n      </li>\n      <hr style=\"border-color: white; margin-top:0px; margin-bottom: 0px\">\n    </div>\n\n\n    <li>\n      <a class=\"btn text-left\" (click)=\"logout()\">Cerrar Sesi\u00F3n</a>\n    </li>\n    <hr style=\"border-color: white; margin-top:0px; margin-bottom: 0px\">\n  </ul>\n</nav>",
        styles: ["a,a:focus,a:hover{color:inherit;font-family:Verdana,sans-serif;font-size:14px;text-decoration:none;transition:.1s}a[data-toggle=collapse]{position:relative}#sidebar{width:250px;position:fixed;top:0;left:0;height:100vh;z-index:999;background:#ccc;color:#fff;transition:.3s}#sidebar.active{margin-left:-250px}#sidebar .sidebar-header{padding:50px;background:#ccc}#sidebar ul.components{background-color:#881010}#sidebar ul p{color:#fff;padding:10px}#sidebar ul li a{padding:10px;display:block}#sidebar ul li a:hover{color:#fff;background:#b34a4a}#sidebar ul li.active>a,a[aria-expanded=true]{color:#fff;background:#ccc}ul ul a{font-size:.9em!important;padding-left:30px!important;background:#ccc}@media (max-width:850px){#sidebar{margin-left:-250px}#sidebar.active{margin-left:0}}"]
    })
], MenuComponent);
export { MenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tZW51LWNhZmVjZXJ0LWFwcC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tZW51L21lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsTUFBTSxRQUFRLEdBQVcsNkJBQTZCLENBQUM7QUFDdkQsTUFBTSxJQUFJLEdBQVcsNkJBQTZCLENBQUM7QUFDbkQsTUFBTSxZQUFZLEdBQVcsNkJBQTZCLENBQUM7QUFPM0QsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVN4QixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTjNCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQ2hDLFNBQUksR0FBZSxFQUFFLENBQUM7UUFDdEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO0lBSUQsQ0FBQztJQUV6QyxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLHVCQUF1QixFQUFFO2dCQUM5QywwTkFBME47YUFDM047aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM1Qiw0TkFBNE47aUJBQzdOO3FCQUFNO29CQUNMLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzt3QkFDOUIsb1BBQW9QO3FCQUNyUDt5QkFBTTt3QkFDTCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO3dCQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLENBQUM7cUJBQ047aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxlQUFlLENBQUMsU0FBaUI7UUFDdEMsSUFBSSxNQUFNLEdBQUc7WUFDWCxRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUUsSUFBSTtZQUNWLFNBQVMsRUFBRSxTQUFTO1NBQ3JCLENBQUM7UUFDRixJQUFJLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLGFBQWEsQ0FBQyxTQUFpQixFQUFFLE1BQWM7UUFDcEQsSUFBSSxNQUFNLEdBQUc7WUFDWCxVQUFVLEVBQUUsUUFBUTtZQUNwQixNQUFNLEVBQUUsSUFBSTtZQUNaLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFFBQVEsRUFBRSxNQUFNO1NBQ2pCLENBQUM7UUFDRixJQUFJLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLFlBQVksR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLE1BQU0sR0FBRztZQUNYLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1lBQ1osZ0JBQWdCLEVBQUUsK0JBQStCO1lBQ2pELFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUztTQUM1QixDQUFDO1FBQ0YsSUFBSSxNQUFNLEdBQUcseUJBQXlCLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0sWUFBWSxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUM7YUFDL0MsU0FBUyxDQUNSLElBQUksQ0FBQyxFQUFFO1lBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssdUJBQXVCLEVBQUU7Z0JBQzlDLDZDQUE2QztnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNwQztRQUNILENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRTtZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0NBQ0YsQ0FBQTs7WUE1RTJCLFVBQVU7O0FBUDNCO0lBQVIsS0FBSyxFQUFFO2dEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTttREFBK0I7QUFINUIsYUFBYTtJQUx6QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixxbkJBQW9DOztLQUVyQyxDQUFDO0dBQ1csYUFBYSxDQXFGekI7U0FyRlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5jb25zdCBmcm9udGVuZDogc3RyaW5nID0gXCJodHRwOi8vMTkyLjE2OC4xNjkuMTQyOjgwNzZcIjtcbmNvbnN0IG5leHQ6IHN0cmluZyA9IFwiaHR0cDovLzE5Mi4xNjguMTY5LjE0Mjo4MDc3XCI7XG5jb25zdCB1c2VyYnVzaW5lc3M6IHN0cmluZyA9IFwiaHR0cDovLzE5Mi4xNjguMTY5LjE0Mjo4MDc4XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZW51LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBzZXNzaW9uSWQ6IHN0cmluZztcbiAgQElucHV0KCkgdG9nZ2xlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBtZW51OiBBcnJheTxhbnk+ID0gW107XG4gIHB1YmxpYyBzaG93TG9nb3V0QnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyByb2xlOiBzdHJpbmc7XG4gIHB1YmxpYyB1c2VyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnZhbGlkYXRlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGFbJ3N0YXR1cyddID09PSBgSW50ZXJuYWwgU2VydmVyIEVycm9yYCkge1xuICAgICAgICAvLyB0aGlzLm1lbnUgPSBKU09OLnBhcnNlKCdbe1wibWVudWlkXCI6XCIwXCIsXCJpdGVtXCI6XCJPY3VycmnDsyB1biBlcnJvciwgZWwgbWVuw7ogcHJpbmNpcGFsIGhhIHNpZG8gcmVtcGxhemFkbyBwb3IgZXN0ZSBlbmxhc2UgZGViaWRvLCB1c3RlZCBkZWJlIGhhY2VyIGNsaWNrIHBhcmEgdm9sdmVyIGEgbGEgcGFnaW5hIGxvZ2luXCIsXCJ1cmxcIjonICsgJ1wiJyArIG5leHQgKyAnXCInICsgJ31dJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGF0YVsnZXhwaXJlZCddID09PSBgLTFgKSB7XG4gICAgICAgICAgLy8gdGhpcy5tZW51ID0gSlNPTi5wYXJzZSgnW3tcIm1lbnVpZFwiOlwiMFwiLFwiaXRlbVwiOlwiU2VzacOzbiBoYSBleHBpcmFkbywgZWwgbWVuw7ogcHJpbmNpcGFsIGhhIHNpZG8gcmVtcGxhemFkbyBwb3IgZXN0ZSBlbmxhc2UgZGViaWRvLCB1c3RlZCBkZWJlIGhhY2VyIGNsaWNrIHBhcmEgdm9sdmVyIGEgbGEgcGFnaW5hIGxvZ2luXCIsXCJ1cmxcIjonICsgJ1wiJyArIG5leHQgKyAnXCInICsgJ31dJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGRhdGFbJ3JvbGUnXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9nb3V0QnV0dG9uID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB0aGlzLm1lbnUgPSBKU09OLnBhcnNlKCdbe1wibWVudWlkXCI6XCIwXCIsXCJpdGVtXCI6XCJObyBleGlzdGUgcm9sIGRlIHVzdWFyaW8gcmVnaXN0cmFkbyBlbiBlbCBzaXN0ZW1hLCBlbCBtZW7DuiBwcmluY2lwYWwgaGEgc2lkbyByZW1wbGF6YWRvIHBvciBlc3RlIGVubGFzZSwgdXN0ZWQgZGViZSBoYWNlciBjbGljayBwYXJhIHZvbHZlciBhIGxhIHBhZ2luYSBsb2dpblwiLFwidXJsXCI6JyArICdcIicgKyBuZXh0ICsgJ1wiJyArICd9XScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dMb2dvdXRCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yb2xlID0gZGF0YVsncm9sZSddO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gZGF0YVsndHhGdWxsVXNlcm5hbWUnXTtcbiAgICAgICAgICAgIHRoaXMuZ2V0TWVudUJ5Um9sZSh0aGlzLnNlc3Npb25JZCwgZGF0YVsncm9sZSddKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudSA9IGRhdGE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2hvb3NlTWVudSh1cmw6IHN0cmluZykge1xuICAgIHdpbmRvdy5vcGVuKHVybCArIFwiP3BhcmFtPVwiICsgdGhpcy5zZXNzaW9uSWQsICdfc2VsZicpO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlU2Vzc2lvbihzZXNzaW9uSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIGZyb250ZW5kOiBmcm9udGVuZCxcbiAgICAgIG5leHQ6IG5leHQsXG4gICAgICBzZXNzaW9uaWQ6IHNlc3Npb25JZFxuICAgIH07XG4gICAgbGV0IG1ldGhvZCA9ICcvY2FmZWNlcnQvZmluZHNlc3Npb24vJztcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXNlcmJ1c2luZXNzICsgbWV0aG9kLCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGdldE1lbnVCeVJvbGUoc2Vzc2lvbklkOiBzdHJpbmcsIHR4Um9sZTogc3RyaW5nKSB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIFwiZnJvbnRlbmRcIjogZnJvbnRlbmQsXG4gICAgICBcIm5leHRcIjogbmV4dCxcbiAgICAgIFwic2Vzc2lvbmlkXCI6IHNlc3Npb25JZCxcbiAgICAgIFwidHhSb2xlXCI6IHR4Um9sZVxuICAgIH07XG4gICAgbGV0IG1ldGhvZCA9ICcvY2FmZWNlcnQvbWVudWxpc3QvJztcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55Pih1c2VyYnVzaW5lc3MgKyBtZXRob2QsIHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgbG9nb3V0KCkge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBcImZyb250ZW5kXCI6IGZyb250ZW5kLFxuICAgICAgXCJsb2dvdXRyZWFzb25cIjogXCIyXCIsXG4gICAgICBcIm5leHRcIjogbmV4dCxcbiAgICAgIFwidHhsb2dvdXRyZWFzb25cIjogXCJTZXNpb24gY2VycmFkYSBwb3IgZWwgdXN1YXJpb1wiLFxuICAgICAgXCJzZXNzaW9uaWRcIjogdGhpcy5zZXNzaW9uSWRcbiAgICB9O1xuICAgIGxldCBtZXRob2QgPSAnL2NhZmVjZXJ0L2NlcnJhcnNlc2lvbi8nO1xuICAgIHRoaXMuaHR0cC5wb3N0PGFueT4odXNlcmJ1c2luZXNzICsgbWV0aG9kLCBwYXJhbXMpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICBpZiAoZGF0YVsnc3RhdHVzJ10gPT09IGBJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JgKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jYWZlY2VydC9ob21lLyddKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VydmljZSBFcnJvclwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oZGF0YVsnbmV4dCddLCAnX3NlbGYnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG59XG4iXX0=