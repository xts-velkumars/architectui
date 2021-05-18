import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from "@ngrx/store";
import { Observable, Subject } from "rxjs";

import {
    ColumnMode,
    DatatableComponent,
    SelectionType
} from '@swimlane/ngx-datatable';


import { NavigationService } from "../../../services/navigation.service";
import { Users } from "../../../models/users/users.model";

import * as fromUserActions from "./store/user.actions";
import * as fromUser from './store/user.reducers';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    public ColumnMode = ColumnMode;
    public rows: Users[] = [];


    public columns = [
        { name: 'Id', prop: 'id' },
        { name: 'Email', prop: 'emailAddress' },
        { name: 'Full Name', prop: 'fullName' }
    ];

    timeout: any;

    heading = 'Users';
    subheading = "";
    icon = 'pe-7s-display1 icon-gradient bg-premium-dark';
    faPlus = faPlus;
    faSyncAlt = faSyncAlt;

    users$: Observable<Users[]>;
    error$: Observable<String>;

    constructor(private store: Store<fromUser.UserState>,
        private navigationService: NavigationService) { }

    ngOnInit(): void {
        this.getUsers(false);
    }

    getUsers(isRefresh: boolean) {
        this.store.dispatch(new fromUserActions.GetUsers(isRefresh));
        this.users$ = this.store.pipe(select(fromUser.getUsers));
    }

    refreshClicked() {
        console.log('refreshClicked');
        this.getUsers(true);
    }

    onNewClicked() {
        console.log('onNewClicked');
        this.navigationService.goToUser(0);
    }

    onDelete(data: Users) {
        if (confirm("Are You Sure You want to Delete the User?")) {
            this.store.dispatch(new fromUserActions.DeleteUser(data.id));
            this.users$ = this.store.pipe(select(fromUser.getUsers));
        }
    }

}
