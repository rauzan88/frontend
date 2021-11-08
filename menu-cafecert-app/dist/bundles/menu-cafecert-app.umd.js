(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/common/http'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('menu-cafecert-app', ['exports', '@angular/core', '@angular/common', '@angular/common/http', '@angular/platform-browser'], factory) :
    (global = global || self, factory(global['menu-cafecert-app'] = {}, global.ng.core, global.ng.common, global.ng.common.http, global.ng.platformBrowser));
}(this, (function (exports, core, common, http, platformBrowser) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
        __decorate([
            core.Input()
        ], BodyComponent.prototype, "sessionId", void 0);
        __decorate([
            core.HostListener('window:resize', ['$event'])
        ], BodyComponent.prototype, "onResize", null);
        BodyComponent = __decorate([
            core.Component({
                selector: 'app-body',
                template: "<!-- <div class=\"header-area\">\n    <div class=\"menuContainer\">\n        <div class=\"row t-container\">\n            <app-menu sessionId=\"966C67D95C8951C1CC98D64DB85AB655\"></app-menu>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-menu\">\n    <div class=\"container\" style=\"text-align: center;\">\n        <ng-content></ng-content>\n        \n        <br />\n    </div>\n    <app-footer></app-footer>\n</div> -->\n\n<div class=\"wrapper\">\n    <!-- Sidebar  -->\n    <app-menu [sessionId]=\"sessionId\" [toggleButton]=\"toggleButton\" #menu></app-menu>\n    <div (window:resize)=\"onResize($event)\"></div>\n    <!-- Page Content  -->\n    <div id=\"content\" [ngClass]=\"{'active': toggleButton}\">\n\n        <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n            <div class=\"container-fluid\">\n\n                <button type=\"button\" id=\"sidebarCollapse\" class=\"btn btn-info\" (click)=\"onToggleButton()\">\n                    <!-- <img src=\"node_modules/menu-cafecert-app/src/assets/images/align-left-solid.svg\" style=\"width: 15px;height: 15px;color:white\"> -->\n                    <i class=\"fas fa-align-left\"></i>\n                </button>\n                <img src=\"node_modules/menu-cafecert-app/src/assets/images/logo1.png\" alt=\"Logo\" class=\"text-left\">\n                <img src=\"node_modules/menu-cafecert-app/src/assets/images/logo2.png\" alt=\"Certificamos el caf\u00E9 de Colombia\"\n                    class=\"text-right\">\n            </div>\n        </nav>\n\n        <div class=\"row\">\n            <i class=\"far fa-user-circle\" style=\"font-size:50px;color:#881010;padding-left:40px\"></i>\n            <div class=\"col text-left\">\n                <div class=\"row\">\n                    <div class=\"col\">{{menu.user}}</div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">{{menu.role}}</div>\n                </div>\n            </div>\n\n            <div class=\"col text-right\" style=\"padding-right: 40px;\">\n                {{date | date: 'dd/MM/yyyy hh:mm:ss'}}\n            </div>\n        </div>\n        <hr>\n        <ng-content></ng-content>\n        <hr>\n        <app-footer></app-footer>\n    </div>\n\n</div>",
                styles: [".navbar{padding:15px 10px;background:#fff;border:none;border-radius:0;margin-bottom:20px;box-shadow:1px 1px 3px rgba(0,0,0,.1)}.navbar-btn{box-shadow:none;outline:0!important;border:none}.line{width:100%;height:1px;border-bottom:1px dashed #ddd;margin:40px 0}.wrapper{display:flex;width:100%;font-family:Verdana,sans-serif;font-size:14px}#sidebarCollapse{display:none;background-color:#b34a4a;border-color:#881010}#content{width:calc(100% - 250px);padding:20px 40px 80px;min-height:100vh;transition:.3s;position:absolute;top:0;right:0}#content.active{width:100%}@media (max-width:850px){#sidebarCollapse{display:block;transition:.3s}#content{width:100%}#content.active{width:calc(100% - 250px)}}"]
            })
        ], BodyComponent);
        return BodyComponent;
    }());

    var FooterComponent = /** @class */ (function () {
        function FooterComponent() {
        }
        FooterComponent.prototype.ngOnInit = function () {
        };
        FooterComponent = __decorate([
            core.Component({
                selector: 'app-footer',
                template: "<footer class=\"footer\">\n    <div class=\"footer-bottom\">\n        <div class=\"text-center\">\n            <label>\n                CAFECERT - Bogot\u00E1 D.C.- Colombia - 2020\n            </label>\n        </div>\n    </div>\n</footer>",
                styles: [".footer{padding:0;position:absolute;bottom:0;left:0;width:100%}.footer-bottom{padding:10px 0;text-align:center;color:#fff;background-color:#881010}"]
            })
        ], FooterComponent);
        return FooterComponent;
    }());

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
            { type: http.HttpClient }
        ]; };
        __decorate([
            core.Input()
        ], MenuComponent.prototype, "sessionId", void 0);
        __decorate([
            core.Input()
        ], MenuComponent.prototype, "toggleButton", void 0);
        MenuComponent = __decorate([
            core.Component({
                selector: 'app-menu',
                template: "<nav id=\"sidebar\" style=\"height: 100%;\" [ngClass]=\"{'active': toggleButton}\">\n  <div class=\"sidebar-header\">\n\n  </div>\n\n  <ul class=\"list-unstyled components\">\n    <div *ngFor=\"let enlace of menu\">\n      <li>\n        <a class=\"btn text-left\" (click)=\"chooseMenu(enlace.url)\">{{enlace.item}}</a>\n      </li>\n      <hr style=\"border-color: white; margin-top:0px; margin-bottom: 0px\">\n    </div>\n\n\n    <li>\n      <a class=\"btn text-left\" (click)=\"logout()\">Cerrar Sesi\u00F3n</a>\n    </li>\n    <hr style=\"border-color: white; margin-top:0px; margin-bottom: 0px\">\n  </ul>\n</nav>",
                styles: ["a,a:focus,a:hover{color:inherit;font-family:Verdana,sans-serif;font-size:14px;text-decoration:none;transition:.1s}a[data-toggle=collapse]{position:relative}#sidebar{width:250px;position:fixed;top:0;left:0;height:100vh;z-index:999;background:#ccc;color:#fff;transition:.3s}#sidebar.active{margin-left:-250px}#sidebar .sidebar-header{padding:50px;background:#ccc}#sidebar ul.components{background-color:#881010}#sidebar ul p{color:#fff;padding:10px}#sidebar ul li a{padding:10px;display:block}#sidebar ul li a:hover{color:#fff;background:#b34a4a}#sidebar ul li.active>a,a[aria-expanded=true]{color:#fff;background:#ccc}ul ul a{font-size:.9em!important;padding-left:30px!important;background:#ccc}@media (max-width:850px){#sidebar{margin-left:-250px}#sidebar.active{margin-left:0}}"]
            })
        ], MenuComponent);
        return MenuComponent;
    }());

    // import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
    var BodyModule = /** @class */ (function () {
        function BodyModule() {
        }
        BodyModule = __decorate([
            core.NgModule({
                declarations: [BodyComponent, MenuComponent, FooterComponent],
                imports: [
                    common.CommonModule,
                    platformBrowser.BrowserModule,
                ], exports: [BodyComponent, MenuComponent, FooterComponent]
            })
        ], BodyModule);
        return BodyModule;
    }());

    var DatatableDirective = /** @class */ (function () {
        function DatatableDirective(elRef, renderer) {
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
        DatatableDirective.prototype.ngAfterContentInit = function () {
            var el = this.elRef.nativeElement.children;
            var tBodyT = el[1];
            this.rows = Array.prototype.slice.call(tBodyT.children);
            this.data = this.rows;
        };
        DatatableDirective.prototype.ngAfterViewInit = function () {
            this.createDataTable();
        };
        DatatableDirective.prototype.createDataTable = function () {
            this.createTable();
            var parent = this.elRef.nativeElement.parentNode;
            var divElement = this.renderer.createElement("div");
            this.renderer.insertBefore(parent, divElement, this.elRef.nativeElement);
            this.renderer.removeChild(parent, this.elRef.nativeElement);
            this.renderer.appendChild(divElement, this.elRef.nativeElement);
            /* VALIDACIÓN ITEMS POR PÁGINA */
            var validateSelect = false;
            try {
                var selectList = parent.firstChild.firstChild.children;
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
            var validateUl = false;
            try {
                var ulList = parent.lastChild.lastChild;
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
        };
        DatatableDirective.prototype.createShow = function () {
            var _this = this;
            var divPanelShowList = this.renderer.createElement("div");
            this.renderer.addClass(divPanelShowList, 'row');
            var divShowList = this.renderer.createElement("div");
            this.renderer.setStyle(divShowList, 'padding', '20px 0px 10px 50px');
            this.renderer.addClass(divShowList, 'col');
            var labelShow = this.renderer.createElement('label');
            this.renderer.setStyle(labelShow, 'padding-right', '10px');
            var textShow = this.renderer.createText("Mostrar");
            this.renderer.appendChild(labelShow, textShow);
            this.renderer.appendChild(divShowList, labelShow);
            var selectShowList = this.renderer.createElement('select');
            this.renderer.setStyle(selectShowList, 'height', '20px');
            this.listRowSize.forEach(function (value) {
                var option = _this.renderer.createElement('option');
                option.value = String(value);
                if (value == _this.itemsPerPage) {
                    option.selected = true;
                }
                var textOption = _this.renderer.createText(String(value));
                // this.renderer.setValue(option, String(value));
                _this.renderer.appendChild(option, textOption);
                _this.renderer.appendChild(selectShowList, option);
                // this.renderer.listen(option, 'click', (event) => this.onChangePag(event));
            });
            this.renderer.appendChild(divShowList, selectShowList);
            var labelRegisterShow = this.renderer.createElement('label');
            this.renderer.setStyle(labelRegisterShow, 'padding-left', '10px');
            var textRegisterShow = this.renderer.createText("registros");
            this.renderer.appendChild(labelRegisterShow, textRegisterShow);
            this.renderer.appendChild(divShowList, labelRegisterShow);
            this.renderer.appendChild(divPanelShowList, divShowList);
            this.renderer.listen(selectShowList, 'change', function (event) { return _this.onChangePag(event.target.value); });
            return divPanelShowList;
        };
        DatatableDirective.prototype.createTable = function () {
            var _this = this;
            var tHeadT = null;
            var tBodyT = null;
            var el = this.elRef.nativeElement.children;
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
                var i_1 = 0;
                this.createPagination(this.data);
                var rows = Array.prototype.slice.call(tBodyT.children);
                rows
                    .forEach(function (row) {
                    _this.renderer.addClass(row, 'table-row');
                    if (i_1 % 2 == 0) {
                        _this.renderer.addClass(row, 'pair');
                    }
                    else {
                        _this.renderer.addClass(row, 'odd');
                    }
                    if (i_1 >= _this.minRow && i_1 <= _this.maxRow - 1) {
                        _this.renderer.setStyle(row, 'display', '');
                    }
                    else {
                        _this.renderer.setStyle(row, 'display', 'none');
                    }
                    i_1++;
                });
            }
        };
        DatatableDirective.prototype.createPaginator = function () {
            var _this = this;
            /* PAGINATOR CREATION */
            var ulPaginator = this.renderer.createElement('ul');
            this.renderer.addClass(ulPaginator, "pagination");
            if (this.paginationList.length > 0) {
                var liPreviousPaginator = this.renderer.createElement('li');
                this.renderer.addClass(liPreviousPaginator, "page-item");
                this.renderer.addClass(liPreviousPaginator, "text-center");
                if (this.selectedPage === 0) {
                    this.renderer.addClass(liPreviousPaginator, 'disabled');
                }
                this.renderer.setStyle(liPreviousPaginator, 'min-width', '45px');
                var aPreviousPaginator = this.renderer.createElement('a');
                this.renderer.addClass(aPreviousPaginator, 'page-link');
                this.renderer.addClass(aPreviousPaginator, 'pagination-pages');
                this.renderer.setStyle(aPreviousPaginator, 'background-color', '#da9292');
                this.renderer.setStyle(aPreviousPaginator, 'border-color', '#881010');
                var textPreviousPaginator = this.renderer.createText('Anterior');
                this.renderer.appendChild(aPreviousPaginator, textPreviousPaginator);
                this.renderer.appendChild(liPreviousPaginator, aPreviousPaginator);
                this.renderer.appendChild(ulPaginator, liPreviousPaginator);
                this.renderer.listen(aPreviousPaginator, 'click', function () { return _this.pagination(_this.selectedPage - 1); });
                this.paginationList.slice(this.minPageShow, this.maxPageShow).forEach(function (page) {
                    var liPaginator = _this.renderer.createElement('li');
                    _this.renderer.addClass(liPaginator, "page-item");
                    _this.renderer.addClass(liPaginator, "text-center");
                    _this.renderer.setStyle(liPaginator, 'min-width', '45px');
                    var aPaginator = _this.renderer.createElement('a');
                    _this.renderer.addClass(aPaginator, 'page-link');
                    _this.renderer.addClass(aPaginator, 'pagination-pages');
                    if (_this.selectedPage == page) {
                        _this.renderer.addClass(aPaginator, 'active-pagination');
                    }
                    var textLiPaginator = _this.renderer.createText(page + 1);
                    _this.renderer.appendChild(aPaginator, textLiPaginator);
                    _this.renderer.appendChild(liPaginator, aPaginator);
                    _this.renderer.appendChild(ulPaginator, liPaginator);
                    _this.renderer.listen(aPaginator, 'click', function () { return _this.pagination(page); });
                });
                if (this.paginationList.length > this.pageLength &&
                    ((this.maxPage - this.maxPageShow) > 0 || this.maxPageShow == this.pageLength)) {
                    var liManyPaginator = this.renderer.createElement('li');
                    this.renderer.addClass(liManyPaginator, "page-item");
                    this.renderer.addClass(liManyPaginator, "text-center");
                    this.renderer.setStyle(liManyPaginator, 'min-width', '45px');
                    var aManyPaginator = this.renderer.createElement('a');
                    this.renderer.addClass(aManyPaginator, 'page-link');
                    this.renderer.addClass(aManyPaginator, 'pagination-pages');
                    this.renderer.setStyle(aManyPaginator, 'background-color', '#da9292');
                    this.renderer.setStyle(aManyPaginator, 'border-color', '#881010');
                    var textManyPaginator = this.renderer.createText('...');
                    this.renderer.appendChild(aManyPaginator, textManyPaginator);
                    this.renderer.appendChild(liManyPaginator, aManyPaginator);
                    this.renderer.appendChild(ulPaginator, liManyPaginator);
                }
                var liNextPaginator = this.renderer.createElement('li');
                this.renderer.addClass(liNextPaginator, "page-item");
                this.renderer.addClass(liNextPaginator, "text-center");
                if (this.selectedPage === this.maxPage) {
                    this.renderer.addClass(liNextPaginator, 'disabled');
                }
                this.renderer.setStyle(liNextPaginator, 'min-width', '45px');
                var aNextPaginator = this.renderer.createElement('a');
                this.renderer.addClass(aNextPaginator, 'page-link');
                this.renderer.addClass(aNextPaginator, 'pagination-pages');
                this.renderer.setStyle(aNextPaginator, 'background-color', '#da9292');
                this.renderer.setStyle(aNextPaginator, 'border-color', '#881010');
                var textNextPaginator = this.renderer.createText('Siguiente');
                this.renderer.appendChild(aNextPaginator, textNextPaginator);
                this.renderer.appendChild(liNextPaginator, aNextPaginator);
                this.renderer.appendChild(ulPaginator, liNextPaginator);
                this.renderer.listen(aNextPaginator, 'click', function () { return _this.pagination(_this.selectedPage + 1); });
            }
            var divPaginator = this.renderer.createElement('div');
            this.renderer.addClass(divPaginator, "d-flex");
            this.renderer.addClass(divPaginator, "justify-content-center");
            this.renderer.appendChild(divPaginator, ulPaginator);
            return divPaginator;
        };
        DatatableDirective.prototype.pagination = function (pag) {
            if (this.paginationList.length > this.pageLength) {
                var maxPerPage = this.pageLength / 2;
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
        };
        DatatableDirective.prototype.createPagination = function (lista) {
            var maxPageSelect = this.listRowSize[this.listRowSize.length - 1];
            for (var i = 0; i <= this.listRowSize.length - 1; i++) {
                if (lista.length >= this.listRowSize[i] && lista.length <= this.listRowSize[i + 1]) {
                    maxPageSelect = this.listRowSize[i + 1];
                }
            }
            var x = this.itemsPerPage;
            if (x > maxPageSelect) {
                x = maxPageSelect;
            }
            this.paginationList = [];
            var listaLength = lista.length / x;
            for (var k = 0; k < Math.ceil(listaLength); k++) {
                this.paginationList.push(k);
            }
            this.maxPage = Math.ceil(listaLength) - 1;
        };
        DatatableDirective.prototype.onChangePag = function (value) {
            this.itemsPerPage = value;
            this.createPagination(this.data);
            this.pagination(0);
        };
        DatatableDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], DatatableDirective.prototype, "options", void 0);
        __decorate([
            core.Input()
        ], DatatableDirective.prototype, "data", void 0);
        DatatableDirective = __decorate([
            core.Directive({
                selector: '[datatable]'
            })
        ], DatatableDirective);
        return DatatableDirective;
    }());

    var NumberDirective = /** @class */ (function () {
        function NumberDirective(el) {
            this.el = el;
            this.decimals = 0;
            this.specialKeys = [
                'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
            ];
            this.aux = 0;
        }
        NumberDirective.prototype.check = function (value, decimals) {
            if (decimals <= 0) {
                return String(value).match(new RegExp(/^\d+$/));
            }
            else {
                var regExpString = "^\\s*((\\d+(\\.\\d{0," + decimals + "})?)|((\\d*(\\.\\d{1," + decimals + "}))))\\s*$";
                return String(value).match(new RegExp(regExpString));
            }
        };
        NumberDirective.prototype.onKeyDown = function (event) {
            if (this.specialKeys.indexOf(event.key) !== -1) {
                return;
            }
            var current = this.el.nativeElement.value;
            var next = current.concat(event.key);
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
        };
        NumberDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input('decimals')
        ], NumberDirective.prototype, "decimals", void 0);
        __decorate([
            core.HostListener('keydown', ['$event'])
        ], NumberDirective.prototype, "onKeyDown", null);
        NumberDirective = __decorate([
            core.Directive({
                selector: '[numeric]'
            })
        ], NumberDirective);
        return NumberDirective;
    }());

    var DirectivesModule = /** @class */ (function () {
        function DirectivesModule() {
        }
        DirectivesModule = __decorate([
            core.NgModule({
                declarations: [DatatableDirective, NumberDirective],
                imports: [
                    common.CommonModule,
                    platformBrowser.BrowserModule,
                ], exports: [DatatableDirective, NumberDirective]
            })
        ], DirectivesModule);
        return DirectivesModule;
    }());

    exports.BodyModule = BodyModule;
    exports.DirectivesModule = DirectivesModule;
    exports.ɵa = BodyComponent;
    exports.ɵb = MenuComponent;
    exports.ɵc = FooterComponent;
    exports.ɵd = DatatableDirective;
    exports.ɵe = NumberDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=menu-cafecert-app.umd.js.map
