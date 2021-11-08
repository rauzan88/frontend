import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './cafecert/home';
import { MenuComponent } from './cafecert';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyModule, DirectivesModule } from 'menu-cafecert-app';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BodyModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AlertComponent,
        MenuComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { };