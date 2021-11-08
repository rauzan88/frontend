import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlujotrabajoComponent } from './cafecert/flujotrabajo';
import { MenuComponent } from './cafecert';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { NgModule } from '@angular/core';
import { PreguntacerradaComponent } from './cafecert/preguntacerrada';
import { CadenaeventoComponent } from './cafecert/cadenaevento';
import { ControleventoComponent } from './cafecert/controlevento';
import { ProcesaeventoComponent } from './cafecert/procesaevento';
import { EventoactualComponent } from './cafecert/eventoactual';
import { NoconformidadComponent } from './cafecert/noconformidad';
import { DetalleComponent } from './cafecert/detalle';
import { ArchivosComponent } from './cafecert/archivos';
import { JustificarComponent } from './cafecert/justificar';
import { BodyModule, DirectivesModule } from 'menu-cafecert-app';
import { CommonModule } from '@angular/common';
import { ConfirmartareaComponent } from './cafecert/confirmartarea';
import { PlantillaComponent } from './cafecert/plantilla';
import { NuevaealuacionComponent } from './cafecert/nuevaevaluacion';
import { AsignarComponent } from './cafecert/asignar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './_components/modal.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BodyModule,
        CommonModule,
        DirectivesModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        PreguntacerradaComponent,
        ConfirmartareaComponent,
        FlujotrabajoComponent,
        CadenaeventoComponent,
        ControleventoComponent,
        ProcesaeventoComponent,
        EventoactualComponent,
        NoconformidadComponent,
        PlantillaComponent,
        ArchivosComponent,
        DetalleComponent,
        AlertComponent,
        JustificarComponent,
        MenuComponent,
        AsignarComponent,
        NuevaealuacionComponent,
        ModalComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { };