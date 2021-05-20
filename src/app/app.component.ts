import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';

import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService, SessionService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {

  spinnerComponent = SpinnerComponent;
  title = 'ArchitectUI - Angular 7 Bootstrap 4 & Material Design Admin Dashboard Template';


  filteredUrlPatterns = [
    '/version.json'
  ];

  constructor(private sessionService: SessionService,
    private permissionsService: NgxPermissionsService) {

  }

  ngOnInit(): void {
    this.loadPermissions(this.sessionService.roleName());   
  }

  loadPermissions(roleName: string) {
    let permissions = [];
    permissions.push(roleName);
    this.permissionsService.loadPermissions(permissions);
  }
}