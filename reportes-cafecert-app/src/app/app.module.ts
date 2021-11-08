import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { NgModule } from '@angular/core';
import { BodyModule } from 'menu-cafecert-app';
import { ReportComponent } from './cafecert/report/report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BodyModule,
        BrowserAnimationsModule,
        MatSelectModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        ReportComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { };