import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './cafecert/solicitud';
import { AsignarComponent } from './cafecert/asignar';
import { CrearSolicitudComponent } from './cafecert/crearsolicitud';
import { EditarSolicitudComponent } from './cafecert/editarsolicitud';
import { ConsultaComponent } from './cafecert/consulta';
import { ArchivosComponent } from './cafecert/archivos';
import { NuevaealuacionComponent } from './cafecert/nuevaevaluacion';
import { BuscarclienteComponent } from './cafecert/buscarcliente';

const routes: Routes = [
    { path: '', component: SolicitudComponent },
        // otherwise redirect to home
    { path: 'cafecert/asignar', component: AsignarComponent },
    { path: 'cafecert/crearsolicitud', component: CrearSolicitudComponent },
    { path: 'cafecert/editarsolicitud', component: EditarSolicitudComponent },
    { path: 'cafecert/consulta', component: ConsultaComponent },
    { path: 'cafecert/archivos', component: ArchivosComponent },
    { path: 'cafecert/nuevaevaluacion', component: NuevaealuacionComponent },
    { path: 'cafecert/buscarcliente', component: BuscarclienteComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);