import { RecoverypasswordComponent } from './recoverypassword';
import { ChangepasswordComponent } from './changepassword';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './login';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recoverypassword', component: RecoverypasswordComponent },
    { path: 'changepassword', component: ChangepasswordComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


export const appRoutingModule = RouterModule.forRoot(routes);