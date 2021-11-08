import * as tslib_1 from "tslib";
import { Component, Input, HostListener } from '@angular/core';
let BodyComponent = class BodyComponent {
    constructor() {
        this.toggleButton = false;
        this.date = new Date();
        setInterval(() => {
            this.date = new Date();
        }, 1000);
    }
    ngOnInit() {
    }
    onResize(event) {
        if (event.target.innerWidth > 850)
            this.toggleButton = false;
    }
    onToggleButton() {
        this.toggleButton = !this.toggleButton;
    }
};
tslib_1.__decorate([
    Input()
], BodyComponent.prototype, "sessionId", void 0);
tslib_1.__decorate([
    HostListener('window:resize', ['$event'])
], BodyComponent.prototype, "onResize", null);
BodyComponent = tslib_1.__decorate([
    Component({
        selector: 'app-body',
        template: "<!-- <div class=\"header-area\">\n    <div class=\"menuContainer\">\n        <div class=\"row t-container\">\n            <app-menu sessionId=\"966C67D95C8951C1CC98D64DB85AB655\"></app-menu>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-menu\">\n    <div class=\"container\" style=\"text-align: center;\">\n        <ng-content></ng-content>\n        \n        <br />\n    </div>\n    <app-footer></app-footer>\n</div> -->\n\n<div class=\"wrapper\">\n    <!-- Sidebar  -->\n    <app-menu [sessionId]=\"sessionId\" [toggleButton]=\"toggleButton\" #menu></app-menu>\n    <div (window:resize)=\"onResize($event)\"></div>\n    <!-- Page Content  -->\n    <div id=\"content\" [ngClass]=\"{'active': toggleButton}\">\n\n        <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n            <div class=\"container-fluid\">\n\n                <button type=\"button\" id=\"sidebarCollapse\" class=\"btn btn-info\" (click)=\"onToggleButton()\">\n                    <!-- <img src=\"node_modules/menu-cafecert-app/src/assets/images/align-left-solid.svg\" style=\"width: 15px;height: 15px;color:white\"> -->\n                    <i class=\"fas fa-align-left\"></i>\n                </button>\n                <img src=\"node_modules/menu-cafecert-app/src/assets/images/logo1.png\" alt=\"Logo\" class=\"text-left\">\n                <img src=\"node_modules/menu-cafecert-app/src/assets/images/logo2.png\" alt=\"Certificamos el caf\u00E9 de Colombia\"\n                    class=\"text-right\">\n            </div>\n        </nav>\n\n        <div class=\"row\">\n            <i class=\"far fa-user-circle\" style=\"font-size:50px;color:#881010;padding-left:40px\"></i>\n            <div class=\"col text-left\">\n                <div class=\"row\">\n                    <div class=\"col\">{{menu.user}}</div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">{{menu.role}}</div>\n                </div>\n            </div>\n\n            <div class=\"col text-right\" style=\"padding-right: 40px;\">\n                {{date | date: 'dd/MM/yyyy hh:mm:ss'}}\n            </div>\n        </div>\n        <hr>\n        <ng-content></ng-content>\n        <hr>\n        <app-footer></app-footer>\n    </div>\n\n</div>",
        styles: [".navbar{padding:15px 10px;background:#fff;border:none;border-radius:0;margin-bottom:20px;box-shadow:1px 1px 3px rgba(0,0,0,.1)}.navbar-btn{box-shadow:none;outline:0!important;border:none}.line{width:100%;height:1px;border-bottom:1px dashed #ddd;margin:40px 0}.wrapper{display:flex;width:100%;font-family:Verdana,sans-serif;font-size:14px}#sidebarCollapse{display:none;background-color:#b34a4a;border-color:#881010}#content{width:calc(100% - 250px);padding:20px 40px 80px;min-height:100vh;transition:.3s;position:absolute;top:0;right:0}#content.active{width:100%}@media (max-width:850px){#sidebarCollapse{display:block;transition:.3s}#content{width:100%}#content.active{width:calc(100% - 250px)}}"]
    })
], BodyComponent);
export { BodyComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tZW51LWNhZmVjZXJ0LWFwcC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ib2R5L2JvZHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNdkUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQU14QjtRQUhPLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLFNBQUksR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRzdCLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQUs7UUFDWixJQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUc7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNNLGNBQWM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDekMsQ0FBQztDQUNGLENBQUE7QUFwQlU7SUFBUixLQUFLLEVBQUU7Z0RBQW1CO0FBYTNCO0lBREMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzZDQUl6QztBQWxCVSxhQUFhO0lBTHpCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLGd2RUFBb0M7O0tBRXJDLENBQUM7R0FDVyxhQUFhLENBc0J6QjtTQXRCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1ib2R5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JvZHkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ib2R5LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBzZXNzaW9uSWQ6IHN0cmluZztcbiAgcHVibGljIHRvZ2dsZUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IFxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQpIHtcbiAgICBpZihldmVudC50YXJnZXQuaW5uZXJXaWR0aCA+IDg1MClcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IGZhbHNlO1xuICB9XG4gIHB1YmxpYyBvblRvZ2dsZUJ1dHRvbigpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9ICF0aGlzLnRvZ2dsZUJ1dHRvbjtcbiAgfVxufVxuIl19