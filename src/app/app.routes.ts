import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './features/admin/admin-dashboard/admin-home.component';
import { ManageBooksComponent } from './features/admin/manage-books/manage-books.component';
// import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    {
        path:'register',
        loadComponent:() => import('./features/auth/register/register.component').then(m => m.RegisterComponent) 
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children : [
            {path: 'home', component:AdminHomeComponent},
            {path:'manage-books',component:ManageBooksComponent}

        ]
    },
    
    {
        path:'landingPage',
       loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
    },
    {
        path:'user',
        loadChildren:() =>
            import('./features/user/user-dashboard/user-dashboard.routes').then(
                (m) => m.USER_ROUTES
            )
    },
    {
        path: '**',
        redirectTo:'landingPage'
    }
    
];
