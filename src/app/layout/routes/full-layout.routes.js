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
];
//# sourceMappingURL=full-layout.routes.js.map