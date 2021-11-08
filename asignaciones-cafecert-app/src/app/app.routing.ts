import { Routes, RouterModule } from '@angular/router';
import { AsignacionComponent } from './cafecert/asignacion';
import { CambiarEstadoComponent } from './cafecert/cambiarestado';

const routes: Routes = [
    {  path: '', component: AsignacionComponent },
    {  path: 'cafecert/cambiarestado', component: CambiarEstadoComponent },
        // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);