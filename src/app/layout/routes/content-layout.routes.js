"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_ROUTES = void 0;
// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...
exports.CONTENT_ROUTES = [
    {
        path: "content-layout",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/content-pages.module"); }).then(function (m) { return m.ContentPagesModule; }); },
    },
    {
        path: "login",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/login/login.module"); }).then(function (m) { return m.LoginModule; }); },
    }
];
//# sourceMappingURL=content-layout.routes.js.map