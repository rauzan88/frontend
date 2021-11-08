﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*import { ReactiveFormsModule } from '@angular/forms';*/
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './_components';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { RecoverypasswordComponent } from './recoverypassword';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule,MatSelectModule} from '@angular/material';
import { ChangepasswordComponent } from './changepassword';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        AlertComponent,
        RecoverypasswordComponent,
        ChangepasswordComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { };