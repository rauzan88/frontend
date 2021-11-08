import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var frontend = "http://192.168.169.142:8076";
var next = "http://192.168.169.142:8077";
var userbusiness = "http://192.168.169.142:8078";
var MenuComponent = /** @class */ (function () {
    function MenuComponent(http) {
        this.http = http;
        this.toggleButton = false;
        this.menu = [];
        this.showLogoutButton = false;
    }
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.validateSession(this.sessionId).subscribe(function (data) {
            if (data['status'] === "Internal Server Error") {
                // this.menu = JSON.parse('[{"menuid":"0","item":"Ocurrió un error, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
            }
            else {
                if (data['expired'] === "-1") {
                    // this.menu = JSON.parse('[{"menuid":"0","item":"Sesión ha expirado, el menú principal ha sido remplazado por este enlase debido, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
                }
                else {
                    if (data['role'] === null) {
                        _this.showLogoutButton = false;
                        // this.menu = JSON.parse('[{"menuid":"0","item":"No existe rol de usuario registrado en el sistema, el menú principal ha sido remplazado por este enlase, usted debe hacer click para volver a la pagina login","url":' + '"' + next + '"' + '}]');
                    }
                    else {
                        _this.showLogoutButton = true;
                        _this.role = data['role'];
                        _this.user = data['txFullUsername'];
                        _this.getMenuByRole(_this.sessionId, data['role'])
                            .subscribe(function (data) {
                            _this.menu = data;
                        });
                    }
                }
            }
        });
    };
    MenuComponent.prototype.chooseMenu = function (url) {
        window.open(url + "?param=" + this.sessionId, '_self');
    };
    MenuComponent.prototype.validateSession = function (sessionId) {
        var params = {
            frontend: frontend,
            next: next,
            sessionid: sessionId
        };
        var method = '/cafecert/findsession/';
        return this.http.post(userbusiness + method, params);
    };
    MenuComponent.prototype.getMenuByRole = function (sessionId, txRole) {
        var params = {
            "frontend": frontend,
            "next": next,
            "sessionid": sessionId,
            "txRole": txRole
        };
        var method = '/cafecert/menulist/';
        return this.http.post(userbusiness + method, params);
    };
    MenuComponent.prototype.logout = function () {
        var params = {
            "frontend": frontend,
            "logoutreason": "2",
            "next": next,
            "txlogoutreason": "Sesion cerrada por el usuario",
            "sessionid": this.sessionId
        };
        var method = '/cafecert/cerrarsesion/';
        this.http.post(userbusiness + method, params)
            .subscribe(function (data) {
            if (data['status'] === "Internal Server Error") {
                // this.router.navigate(['/cafecert/home/']);
                console.log("Service Error");
            }
            else {
                window.open(data['next'], '_self');
            }
        }, function (error) {
            console.log("Error");
        });
    };
    MenuComponent.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
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
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tZW51LWNhZmVjZXJ0LWFwcC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tZW51L21lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsSUFBTSxRQUFRLEdBQVcsNkJBQTZCLENBQUM7QUFDdkQsSUFBTSxJQUFJLEdBQVcsNkJBQTZCLENBQUM7QUFDbkQsSUFBTSxZQUFZLEdBQVcsNkJBQTZCLENBQUM7QUFPM0Q7SUFTRSx1QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQU4zQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUNoQyxTQUFJLEdBQWUsRUFBRSxDQUFDO1FBQ3RCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztJQUlELENBQUM7SUFFekMsZ0NBQVEsR0FBUjtRQUFBLGlCQXVCQztRQXRCQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLHVCQUF1QixFQUFFO2dCQUM5QywwTkFBME47YUFDM047aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM1Qiw0TkFBNE47aUJBQzdOO3FCQUFNO29CQUNMLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDekIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzt3QkFDOUIsb1BBQW9QO3FCQUNyUDt5QkFBTTt3QkFDTCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO3dCQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDekIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDbkMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDN0MsU0FBUyxDQUFDLFVBQUEsSUFBSTs0QkFDYixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLENBQUM7cUJBQ047aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSx1Q0FBZSxHQUF0QixVQUF1QixTQUFpQjtRQUN0QyxJQUFJLE1BQU0sR0FBRztZQUNYLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFHLHdCQUF3QixDQUFDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0scUNBQWEsR0FBcEIsVUFBcUIsU0FBaUIsRUFBRSxNQUFjO1FBQ3BELElBQUksTUFBTSxHQUFHO1lBQ1gsVUFBVSxFQUFFLFFBQVE7WUFDcEIsTUFBTSxFQUFFLElBQUk7WUFDWixXQUFXLEVBQUUsU0FBUztZQUN0QixRQUFRLEVBQUUsTUFBTTtTQUNqQixDQUFDO1FBQ0YsSUFBSSxNQUFNLEdBQUcscUJBQXFCLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBTSxZQUFZLEdBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSw4QkFBTSxHQUFiO1FBQ0UsSUFBSSxNQUFNLEdBQUc7WUFDWCxVQUFVLEVBQUUsUUFBUTtZQUNwQixjQUFjLEVBQUUsR0FBRztZQUNuQixNQUFNLEVBQUUsSUFBSTtZQUNaLGdCQUFnQixFQUFFLCtCQUErQjtZQUNqRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDNUIsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFHLHlCQUF5QixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLFlBQVksR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDO2FBQy9DLFNBQVMsQ0FDUixVQUFBLElBQUk7WUFDRixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyx1QkFBdUIsRUFBRTtnQkFDOUMsNkNBQTZDO2dCQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDOztnQkEzRXlCLFVBQVU7O0lBUDNCO1FBQVIsS0FBSyxFQUFFO29EQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTt1REFBK0I7SUFINUIsYUFBYTtRQUx6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixxbkJBQW9DOztTQUVyQyxDQUFDO09BQ1csYUFBYSxDQXFGekI7SUFBRCxvQkFBQztDQUFBLEFBckZELElBcUZDO1NBckZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuY29uc3QgZnJvbnRlbmQ6IHN0cmluZyA9IFwiaHR0cDovLzE5Mi4xNjguMTY5LjE0Mjo4MDc2XCI7XG5jb25zdCBuZXh0OiBzdHJpbmcgPSBcImh0dHA6Ly8xOTIuMTY4LjE2OS4xNDI6ODA3N1wiO1xuY29uc3QgdXNlcmJ1c2luZXNzOiBzdHJpbmcgPSBcImh0dHA6Ly8xOTIuMTY4LjE2OS4xNDI6ODA3OFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVudS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRvZ2dsZUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgbWVudTogQXJyYXk8YW55PiA9IFtdO1xuICBwdWJsaWMgc2hvd0xvZ291dEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcm9sZTogc3RyaW5nO1xuICBwdWJsaWMgdXNlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52YWxpZGF0ZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhWydzdGF0dXMnXSA9PT0gYEludGVybmFsIFNlcnZlciBFcnJvcmApIHtcbiAgICAgICAgLy8gdGhpcy5tZW51ID0gSlNPTi5wYXJzZSgnW3tcIm1lbnVpZFwiOlwiMFwiLFwiaXRlbVwiOlwiT2N1cnJpw7MgdW4gZXJyb3IsIGVsIG1lbsO6IHByaW5jaXBhbCBoYSBzaWRvIHJlbXBsYXphZG8gcG9yIGVzdGUgZW5sYXNlIGRlYmlkbywgdXN0ZWQgZGViZSBoYWNlciBjbGljayBwYXJhIHZvbHZlciBhIGxhIHBhZ2luYSBsb2dpblwiLFwidXJsXCI6JyArICdcIicgKyBuZXh0ICsgJ1wiJyArICd9XScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRhdGFbJ2V4cGlyZWQnXSA9PT0gYC0xYCkge1xuICAgICAgICAgIC8vIHRoaXMubWVudSA9IEpTT04ucGFyc2UoJ1t7XCJtZW51aWRcIjpcIjBcIixcIml0ZW1cIjpcIlNlc2nDs24gaGEgZXhwaXJhZG8sIGVsIG1lbsO6IHByaW5jaXBhbCBoYSBzaWRvIHJlbXBsYXphZG8gcG9yIGVzdGUgZW5sYXNlIGRlYmlkbywgdXN0ZWQgZGViZSBoYWNlciBjbGljayBwYXJhIHZvbHZlciBhIGxhIHBhZ2luYSBsb2dpblwiLFwidXJsXCI6JyArICdcIicgKyBuZXh0ICsgJ1wiJyArICd9XScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChkYXRhWydyb2xlJ10gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvZ291dEJ1dHRvbiA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGhpcy5tZW51ID0gSlNPTi5wYXJzZSgnW3tcIm1lbnVpZFwiOlwiMFwiLFwiaXRlbVwiOlwiTm8gZXhpc3RlIHJvbCBkZSB1c3VhcmlvIHJlZ2lzdHJhZG8gZW4gZWwgc2lzdGVtYSwgZWwgbWVuw7ogcHJpbmNpcGFsIGhhIHNpZG8gcmVtcGxhemFkbyBwb3IgZXN0ZSBlbmxhc2UsIHVzdGVkIGRlYmUgaGFjZXIgY2xpY2sgcGFyYSB2b2x2ZXIgYSBsYSBwYWdpbmEgbG9naW5cIixcInVybFwiOicgKyAnXCInICsgbmV4dCArICdcIicgKyAnfV0nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9nb3V0QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucm9sZSA9IGRhdGFbJ3JvbGUnXTtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IGRhdGFbJ3R4RnVsbFVzZXJuYW1lJ107XG4gICAgICAgICAgICB0aGlzLmdldE1lbnVCeVJvbGUodGhpcy5zZXNzaW9uSWQsIGRhdGFbJ3JvbGUnXSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUgPSBkYXRhO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNob29zZU1lbnUodXJsOiBzdHJpbmcpIHtcbiAgICB3aW5kb3cub3Blbih1cmwgKyBcIj9wYXJhbT1cIiArIHRoaXMuc2Vzc2lvbklkLCAnX3NlbGYnKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZVNlc3Npb24oc2Vzc2lvbklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBmcm9udGVuZDogZnJvbnRlbmQsXG4gICAgICBuZXh0OiBuZXh0LFxuICAgICAgc2Vzc2lvbmlkOiBzZXNzaW9uSWRcbiAgICB9O1xuICAgIGxldCBtZXRob2QgPSAnL2NhZmVjZXJ0L2ZpbmRzZXNzaW9uLyc7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVzZXJidXNpbmVzcyArIG1ldGhvZCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNZW51QnlSb2xlKHNlc3Npb25JZDogc3RyaW5nLCB0eFJvbGU6IHN0cmluZykge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBcImZyb250ZW5kXCI6IGZyb250ZW5kLFxuICAgICAgXCJuZXh0XCI6IG5leHQsXG4gICAgICBcInNlc3Npb25pZFwiOiBzZXNzaW9uSWQsXG4gICAgICBcInR4Um9sZVwiOiB0eFJvbGVcbiAgICB9O1xuICAgIGxldCBtZXRob2QgPSAnL2NhZmVjZXJ0L21lbnVsaXN0Lyc7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odXNlcmJ1c2luZXNzICsgbWV0aG9kLCBwYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGxvZ291dCgpIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgXCJmcm9udGVuZFwiOiBmcm9udGVuZCxcbiAgICAgIFwibG9nb3V0cmVhc29uXCI6IFwiMlwiLFxuICAgICAgXCJuZXh0XCI6IG5leHQsXG4gICAgICBcInR4bG9nb3V0cmVhc29uXCI6IFwiU2VzaW9uIGNlcnJhZGEgcG9yIGVsIHVzdWFyaW9cIixcbiAgICAgIFwic2Vzc2lvbmlkXCI6IHRoaXMuc2Vzc2lvbklkXG4gICAgfTtcbiAgICBsZXQgbWV0aG9kID0gJy9jYWZlY2VydC9jZXJyYXJzZXNpb24vJztcbiAgICB0aGlzLmh0dHAucG9zdDxhbnk+KHVzZXJidXNpbmVzcyArIG1ldGhvZCwgcGFyYW1zKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGFbJ3N0YXR1cyddID09PSBgSW50ZXJuYWwgU2VydmVyIEVycm9yYCkge1xuICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2FmZWNlcnQvaG9tZS8nXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZpY2UgRXJyb3JcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGRhdGFbJ25leHQnXSwgJ19zZWxmJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxufVxuIl19