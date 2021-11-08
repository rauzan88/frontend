import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NuevocertificadoComponent } from './cafecert/nuevocertificado';
import { CertificadoComponent } from './cafecert/certificado';
import { MenuComponent } from './cafecert';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { NgModule } from '@angular/core';
import {BodyModule, DirectivesModule} from 'menu-cafecert-app';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BuscarclienteComponent } from './cafecert/buscarcliente';
import { EditarcertificadoComponent } from './cafecert/editarcertificado';
import { ListarcertificadoComponent } from './cafecert/listarcertificado';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BodyModule,
        DirectivesModule
    ],
    declarations: [
        AppComponent,
        CertificadoComponent,
        NuevocertificadoComponent,
        ListarcertificadoComponent,
        EditarcertificadoComponent,
        BuscarclienteComponent,
        AlertComponent,
        MenuComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { };