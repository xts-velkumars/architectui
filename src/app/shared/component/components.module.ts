import { NgModule } from '@angular/core';
import { SpinnerComponent } from "./spinnercomponent/spinner.component";
//import { ConfirmationModalComponent } from "./modalcomponent/confirmationmodal.component";
//import { GenericMessageModalComponent } from "./modalcomponent/genericmessagemodal.component";



export const components = [
  SpinnerComponent
  //ConfirmationModalComponent,
 // GenericMessageModalComponent
];

@NgModule({
  declarations: [components],
  imports: [],
  exports: [components],

})
export class ComponentsModule { }
