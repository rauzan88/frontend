import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [BodyComponent,MenuComponent,FooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
  ], exports: [BodyComponent, MenuComponent, FooterComponent ]
})
export class BodyModule { }
