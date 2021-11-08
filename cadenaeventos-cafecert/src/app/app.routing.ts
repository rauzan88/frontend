import { Routes, RouterModule } from '@angular/router';
import { FlujotrabajoComponent } from './cafecert/flujotrabajo';
import { CadenaeventoComponent } from './cafecert/cadenaevento';
import { ControleventoComponent } from './cafecert/controlevento';
import { ProcesaeventoComponent } from './cafecert/procesaevento';
import { EventoactualComponent } from './cafecert/eventoactual';
import { PreguntacerradaComponent } from './cafecert/preguntacerrada';
import { NoconformidadComponent } from './cafecert/noconformidad';
import { JustificarComponent } from './cafecert/justificar';
import { DetalleComponent } from './cafecert/detalle';
import { ArchivosComponent } from './cafecert/archivos';
import { PlantillaComponent } from './cafecert/plantilla';
import { ConfirmartareaComponent } from './cafecert/confirmartarea';
import { AsignarComponent } from './cafecert/asignar';
import { NuevaealuacionComponent } from './cafecert/nuevaevaluacion';

const routes: Routes = [
    {  path: '', component: FlujotrabajoComponent },
    {  path: 'cafecert/confirmartarea', component: ConfirmartareaComponent },
    {  path: 'cafecert/preguntacerrada', component: PreguntacerradaComponent },
    {  path: 'cafecert/cadenaevento', component: CadenaeventoComponent },
    {  path: 'cafecert/controlevento', component: ControleventoComponent },
    {  path: 'cafecert/procesaevento', component: ProcesaeventoComponent },
    {  path: 'cafecert/noconformidad', component: NoconformidadComponent },
    {  path: 'cafecert/justificar', component:     JustificarComponent },
    {  path: 'cafecert/eventoactual', component: EventoactualComponent },
    {  path: 'cafecert/plantilla', component: PlantillaComponent },
    {  path: 'cafecert/detalle', component: DetalleComponent },
    {  path: 'cafecert/archivos', component: ArchivosComponent },
    { path: 'cafecert/asignar', component: AsignarComponent },
    { path: 'cafecert/nuevaevaluacion', component: NuevaealuacionComponent },
        // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);