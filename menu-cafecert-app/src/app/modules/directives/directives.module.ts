import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DatatableDirective } from '../directives/datatable.directive';
import { NumberDirective } from './number.directive';

@NgModule({
  declarations: [DatatableDirective, NumberDirective],
  imports: [
    CommonModule,
    BrowserModule,
  ], exports: [DatatableDirective, NumberDirective]
})
export class DirectivesModule { }
