import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './cafecert/empresa';
//import { AsignarComponent } from './cafecert/asignar';


const routes: Routes = [
    { path: '', component: EmpresaComponent },
        // otherwise redirect to home
    //{ path: 'cafecert/asignar', component: AsignarComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);