import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import {
    ColumnMode,
    DatatableComponent
} from '@swimlane/ngx-datatable';


import { NavigationService, ModalService } from "../../../services";
import { Users } from "../../../models/users/users.model";

import * as fromUserActions from "./store/user.actions";
import * as fromUser from './store/user.reducers';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit, AfterViewInit {

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
        private navigationService: NavigationService,
        private modalService: ModalService,
        private changeDetectorRef: ChangeDetectorRef) { }


    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    ngOnInit(): void {
        this.getUsers(false);
    }

    getUsers(isRefresh: boolean) {
        this.store.dispatch(new fromUserActions.GetUsers(isRefresh));
        this.users$ = this.store.pipe(select(fromUser.getUsers));
    }

    refreshClicked() {
        this.getUsers(true);
    }

    onNewClicked() {
        this.navigationService.goToUser(0);
    }

    onDelete(data: Users) {

        return this.modalService.questionModal("Delete Confirmation", 'Are you sure you want to delete the user?', true)
            .result.then(result => {
                if (result) {
                    this.store.dispatch(new fromUserActions.DeleteUser(data.id));
                    this.users$ = this.store.pipe(select(fromUser.getUsers));
                }

            }, () => false);
    }
}
