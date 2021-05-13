import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../pages/full-layout-page/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'users',
        loadChildren: () => import("../../pages/full-layout-page/users/users.module").then(m => m.UsersModule)
    }
];
