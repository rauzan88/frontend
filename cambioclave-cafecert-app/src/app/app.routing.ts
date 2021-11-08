import { ChangepasswordComponent } from './changepassword';
import { Routes, RouterModule, Router } from '@angular/router';


const routes: Routes = [
    { path: '', component: ChangepasswordComponent },
    { path: 'changepassword', component: ChangepasswordComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


export const appRoutingModule = RouterModule.forRoot(routes);