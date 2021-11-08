import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'menu-cafecert-app';
  columns = [{ 'title': 'Nombre', 'data': 'name' }, { 'title': 'Apellido', 'data': 'lastName' }, { 'title': 'Edad', 'data': 'age' }];
  data = [];
  
  options = {};
  
  constructor() {
    for(let i = 1; i <= 75; i++){
      let d = {'name': 'Prueba ' + i, 'lastName': 'Apellido ' + i, 'age': (2*i)};
      this.data.push(d);
    }

    this.options = {
      columns: this.columns,
      rows: this.data
    };
  }
}
