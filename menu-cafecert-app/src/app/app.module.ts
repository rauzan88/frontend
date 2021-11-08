import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BodyModule } from './modules/body/body.module';
import { DatatableDirective } from './modules/directives/datatable.directive';
import { NumberDirective } from './modules/directives/number.directive';




@NgModule({
  declarations: [
    AppComponent,
    DatatableDirective,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BodyModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
