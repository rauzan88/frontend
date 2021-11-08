import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './cafecert/report/report.component';


const routes: Routes = [
    {  path: '', component: ReportComponent },
        // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);