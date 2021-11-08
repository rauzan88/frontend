import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SolicitudComponent } from './cafecert/solicitud';
import { AsignarComponent } from './cafecert/asignar';
import { MenuComponent } from './cafecert';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { NgModule } from '@angular/core';
import { CrearSolicitudComponent } from './cafecert/crearsolicitud';
import { EditarSolicitudComponent } from './cafecert/editarsolicitud';
import { BodyModule, DirectivesModule } from 'menu-cafecert-app';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultaComponent } from './cafecert/consulta';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './_components/modal.component';
import { ArchivosComponent } from './cafecert/archivos';
import { NuevaealuacionComponent } from './cafecert/nuevaevaluacion';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BodyModule,
        DirectivesModule,
        FormsModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        SolicitudComponent,
        AsignarComponent,
        CrearSolicitudComponent,
        EditarSolicitudComponent,
        ConsultaComponent,
        ArchivosComponent,
        AlertComponent,
        MenuComponent,
        ModalComponent,
        NuevaealuacionComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ModalComponent],
})
export class AppModule { };