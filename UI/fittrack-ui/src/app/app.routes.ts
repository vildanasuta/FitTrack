import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/first-screen', pathMatch: 'full' }, 
    { path: 'register', component: RegistrationComponent },
    { path: 'first-screen', component: FirstScreenComponent },
    { path: 'login', component: LoginComponent }
];
