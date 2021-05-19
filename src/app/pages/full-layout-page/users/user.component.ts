import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService, ModalService } from "../../../services/index"

import * as fromUserActions from "./store/user.actions";
import * as fromUser from './store/user.reducers';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {

    heading = '';
    subheading = '';
    icon = 'pe-7s-display1 icon-gradient bg-premium-dark';

    userFormSubmitted = false;
    private id: number;
    userForm: FormGroup;
    destroyed$ = new Subject<boolean>();

    constructor(private formBuilder: FormBuilder,
        private updates$: Actions,
        private route: ActivatedRoute,
        private modalService: ModalService,
        private store: Store<fromUser.UserState>,
        private utilityService: UtilityService) {

        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.heading = this.id === 0 ? 'Create User' : 'Edit User';

        this.updates$.pipe(
            ofType<fromUserActions.SaveUserSuccess>(fromUserActions.UsersActionTypes.SAVE_USER_SUCCESS),
            takeUntil(this.destroyed$))
            .subscribe(() => {
                this.userForm.reset();
            });
    }


    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

        if (this.userForm.dirty) {

            return this.modalService.questionModal("Discard Confirmation", 'Are you sure you want to discard your changes?', false)
                .result.then(result => {
                    if (result)
                        return true;
                    else
                        return false;
                }, () => false);
        }
        return of(true);
    }

    ngOnInit(): void {
        this.initializeValidators();
        this.getUser();
    }

    get lf() {
        return this.userForm.controls;
    }

    initializeValidators() {
        this.userForm = this.formBuilder.group({
            id: [0, [Validators.required]],
            emailAddress: new FormControl("", { validators: [Validators.required, Validators.email] }),
            firstName: ["", [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
            lastName: ["", [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
            password: new FormControl({ value: "", disabled: this.id > 0 }, [Validators.required, Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,25})")]),
            confirmPassword: new FormControl({ value: "", disabled: this.id > 0 }, [Validators.required]),
            mobileNumber: ["", [Validators.required, Validators.pattern("[0-9]*")]],
            roleType: ["1"]
        });
    }

    saveUser() {
        this.userFormSubmitted = true;
        if (this.userForm.valid) {
            this.store.dispatch(new fromUserActions.SaveUser(this.userForm.value));
        }
        else {
            this.utilityService.validateFormControl(this.userForm);
        }
    }

    getUser() {
        if (this.id > 0) {

            this.store.dispatch(new fromUserActions.GetUser(this.id));

            this.store
                .pipe(select(fromUser.getUser))
                .subscribe(data => {
                    this.userForm.patchValue(data);
                });
        }
    }
}
