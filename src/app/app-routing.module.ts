import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';


import { Full_ROUTES } from './layout/routes/full-layout.routes';
import { CONTENT_ROUTES } from './layout/routes/content-layout.routes';
import {AuthGuardChild} from "./guards/auth-guardchild.service";
 

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '', component: BaseLayoutComponent,
        data: {
            title: 'full Views'
        },
        children: Full_ROUTES,
        canActivateChild: [AuthGuardChild]
    },
    {
        path: '',
        component: PagesLayoutComponent,
        data: { title: 'content Views' },
        children: CONTENT_ROUTES
    },
    {
        path: '**',
        redirectTo: 'error',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
    {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
