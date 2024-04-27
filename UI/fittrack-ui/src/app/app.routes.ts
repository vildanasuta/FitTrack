import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewAllActivitiesComponent } from './view-all-activities/view-all-activities.component';
import { AuthGuard } from './auth/auth-guard';
import { EditActivityComponent } from './edit-activity/edit-activity.component';

export const routes: Routes = [
    { path: '', redirectTo: '/first-screen', pathMatch: 'full' }, 
    { path: 'register', component: RegistrationComponent },
    { path: 'first-screen', component: FirstScreenComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'view-all-activities', component: ViewAllActivitiesComponent, canActivate: [AuthGuard]},
    { path: 'edit-activity', component: EditActivityComponent, canActivate: [AuthGuard]}
];
