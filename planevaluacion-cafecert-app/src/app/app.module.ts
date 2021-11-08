import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EvaluacionesComponent } from './cafecert/evaluaciones';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { NgModule } from '@angular/core';
import {BodyModule} from 'menu-cafecert-app';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NuevaealuacionComponent } from './cafecert/nuevaevaluacion';
import { ActualizaealuacionComponent } from './cafecert/actualizaevaluacion';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        CommonModule,
        BodyModule,
        MatExpansionModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        EvaluacionesComponent,
        NuevaealuacionComponent,
        ActualizaealuacionComponent,
        AlertComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { };