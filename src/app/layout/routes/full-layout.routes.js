"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Full_ROUTES = void 0;
// Route for content layout with sidebar, navbar and footer
exports.Full_ROUTES = [
    {
        path: 'dashboard',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../pages/full-layout-page/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); }
    },
    {
        path: 'users',
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/full-layout-page/users/users.module"); }).then(function (m) { return m.UsersModule; }); }
    }
    //{
    //    path: 'projects',
    //    loadChildren: () => import('../../pages/full-layout-page/project/project.module').then(m => m.ProjectModule)
    //},
    //{
    //    path: 'project/:id',
    //    loadChildren: () => import('../../pages/full-layout-page/projectdetails/projectdetails.module').then(m => m.ProjectdetailsModule)
    //},
    //{
    //    path: 'error',
    //    loadChildren: () => import("../../pages/full-layout-page/error/error-routing.module").then(m => m.ErrorRoutingModule)
    //},
    //{
    //    path: 'unauthorized',
    //    loadChildren: () => import('../../pages/full-layout-page/unauthorized/unauthorized.module').then(m => m.UnAuthorizedModule)
    //},
    //{
    //{
    //    path: 'profile',
    //    loadChildren: () => import("../../pages/full-layout-page/profile/profile.module").then(m => m.ProfileModule)
    //},
];
//# sourceMappingURL=full-layout.routes.js.map