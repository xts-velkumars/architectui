import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'

import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from "../../../models/users/user.model";
import { ActivatedRoute } from '@angular/router';

import { UtilityService, UserService, AlertService, NavigationService } from "../../../services/index"

import * as fromActions from "./store/user.actions";
import * as fromUser from './store/user.reducers';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
    heading = 'Form Controls';
    subheading = '';
    icon = 'pe-7s-display1 icon-gradient bg-premium-dark';

    userFormSubmitted = false;
    private id: number;

    userForm: FormGroup;


    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private store: Store<fromUser.UserState>,
        private userService: UserService,
        private navigationService: NavigationService,
        private alertService: AlertService,
        private utilityService: UtilityService) {

        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });        
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
            mobileNumber: ["", [Validators.pattern("[0-9]*")]],
            roleType: ["1"]
        });
    }

    saveUser() {
        this.userFormSubmitted = true;
        if (this.userForm.valid) {
            this.store.dispatch(new fromActions.SaveUser(this.userForm.value));
        }
        else {
            this.utilityService.validateFormControl(this.userForm);
        }
    }

    getUser() {
        if (this.id > 0) {

            this.store.dispatch(new fromActions.GetUser(this.id));

            this.store
                .pipe(select(fromUser.getUser))
                .subscribe(data => {
                    this.userForm.patchValue(data);
                });
        }
    }
}
