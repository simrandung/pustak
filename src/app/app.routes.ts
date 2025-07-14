import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/admin/admin-layout.component';
import { AdminHomeComponent } from './features/admin/admin-home.component';
import { RegisterComponent } from './features/auth/register.component';

export const routes: Routes = [
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children : [
            {path: 'home', component:AdminHomeComponent}

        ]
    },
    {
        path:'',
        redirectTo: 'register',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo:'register'
    }
    
];
