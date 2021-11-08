import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpresaComponent } from './cafecert/empresa';
//import { AsignarComponent } from './cafecert/asignar';
import { MenuComponent } from './cafecert';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        EmpresaComponent,
        //AsignarComponent,
        AlertComponent,
        MenuComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { };