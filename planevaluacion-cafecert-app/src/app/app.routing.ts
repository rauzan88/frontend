import { Routes, RouterModule } from '@angular/router';
import { EvaluacionesComponent } from './cafecert/evaluaciones';
import { NuevaealuacionComponent } from './cafecert/nuevaevaluacion';
import { ActualizaealuacionComponent } from './cafecert/actualizaevaluacion';


const routes: Routes = [
    {  path: '', component: EvaluacionesComponent },
    {  path: 'cafecert/nuevaevaluacion', component: NuevaealuacionComponent },
    {  path: 'cafecert/actualizaevaluacion', component: ActualizaealuacionComponent },
        // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);