import { NgModule } from '@angular/core';
import { ComponentsModule } from "./component/components.module";
import { LayoutModule } from "../layout/layout.module";
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
    imports: [
        ComponentsModule,
        LayoutModule,
        NgxPermissionsModule
    ],
    declarations: [

    ],
    exports: [
        ComponentsModule,
        LayoutModule,
        NgxPermissionsModule
    ],
    providers:[]
})


export class SharedModule { }
