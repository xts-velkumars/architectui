import { NgModule } from '@angular/core';
import { ComponentsModule } from "./component/components.module";
import { LayoutModule } from "../layout/layout.module";



@NgModule({
  imports: [
        ComponentsModule,
        LayoutModule,
       
  ],
  declarations: [

  ],
  exports: [
      ComponentsModule,
      LayoutModule,
  ]
})


export class SharedModule { }
