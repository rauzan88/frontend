import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertService, ListasService } from "@/_services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({ templateUrl: "nuevocertificado.component.html" })
export class NuevocertificadoComponent implements OnInit {
  sessionid: any;
  txRole: any;
  txuserdni: any;
  programselected: any;
  certificadoForm: FormGroup;
  listaestados = [];
  listapresencafe = [];
  listadescricafe = [];
  listaProgramas = [];
  certificaciones = [];
  nombreCliente = "No hay cliente en el sistema.";
  cdcliente: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private listasService: ListasService,
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  // convenience getter for easy access to form fields
  get f() {
    return this.certificadoForm.controls;
  }

  ngOnInit() {
    this.cdcliente = JSON.parse(localStorage.getItem("cdClient"));
    this.nombreCliente = JSON.parse(localStorage.getItem("txName"));
    this.sessionid = JSON.parse(localStorage.getItem("idsession"));

    console.log("sesion desde crear ceertificado : " + this.sessionid);
    if (this.sessionid === null) {
      this.alertService.error("No se ha podido validar la sesion.");
    } else {
      this.validarsesion();
    }

    this.alertService.clear();

    this.certificadoForm = this.formBuilder.group({
      dtGrantCertificate: ["", Validators.required],
      txLanguage: ["", Validators.required],
      txEurope: ["", Validators.required],
      txActivityPerformed: [""],
      tipoprograma: ["", Validators.required],
      certificadoselect: ["", Validators.required],
    });

    this.listasService
      .tipoProgramaAgrupado({
        frontend: `${process.env.FRONTEND}`,
        next: `${process.env.NEXT}`,
        sessionid: this.sessionid,
        userrole: "data['role']",
        action: "all",
      })
      .subscribe((data) => (this.listaProgramas = data));

    //console.log("this.listaProgramas: " + this.listaProgramas);

    this.listasService
      .certByClientProg({
        frontend: `${process.env.FRONTEND}`,
        next: `${process.env.NEXT}`,
        sessionid: this.sessionid,
        userrole: this.txRole,
        client: this.cdcliente,
        program: this.programselected,
      })
      .subscribe((data) => (this.certificaciones = data));
  }

  onChangeProgram(program: any, event) {
    var target = event.target;
    program.check = target.checked;
    this.programselected = null;

    if (target.checked === true && this.programselected === null) {
      this.programselected = program.txDescription;
    }
    //console.log("cdProgramType: " + item.cdProgramType);
    //console.log("program: " + item.txDescription);
    //console.log("txAnswer: " + item.txAnswer);
    /*console.log({
      frontend: `${process.env.FRONTEND}`,
      next: `${process.env.NEXT}`,
      sessionid: this.sessionid,
      userrole: this.txRole,
      client: this.cdcliente,
      program: this.programselected,
    });*/
    if (this.cdcliente === null) {
      this.alertService.error("Usted debe escoger un cliente primero para poder filtrar por programa.");
    } else {
      this.listasService
        .productByClientProg({
          frontend: `${process.env.FRONTEND}`,
          next: `${process.env.NEXT}`,
          sessionid: this.sessionid,
          userrole: this.txRole,
          client: this.cdcliente,
          program: this.programselected,
        })
        .subscribe((data) => {
          //console.log("this.certificaciones --- ");
          this.certificaciones = data;
          //console.log(this.certificaciones);
        });
    }
  }

  onChangeCertificate(certificate: any, event) {
    var target = event.target;
    certificate.check = target.checked;
    this.certificaciones.forEach((item) => {
      if (item.cdCertificate === certificate.cdCertificate) {
        if (target.checked === true) {
          item.txIsCertified = "S";
        } else {
          item.txIsCertified = "N";
        }
      }
    });
  }

  isValidForm() {
    if (
      this.f.dtGrantCertificate === null &&
      this.f.txLanguage === null &&
      this.f.txEurope === null &&
      //this.f.txActivityPerformed === null &&
      this.f.tipoprograma
    ) {
      return false;
    } else {
      return true;
    }

  }

  guardarCertificado() {
    var message = "";
    var proccessone = true;
    var proccesstwo = true;
    var proccessthree = true;
    var cantidad = 0;
    if (this.f.invalid) {
      this.alertService.error(
        "Proceso guardar certificado no fue realizado, olvido llenar un campo."
      );
      console.log("Olvido llenar un campo..." + this.certificadoForm.invalid);
    } else {
      console.log("guardando...");
      console.log(this.programselected);
      this.certificaciones.forEach((item) => {
        //console.log("item.txIsCertified : " + item.txIsCertified);
        this.listasService.upTxApproved({
          "frontend": `${process.env.FRONTEND}`,
          "next": `${process.env.NEXT}`,
          "sessionid": this.sessionid,
          "cdCertificateProduct": "0",
          "txApproved": item.txIsCertified,
          "cdCertificate": item.cdCertificate,
          "cdProduct": item.cdProduct
        })
          .subscribe(
            (data) => {
              if (data["status"] === `Internal Server Error`) {
                message = message + data["message"];
                proccessone = false;
              }
            },
            (error) => {
              proccessone = false;
              this.alertService.error("Ocurrio un error actualizar txApproved, " + error["message"]);
            }
          );
        if (proccessone) {
          if (item.txIsCertified === "S") {

            this.listasService.upCertificate({
              cdCertificate: item.cdCertificate,
              cdCertificateStatus: "1",
              cdClient: item.cdClient,
              cdProduct: item.cdProduct,
              cdProgramType: item.cdProgramType,
              cdRequest: item.cdRequest,
              consecutive: item.consecutive,
              txLanguage: this.f.txLanguage.value,
              txEurope: this.f.txEurope.value,
              txActivityPerformed: this.f.txActivityPerformed.value,
              txCreationUser: this.txuserdni,
              dtGrantCertificate: this.f.dtGrantCertificate.value,
              dtRetireCertificate: "",
              dtDiscontinued: "",
              txIsCertified: item.txIsCertified,
              txCodCertificate: item.txCodCertificate,
              frontend: `${process.env.FRONTEND}`,
              next: `${process.env.NEXT}`,
              sessionid: this.sessionid
            })
              .subscribe(
                (data) => {
                  if (data["status"] === `Internal Server Error`) {
                    message = message + data["message"];
                    proccesstwo = false;
                  }
                },
                (error) => {
                  proccesstwo = false;
                  this.alertService.error("Ocurrio un error almacenando el certificado, " + error["message"]);
                }
              );

            if (proccessone && proccesstwo) {
              this.listasService.upStateRequest({
                frontend: `${process.env.FRONTEND}`,
                next: `${process.env.NEXT}`,
                sessionid: this.sessionid,
                userdni: this.txuserdni,
                requestcode: item.cdRequest,
                newstate: "3",
              })
                .subscribe(
                  (data) => {
                    if (data["status"] === `Internal Server Error`) {
                      message = message + data["message"];
                      proccessthree = false;
                    }
                  },
                  (error) => {
                    proccessthree = false;
                    this.alertService.error("Ocurrio un error actualizando estado solicitud a certificacion otrogada, " + error["message"]);
                  }
                );

              cantidad = cantidad + 1;
            }

          }
        }
      });
      if (proccessone && proccesstwo && proccessthree) {
        if (cantidad === 0) {
          this.alertService.error(
            "Proceso guardar certificado no fue realizado, usted olvido seleccionar solicictud."
          );
        } else {
          this.alertService.success("Se ha certificado " + cantidad + " solicitud(es) satisfactoriamente.");
          this.certificaciones = [];
          this.certificadoForm.reset();
        }
      } else {
        this.alertService.error("Proceso guardar certificado no fue realizado porque ha ocurrido un error, el error es " + message);
      }
    }
  }

  buscarInformacion() {
    console.log("buscando informacion...");
  }

  recorrearreglo(variable: any) {
    var frase = "";
    for (let item of variable) {
      frase = frase + item;
      frase = frase + "/";
    }
    return frase;
  }

  onSubmit() {
    this.alertService.clear();

    // stop here if form is invalid
    if (this.certificadoForm.invalid) {
      return;
    }
  }

  public validarsesion(): void {
    this.http
      .post<any>(`${process.env.USERBUSSINESS}` + `/cafecert/findsession/`, {
        frontend: `${process.env.FRONTEND}`,
        next: `${process.env.NEXT}`,
        sessionid: this.sessionid,
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

                this.listasService
                  .estados({
                    frontend: `${process.env.FRONTEND}`,
                    next: `${process.env.NEXT}`,
                    sessionid: this.sessionid,
                    userrole: data["role"],
                    action: "all",
                  })
                  .subscribe((data) => (this.listaestados = data));

                this.listasService
                  .presentacioncafe({
                    frontend: `${process.env.FRONTEND}`,
                    next: `${process.env.NEXT}`,
                    sessionid: this.sessionid,
                    userrole: data["role"],
                    action: "all",
                  })
                  .subscribe((data) => (this.listapresencafe = data));

                this.listasService
                  .descripcioncafe({
                    frontend: `${process.env.FRONTEND}`,
                    next: `${process.env.NEXT}`,
                    sessionid: this.sessionid,
                    userrole: data["role"],
                    action: "all",
                  })
                  .subscribe((data) => (this.listadescricafe = data));

                this.listasService
                  .tipoProgramaAgrupado({
                    frontend: `${process.env.FRONTEND}`,
                    next: `${process.env.NEXT}`,
                    sessionid: this.sessionid,
                    userrole: data["role"],
                    action: "all",
                  })
                  .subscribe((data) => (this.listaProgramas = data));
              }
            }
          }
        },
        (error) => {
          this.alertService.error(error["message"]);
        }
      );
  }

  //validacion
  generandoAutoIncremento() { }

  public regresarLista(): void {
    this.router.navigate([`${process.env.FRONTEND}`], {
      queryParams: { param: this.sessionid },
    });
  }

  public buscarCliente() {
    localStorage.setItem("idsession", JSON.stringify(this.sessionid));
    console.log("sessionid nuevo certificado: " + this.sessionid);

    this.router.navigate(["/cafecert/buscarcliente"]);
  }

  private convertDate(date: Date): string {
    let dp = new DatePipe("en-US");
    let format = "yyyy-MM-dd"; // YYYY-MM-DD
    let dtr = dp.transform(date, format);
    return dtr;
  }
}
