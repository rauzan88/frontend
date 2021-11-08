import * as tslib_1 from "tslib";
import { Component, Input, HostListener } from '@angular/core';
var BodyComponent = /** @class */ (function () {
    function BodyComponent() {
        var _this = this;
        this.toggleButton = false;
        this.date = new Date();
        setInterval(function () {
            _this.date = new Date();
        }, 1000);
    }
    BodyComponent.prototype.ngOnInit = function () {
    };
    BodyComponent.prototype.onResize = function (event) {
        if (event.target.innerWidth > 850)
            this.toggleButton = false;
    };
    BodyComponent.prototype.onToggleButton = function () {
        this.toggleButton = !this.toggleButton;
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
    return BodyComponent;
}());
export { BodyComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tZW51LWNhZmVjZXJ0LWFwcC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ib2R5L2JvZHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNdkU7SUFNRTtRQUFBLGlCQUlDO1FBUE0saUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsU0FBSSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFHN0IsV0FBVyxDQUFDO1lBQ1YsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELGdDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osSUFBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDTSxzQ0FBYyxHQUFyQjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3pDLENBQUM7SUFuQlE7UUFBUixLQUFLLEVBQUU7b0RBQW1CO0lBYTNCO1FBREMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lEQUl6QztJQWxCVSxhQUFhO1FBTHpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLGd2RUFBb0M7O1NBRXJDLENBQUM7T0FDVyxhQUFhLENBc0J6QjtJQUFELG9CQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYm9keS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQm9keUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIHB1YmxpYyB0b2dnbGVCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyBcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgaWYoZXZlbnQudGFyZ2V0LmlubmVyV2lkdGggPiA4NTApXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSBmYWxzZTtcbiAgfVxuICBwdWJsaWMgb25Ub2dnbGVCdXR0b24oKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSAhdGhpcy50b2dnbGVCdXR0b247XG4gIH1cbn1cbiJdfQ==