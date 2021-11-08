import { AlertService, ListasService } from "@/_services";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

interface SearchCertificate {
  id: string;
  state: boolean;
  type: number;
}

@Component({ templateUrl: "certificado.component.html" })
export class CertificadoComponent implements OnInit {
  listRequestsForm: FormGroup;
  lista: any[] = [];
  listaCopia: any[] = [];
  sessionId: any;
  txRole: any;
  isSearch: boolean = false;
  txuserdni: any;
  searchCertificate: SearchCertificate;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private listasService: ListasService,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.listRequestsForm = this.formBuilder.group({
      txtfiltro: ["", Validators.required],
      rdresfilto: ["", Validators.required],
    });

    this.rutaActiva.queryParams.subscribe((params) => {
      this.sessionId = params["param"];
      if (this.sessionId === null) {
        this.lista = [];
        this.listaCopia = [];
        this.alertService.error("No se ha podido validar la sesion.");
      } else {
        this.validarsesion();
      }
    });
    this.txRole = "AnalistaCertificacion_SICERT";
  }

  get f() {
    return this.listRequestsForm.controls;
  }

  onSubmit() {
    this.alertService.clear();
  }

  public validarsesion(): void {
    this.http
      .post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/findsession/`, {
        frontend: `${process.env.FRONTEND}`,
        next: `${process.env.NEXT}`,
        sessionid: this.sessionId,
      })
      .subscribe(
        (data) => {
          if (data["status"] === `Internal Server Error`) {
            this.alertService.error(data["message"]);
          } else {
            if (data["expired"] === `-1`) {
              this.alertService.error(
                "Sesión ha expirado, debe volver a loguearse en el sistema."
              );
            } else {
              if (data["role"] === null) {
                this.alertService.error(
                  "No existe rol de usuario registrado en el sistema."
                );
              } else {
                this.txRole = data["role"];
                this.txuserdni = data["dni"];
                this.searchCertificate = JSON.parse(localStorage.getItem('searchCertificate'));
                if (this.searchCertificate != null) {
                  if (this.searchCertificate.state) {
                    this.f.rdresfilto.setValue(this.searchCertificate.type);
                    this.f.txtfiltro.setValue(this.searchCertificate.id);
                    this.cargarConsultaFiltro(this.searchCertificate.type, this.searchCertificate.id);
                  }
                }
              }
            }
          }
        },
        (error) => {
          this.alertService.error(error["message"]);
        }
      );
  }

  public crearcertificado(): void {
    //console.log("desde certificado: " + this.sessionId);
    localStorage.setItem("idsession", JSON.stringify(this.sessionId));
    localStorage.setItem("txName", JSON.stringify("Buscar cliente"));

    // console.log("sessionid: " + localStorage.getItem("sessionid"));

    this.router.navigate(["/cafecert/nuevocertificado"]);
  }

  public onSearch(): void {
    this.lista = [];
    this.listaCopia = [];
    this.alertService.type = this.f.rdresfilto.value;
    this.alertService.value = this.f.txtfiltro.value;
    let textoFiltro: string;
    textoFiltro = this.f.txtfiltro.value.trim();
    this.alertService.clear();

    if (textoFiltro.toString().trim() === "") {
      this.alertService.error("Debe digitar el filtro para buscar.");
    } else if (this.f.rdresfilto.value.toString().trim() === "") {
      this.alertService.error(
        "Debe seleccionar el tipo de filtro para buscar."
      );
    } else {
      /*console.log(
        this.f.rdresfilto.value + " SI se digitó algo: " + textoFiltro
      );*/
      this.cargarConsultaFiltro(this.f.rdresfilto.value, textoFiltro);
    }
  }

  cargarConsultaFiltro(rdresfilto: Number, textoFiltro: string): void {
    this.isSearch = false;
    this.lista = [];
    this.listaCopia = [];

    if (rdresfilto == 2) {
      console.log(
        JSON.stringify({
          frontend: `${process.env.FRONTEND}`,
          next: `${process.env.NEXT}`,
          sessionid: this.sessionId,
          txCodeCertificate: textoFiltro,
        })
      );
      this.listasService
        .certificateByCode({
          frontend: `${process.env.FRONTEND}`,
          next: `${process.env.NEXT}`,
          sessionid: this.sessionId,
          txCodeCertificate: textoFiltro,
        })
        .subscribe((data) => {
          if (data["status"] === `Internal Server Error`) {
            this.alertService.error(data["message"]);
          } else {
            this.isSearch = true;
            this.listaCopia = data;
            if (this.listaCopia.length > 0) {
              this.lista.push(this.listaCopia[0]);
              for (let i = 1; i < this.listaCopia.length; i++) {
                let cdRequest = this.listaCopia[i].cdRequest;
                let txCodCertificate = this.listaCopia[i].txCodCertificate;
                if (
                  this.lista.filter((action) => action.txCodCertificate == txCodCertificate && action.cdRequest == cdRequest)
                    .length === 0
                ) {
                  this.lista.push(this.listaCopia[i]);
                }
              }
            } else {
              this.lista = [];
            }
            this.setDataSearch(false);
          }
        });
    }

    if (rdresfilto == 1) {
      console.log(
        JSON.stringify({
          frontend: `${process.env.FRONTEND}`,
          next: `${process.env.NEXT}`,
          sessionid: this.sessionId,
          txNit: textoFiltro,
        })
      );
      this.listasService
        .certificateByNit({
          frontend: `${process.env.FRONTEND}`,
          next: `${process.env.NEXT}`,
          sessionid: this.sessionId,
          txNit: textoFiltro,
        })
        .subscribe((data) => {
          if (data["status"] === `Internal Server Error`) {
            this.alertService.error(data["message"]);
          } else {
            this.isSearch = true;
            //this.lista = data;
            console.log("pendiente lista nueva")
            console.log(data)
            this.listaCopia = data;
            if (this.listaCopia.length > 0) {
              this.lista.push(this.listaCopia[0]);
              for (let i = 1; i < this.listaCopia.length; i++) {
                let cdRequest = this.listaCopia[i].cdRequest;
                let txCodCertificate = this.listaCopia[i].txCodCertificate;
                if (
                  this.lista.filter((action) => action.txCodCertificate == txCodCertificate && action.cdRequest == cdRequest)
                    .length === 0
                ) {
                  this.lista.push(this.listaCopia[i]);
                }
              }
            } else {
              this.lista = [];
            }

          }
          this.setDataSearch(false);
        });
    }
    //console.log("tamaño lista: " + this.lista.length);
    //console.log(" this.isSearch: " + this.isSearch);
    //console.log(" rdresfilto: " + rdresfilto);
    //console.log(" textoFiltro: " + textoFiltro);
  }

  validaBoton() {
    if (
      this.txRole === "AnalistaCertificacion_SICERT" ||
      this.txRole === "AnalistaProgramacion_SICERT"
    ) {
      return "inline";
    } else {
      return "none";
    }
  }

  editarCertificado(certificate: any) {
    let resultCertificate: any[] = this.listaCopia.filter(
      (data) => data.txCodCertificate === certificate.txCodCertificate
    );

    localStorage.setItem("certificate", JSON.stringify(resultCertificate));
    localStorage.setItem("idsession", JSON.stringify(this.sessionId));
    localStorage.setItem("itemcertificate", JSON.stringify(certificate));
    this.router.navigate(["/cafecert/editarcertificado"]);
  }

  listarCertificado(certificate: any) {
    let resultCertificate: any[] = this.listaCopia.filter(
      (data) => data.txCodCertificate === certificate.txCodCertificate
    );

    this.setDataSearch(true);
    localStorage.setItem("certificate", JSON.stringify(resultCertificate));
    localStorage.setItem("itemcertificate", JSON.stringify(certificate));
    localStorage.setItem("idsession", JSON.stringify(this.sessionId));
    this.router.navigate(["/cafecert/listarcertificado"]);
  }

  changeDate(date: string): string {
    if (date != null && date.toUpperCase().includes('T')) {
      date = date.substring(0, date.toUpperCase().indexOf('T'));
    }
    return date;
  }

  setDataSearch(state: boolean) {
    localStorage.setItem("searchCertificate", JSON.stringify({
      'id': this.f.txtfiltro.value,
      'state': state,
      'type': this.f.rdresfilto.value
    }));
  }
}
