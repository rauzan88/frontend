import { Routes, RouterModule } from '@angular/router';
import { CertificadoComponent } from './cafecert/certificado';
import { NuevocertificadoComponent } from './cafecert/nuevocertificado';
import { BuscarclienteComponent } from './cafecert/buscarcliente';
import { EditarcertificadoComponent } from './cafecert/editarcertificado';
import { ListarcertificadoComponent } from './cafecert/listarcertificado';

const routes: Routes = [
    {  path: '', component: CertificadoComponent },
    {  path: 'cafecert/nuevocertificado', component: NuevocertificadoComponent },
    {  path: 'cafecert/buscarcliente', component: BuscarclienteComponent },
    {  path: 'cafecert/editarcertificado', component: EditarcertificadoComponent },
    {  path: 'cafecert/listarcertificado', component: ListarcertificadoComponent },
        // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);