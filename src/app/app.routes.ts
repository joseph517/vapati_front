import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'home',
        loadChildren: () => import('./home/home-routes').then(m => m.HOME_ROUTES),
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/login-routes').then(m => m.LOGIN_ROUTES),
    },
    {
        path: '**',
        redirectTo: 'home',
    }

];
