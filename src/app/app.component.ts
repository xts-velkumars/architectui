import { Component } from '@angular/core';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {

  spinnerComponent = SpinnerComponent;
  title = 'ArchitectUI - Angular 7 Bootstrap 4 & Material Design Admin Dashboard Template';


  filteredUrlPatterns = [
    '/version.json'
  ];

}
