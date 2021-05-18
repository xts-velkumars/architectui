import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, SessionService, UtilityService } from "../../../services/index";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    returnUrl: string;
    loginFormSubmitted = false;


    constructor(private router: Router,
        private authService: AuthenticationService,
        private utilityService: UtilityService,
        private route: ActivatedRoute) {
        this.router = router;
    }

    ngOnInit() {
        this.authService.logOut();
        this.initializeValidators();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    initializeValidators() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }
    

    get lf() {
        return this.loginForm.controls;
    }

    onLogin() {
        this.loginFormSubmitted = true;
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
                this.router.navigate([this.returnUrl]);
            });
        } else {
            this.utilityService.validateFormControl(this.loginForm);
        }
    }
}