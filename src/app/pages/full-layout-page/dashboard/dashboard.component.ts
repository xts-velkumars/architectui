import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private permissionsService: NgxPermissionsService) {

    }

    ngOnInit() {
        var permissions = this.permissionsService.getPermissions();      
    }
}