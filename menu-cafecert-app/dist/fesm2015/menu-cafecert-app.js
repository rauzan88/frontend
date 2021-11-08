import { __decorate } from 'tslib';
import { Input, HostListener, Component, NgModule, ElementRef, Renderer2, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
__decorate([
    Input()
], BodyComponent.prototype, "sessionId", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], BodyComponent.prototype, "onResize", null);
BodyComponent = __decorate([
    Component({
        selector: 'app-body',
        template: "<!-- <div class=\"header-area\">\n    <div class=\"menuContainer\">\n        <div class=\"row t-container\">\n            <app-menu sessionId=\"966C67D95C8951C1CC98D64DB85AB655\"></app-menu>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-menu\">\n    <div class=\"container\" style=\"text-align: center;\">\n        <ng-content></ng-content>\n        \n        <br />\n    </div>\n    <app-footer></app-footer>\n</div> -->\n\n<div class=\"wrapper\">\n    <!-- Sidebar  -->\n    <app-menu [sessionId]=\"sessionId\" [toggleButton]=\"toggleButton\" #menu></app-menu>\n    <div (window:resize)=\"onResize($event)\"></div>\n    <!-- Page Content  -->\n    <div id=\"content\" [ngClass]=\"{'active': toggleButton}\">\n\n        <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n            <div class=\"container-fluid\">\n\n                <button type=\"button\" id=\"sidebarCollapse\" class=\"btn btn-info\" (click)=\"onToggleButton()\">\n                    <!-- <img src=\"node_modules/menu-cafecert-app/src/assets/images/align-left-solid.svg\" style=\"width: 15px;height: 15px;color:white\"> -->\n                    <i class=\"fas fa-align-left\"></i>\n                </button>\n                <img src=\"node_modules/menu-cafecert-app/src/assets/images/logo1.png\" alt=\"Logo\" class=\"text-left\">\n                <img src=\"node_modules/menu-cafecert-app/src/assets/images/logo2.png\" alt=\"Certificamos el caf\u00E9 de Colombia\"\n                    class=\"text-right\">\n            </div>\n        </nav>\n\n        <div class=\"row\">\n            <i class=\"far fa-user-circle\" style=\"font-size:50px;color:#881010;padding-left:40px\"></i>\n            <div class=\"col text-left\">\n                <div class=\"row\">\n                    <div class=\"col\">{{menu.user}}</div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">{{menu.role}}</div>\n                </div>\n            </div>\n\n            <div class=\"col text-right\" style=\"padding-right: 40px;\">\n                {{date | date: 'dd/MM/yyyy hh:mm:ss'}}\n            </div>\n        </div>\n        <hr>\n        <ng-content></ng-content>\n        <hr>\n        <app-footer></app-footer>\n    </div>\n\n</div>",
        styles: [".navbar{padding:15px 10px;background:#fff;border:none;border-radius:0;margin-bottom:20px;box-shadow:1px 1px 3px rgba(0,0,0,.1)}.navbar-btn{box-shadow:none;outline:0!important;border:none}.line{width:100%;height:1px;border-bottom:1px dashed #ddd;margin:40px 0}.wrapper{display:flex;width:100%;font-family:Verdana,sans-serif;font-size:14px}#sidebarCollapse{display:none;background-color:#b34a4a;border-color:#881010}#content{width:calc(100% - 250px);padding:20px 40px 80px;min-height:100vh;transition:.3s;position:absolute;top:0;right:0}#content.active{width:100%}@media (max-width:850px){#sidebarCollapse{display:block;transition:.3s}#content{width:100%}#content.active{width:calc(100% - 250px)}}"]
    })
], BodyComponent);

let FooterComponent = class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
};
FooterComponent = __decorate([
    Component({
        selector: 'app-footer',
        template: "<footer class=\"footer\">\n    <div class=\"footer-bottom\">\n        <div class=\"text-center\">\n            <label>\n                CAFECERT - Bogot\u00E1 D.C.- Colombia - 2020\n            </label>\n        </div>\n    </div>\n</footer>",
        styles: [".footer{padding:0;position:absolute;bottom:0;left:0;width:100%}.footer-bottom{padding:10px 0;text-align:center;color:#fff;background-color:#881010}"]
    })
], FooterComponent);

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
__decorate([
    Input()
], MenuComponent.prototype, "sessionId", void 0);
__decorate([
    Input()
], MenuComponent.prototype, "toggleButton", void 0);
MenuComponent = __decorate([
    Component({
        selector: 'app-menu',
        template: "<nav id=\"sidebar\" style=\"height: 100%;\" [ngClass]=\"{'active': toggleButton}\">\n  <div class=\"sidebar-header\">\n\n  </div>\n\n  <ul class=\"list-unstyled components\">\n    <div *ngFor=\"let enlace of menu\">\n      <li>\n        <a class=\"btn text-left\" (click)=\"chooseMenu(enlace.url)\">{{enlace.item}}</a>\n      </li>\n      <hr style=\"border-color: white; margin-top:0px; margin-bottom: 0px\">\n    </div>\n\n\n    <li>\n      <a class=\"btn text-left\" (click)=\"logout()\">Cerrar Sesi\u00F3n</a>\n    </li>\n    <hr style=\"border-color: white; margin-top:0px; margin-bottom: 0px\">\n  </ul>\n</nav>",
        styles: ["a,a:focus,a:hover{color:inherit;font-family:Verdana,sans-serif;font-size:14px;text-decoration:none;transition:.1s}a[data-toggle=collapse]{position:relative}#sidebar{width:250px;position:fixed;top:0;left:0;height:100vh;z-index:999;background:#ccc;color:#fff;transition:.3s}#sidebar.active{margin-left:-250px}#sidebar .sidebar-header{padding:50px;background:#ccc}#sidebar ul.components{background-color:#881010}#sidebar ul p{color:#fff;padding:10px}#sidebar ul li a{padding:10px;display:block}#sidebar ul li a:hover{color:#fff;background:#b34a4a}#sidebar ul li.active>a,a[aria-expanded=true]{color:#fff;background:#ccc}ul ul a{font-size:.9em!important;padding-left:30px!important;background:#ccc}@media (max-width:850px){#sidebar{margin-left:-250px}#sidebar.active{margin-left:0}}"]
    })
], MenuComponent);

// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
let BodyModule = class BodyModule {
};
BodyModule = __decorate([
    NgModule({
        declarations: [BodyComponent, MenuComponent, FooterComponent],
        imports: [
            CommonModule,
            BrowserModule,
        ], exports: [BodyComponent, MenuComponent, FooterComponent]
    })
], BodyModule);

let DatatableDirective = class DatatableDirective {
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.options = {};
        this.data = [];
        this.rows = [];
        this.listRowSize = [10, 25, 50, 100];
        this.itemsPerPage = this.listRowSize[0];
        this.minRow = 0;
        this.maxRow = this.itemsPerPage;
        this.paginationList = [];
        this.selectedPage = 0;
        this.maxPage = 0;
        this.tableHeight = 0;
        this.minPageShow = 0;
        this.pageLength = 8;
        this.maxPageShow = this.pageLength;
    }
    ngAfterContentInit() {
        let el = this.elRef.nativeElement.children;
        let tBodyT = el[1];
        this.rows = Array.prototype.slice.call(tBodyT.children);
        this.data = this.rows;
    }
    ngAfterViewInit() {
        this.createDataTable();
    }
    createDataTable() {
        this.createTable();
        let parent = this.elRef.nativeElement.parentNode;
        let divElement = this.renderer.createElement("div");
        this.renderer.insertBefore(parent, divElement, this.elRef.nativeElement);
        this.renderer.removeChild(parent, this.elRef.nativeElement);
        this.renderer.appendChild(divElement, this.elRef.nativeElement);
        /* VALIDACIÓN ITEMS POR PÁGINA */
        let validateSelect = false;
        try {
            let selectList = parent.firstChild.firstChild.children;
            if (selectList[1].nodeName == 'SELECT') {
                // Ya existe
                validateSelect = true;
            }
        }
        catch (error) {
        }
        if (validateSelect) {
            this.renderer.removeChild(parent, parent.firstChild);
        }
        this.renderer.insertBefore(divElement, this.createShow(), this.elRef.nativeElement);
        /* VALIDACIÓN PAGINADOR */
        let validateUl = false;
        try {
            let ulList = parent.lastChild.lastChild;
            if (ulList.nodeName == 'UL') {
                // Ya existe
                validateUl = true;
            }
        }
        catch (error) {
        }
        if (validateUl) {
            this.renderer.removeChild(parent, parent.lastChild);
        }
        this.renderer.appendChild(divElement, this.createPaginator());
    }
    createShow() {
        let divPanelShowList = this.renderer.createElement("div");
        this.renderer.addClass(divPanelShowList, 'row');
        let divShowList = this.renderer.createElement("div");
        this.renderer.setStyle(divShowList, 'padding', '20px 0px 10px 50px');
        this.renderer.addClass(divShowList, 'col');
        let labelShow = this.renderer.createElement('label');
        this.renderer.setStyle(labelShow, 'padding-right', '10px');
        let textShow = this.renderer.createText("Mostrar");
        this.renderer.appendChild(labelShow, textShow);
        this.renderer.appendChild(divShowList, labelShow);
        let selectShowList = this.renderer.createElement('select');
        this.renderer.setStyle(selectShowList, 'height', '20px');
        this.listRowSize.forEach(value => {
            let option = this.renderer.createElement('option');
            option.value = String(value);
            if (value == this.itemsPerPage) {
                option.selected = true;
            }
            let textOption = this.renderer.createText(String(value));
            // this.renderer.setValue(option, String(value));
            this.renderer.appendChild(option, textOption);
            this.renderer.appendChild(selectShowList, option);
            // this.renderer.listen(option, 'click', (event) => this.onChangePag(event));
        });
        this.renderer.appendChild(divShowList, selectShowList);
        let labelRegisterShow = this.renderer.createElement('label');
        this.renderer.setStyle(labelRegisterShow, 'padding-left', '10px');
        let textRegisterShow = this.renderer.createText("registros");
        this.renderer.appendChild(labelRegisterShow, textRegisterShow);
        this.renderer.appendChild(divShowList, labelRegisterShow);
        this.renderer.appendChild(divPanelShowList, divShowList);
        this.renderer.listen(selectShowList, 'change', (event) => this.onChangePag(event.target.value));
        return divPanelShowList;
    }
    createTable() {
        let tHeadT = null;
        let tBodyT = null;
        let el = this.elRef.nativeElement.children;
        if (el.length > 0) {
            try {
                tHeadT = el[0];
                tBodyT = el[1];
            }
            catch (error) {
            }
            if (tHeadT != null) {
                this.renderer.addClass(tHeadT, 'table-header');
                this.renderer.addClass(tHeadT, 'text-center');
            }
            let i = 0;
            this.createPagination(this.data);
            let rows = Array.prototype.slice.call(tBodyT.children);
            rows
                .forEach((row) => {
                this.renderer.addClass(row, 'table-row');
                if (i % 2 == 0) {
                    this.renderer.addClass(row, 'pair');
                }
                else {
                    this.renderer.addClass(row, 'odd');
                }
                if (i >= this.minRow && i <= this.maxRow - 1) {
                    this.renderer.setStyle(row, 'display', '');
                }
                else {
                    this.renderer.setStyle(row, 'display', 'none');
                }
                i++;
            });
        }
    }
    createPaginator() {
        /* PAGINATOR CREATION */
        let ulPaginator = this.renderer.createElement('ul');
        this.renderer.addClass(ulPaginator, "pagination");
        if (this.paginationList.length > 0) {
            let liPreviousPaginator = this.renderer.createElement('li');
            this.renderer.addClass(liPreviousPaginator, "page-item");
            this.renderer.addClass(liPreviousPaginator, "text-center");
            if (this.selectedPage === 0) {
                this.renderer.addClass(liPreviousPaginator, 'disabled');
            }
            this.renderer.setStyle(liPreviousPaginator, 'min-width', '45px');
            let aPreviousPaginator = this.renderer.createElement('a');
            this.renderer.addClass(aPreviousPaginator, 'page-link');
            this.renderer.addClass(aPreviousPaginator, 'pagination-pages');
            this.renderer.setStyle(aPreviousPaginator, 'background-color', '#da9292');
            this.renderer.setStyle(aPreviousPaginator, 'border-color', '#881010');
            let textPreviousPaginator = this.renderer.createText('Anterior');
            this.renderer.appendChild(aPreviousPaginator, textPreviousPaginator);
            this.renderer.appendChild(liPreviousPaginator, aPreviousPaginator);
            this.renderer.appendChild(ulPaginator, liPreviousPaginator);
            this.renderer.listen(aPreviousPaginator, 'click', () => this.pagination(this.selectedPage - 1));
            this.paginationList.slice(this.minPageShow, this.maxPageShow).forEach((page) => {
                let liPaginator = this.renderer.createElement('li');
                this.renderer.addClass(liPaginator, "page-item");
                this.renderer.addClass(liPaginator, "text-center");
                this.renderer.setStyle(liPaginator, 'min-width', '45px');
                let aPaginator = this.renderer.createElement('a');
                this.renderer.addClass(aPaginator, 'page-link');
                this.renderer.addClass(aPaginator, 'pagination-pages');
                if (this.selectedPage == page) {
                    this.renderer.addClass(aPaginator, 'active-pagination');
                }
                let textLiPaginator = this.renderer.createText(page + 1);
                this.renderer.appendChild(aPaginator, textLiPaginator);
                this.renderer.appendChild(liPaginator, aPaginator);
                this.renderer.appendChild(ulPaginator, liPaginator);
                this.renderer.listen(aPaginator, 'click', () => this.pagination(page));
            });
            if (this.paginationList.length > this.pageLength &&
                ((this.maxPage - this.maxPageShow) > 0 || this.maxPageShow == this.pageLength)) {
                let liManyPaginator = this.renderer.createElement('li');
                this.renderer.addClass(liManyPaginator, "page-item");
                this.renderer.addClass(liManyPaginator, "text-center");
                this.renderer.setStyle(liManyPaginator, 'min-width', '45px');
                let aManyPaginator = this.renderer.createElement('a');
                this.renderer.addClass(aManyPaginator, 'page-link');
                this.renderer.addClass(aManyPaginator, 'pagination-pages');
                this.renderer.setStyle(aManyPaginator, 'background-color', '#da9292');
                this.renderer.setStyle(aManyPaginator, 'border-color', '#881010');
                let textManyPaginator = this.renderer.createText('...');
                this.renderer.appendChild(aManyPaginator, textManyPaginator);
                this.renderer.appendChild(liManyPaginator, aManyPaginator);
                this.renderer.appendChild(ulPaginator, liManyPaginator);
            }
            let liNextPaginator = this.renderer.createElement('li');
            this.renderer.addClass(liNextPaginator, "page-item");
            this.renderer.addClass(liNextPaginator, "text-center");
            if (this.selectedPage === this.maxPage) {
                this.renderer.addClass(liNextPaginator, 'disabled');
            }
            this.renderer.setStyle(liNextPaginator, 'min-width', '45px');
            let aNextPaginator = this.renderer.createElement('a');
            this.renderer.addClass(aNextPaginator, 'page-link');
            this.renderer.addClass(aNextPaginator, 'pagination-pages');
            this.renderer.setStyle(aNextPaginator, 'background-color', '#da9292');
            this.renderer.setStyle(aNextPaginator, 'border-color', '#881010');
            let textNextPaginator = this.renderer.createText('Siguiente');
            this.renderer.appendChild(aNextPaginator, textNextPaginator);
            this.renderer.appendChild(liNextPaginator, aNextPaginator);
            this.renderer.appendChild(ulPaginator, liNextPaginator);
            this.renderer.listen(aNextPaginator, 'click', () => this.pagination(this.selectedPage + 1));
        }
        let divPaginator = this.renderer.createElement('div');
        this.renderer.addClass(divPaginator, "d-flex");
        this.renderer.addClass(divPaginator, "justify-content-center");
        this.renderer.appendChild(divPaginator, ulPaginator);
        return divPaginator;
    }
    pagination(pag) {
        if (this.paginationList.length > this.pageLength) {
            let maxPerPage = this.pageLength / 2;
            if ((pag + 1 / 2) > (maxPerPage + 1)) {
                if (pag >= (this.maxPage - maxPerPage - 1)) {
                    this.minPageShow = this.maxPage - this.pageLength;
                    this.maxPageShow = this.minPageShow + this.pageLength + 1;
                }
                else {
                    this.minPageShow = pag - maxPerPage;
                    this.maxPageShow = this.minPageShow + this.pageLength;
                }
            }
            else {
                this.minPageShow = 0;
                this.maxPageShow = this.pageLength;
            }
        }
        else {
            this.minPageShow = 0;
            this.maxPageShow = this.pageLength;
        }
        this.minRow = this.itemsPerPage * pag;
        this.maxRow = this.itemsPerPage * (pag + 1);
        this.selectedPage = pag;
        this.createDataTable();
    }
    createPagination(lista) {
        let maxPageSelect = this.listRowSize[this.listRowSize.length - 1];
        for (let i = 0; i <= this.listRowSize.length - 1; i++) {
            if (lista.length >= this.listRowSize[i] && lista.length <= this.listRowSize[i + 1]) {
                maxPageSelect = this.listRowSize[i + 1];
            }
        }
        let x = this.itemsPerPage;
        if (x > maxPageSelect) {
            x = maxPageSelect;
        }
        this.paginationList = [];
        let listaLength = lista.length / x;
        for (let k = 0; k < Math.ceil(listaLength); k++) {
            this.paginationList.push(k);
        }
        this.maxPage = Math.ceil(listaLength) - 1;
    }
    onChangePag(value) {
        this.itemsPerPage = value;
        this.createPagination(this.data);
        this.pagination(0);
    }
};
DatatableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], DatatableDirective.prototype, "options", void 0);
__decorate([
    Input()
], DatatableDirective.prototype, "data", void 0);
DatatableDirective = __decorate([
    Directive({
        selector: '[datatable]'
    })
], DatatableDirective);

let NumberDirective = class NumberDirective {
    constructor(el) {
        this.el = el;
        this.decimals = 0;
        this.specialKeys = [
            'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
        ];
        this.aux = 0;
    }
    check(value, decimals) {
        if (decimals <= 0) {
            return String(value).match(new RegExp(/^\d+$/));
        }
        else {
            let regExpString = "^\\s*((\\d+(\\.\\d{0," + decimals + "})?)|((\\d*(\\.\\d{1," + decimals + "}))))\\s*$";
            return String(value).match(new RegExp(regExpString));
        }
    }
    onKeyDown(event) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current = this.el.nativeElement.value;
        let next = current.concat(event.key);
        if (current.length == 0 && next == '0' && this.decimals == 0) {
            event.preventDefault();
            return;
        }
        if (current == '0' && event.key != '.' && this.decimals > 0) {
            event.preventDefault();
            return;
        }
        // let position = current.lastIndexOf(".");
        // if(position > 0){
        //   if(this.aux < this.decimals){
        //     this.el.nativeElement.value = current.substr(0, position + 1 + this.aux) + event.key;
        //     this.aux++;
        //   }
        // }
        if (next && !this.check(next, this.decimals)) {
            event.preventDefault();
            return;
        }
        else {
            // if (event.key == '.') {
            //   event.preventDefault();
            //   this.el.nativeElement.value = current + ".";
            //   for(let i = 0; i < this.decimals; i++){
            //     this.el.nativeElement.value += '0';
            //   }
            // } 
        }
    }
};
NumberDirective.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input('decimals')
], NumberDirective.prototype, "decimals", void 0);
__decorate([
    HostListener('keydown', ['$event'])
], NumberDirective.prototype, "onKeyDown", null);
NumberDirective = __decorate([
    Directive({
        selector: '[numeric]'
    })
], NumberDirective);

let DirectivesModule = class DirectivesModule {
};
DirectivesModule = __decorate([
    NgModule({
        declarations: [DatatableDirective, NumberDirective],
        imports: [
            CommonModule,
            BrowserModule,
        ], exports: [DatatableDirective, NumberDirective]
    })
], DirectivesModule);

/**
 * Generated bundle index. Do not edit.
 */

export { BodyModule, DirectivesModule, BodyComponent as ɵa, MenuComponent as ɵb, FooterComponent as ɵc, DatatableDirective as ɵd, NumberDirective as ɵe };
//# sourceMappingURL=menu-cafecert-app.js.map
