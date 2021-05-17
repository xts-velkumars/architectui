import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

//import { UserSessionService } from './usersession.service';
//import { AuthenticationService } from './authentication.service';

import { AlertService } from './alert.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    private baseUrl = environment.apiBaseUrl;

    constructor(
        private router: Router,
        //private sessionService: UserSessionService,
        //private authService: AuthenticationService,
        private alertService: AlertService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const started = Date.now();

        // add authorization header with jwt token if available
        //const authToken = this.sessionService.authToken();

        //const isTokenEndPoint = request.url.match('/api/token');
        //if (isTokenEndPoint === null && this.sessionService.userId() && authToken) {
        //    request = request.clone({
        //        setHeaders: {
        //            Authorization: `Bearer ${authToken}`
        //        }
        //    });
        //}

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    const action = request.urlWithParams.replace(this.baseUrl, '');
                    const elapsed = Date.now() - started;

                    if (!this.isNewVersionCheckRoute(action))
                        console.log(`${action} took ${elapsed} milliseconds`);
                }
            },
                error => {
                    if (error.status === 401) {
                        //this.authService.logOut();
                        this.router.navigate(['/login']);
                    } else if (error.status === 403) {
                        //this.alertService.warning("You don't have permission. Please contact your administrator");
                    } else {
                        const action = request.urlWithParams.replace(this.baseUrl, '');
                        if (!this.isNewVersionCheckRoute(action))
                            this.broadcastFriendlyErrorMessage(error);
                    }

                    // return the error to the method that called it
                    return throwError(error);
                }));
    }

    broadcastFriendlyErrorMessage(rejection) {
        let msg = '';
        if (rejection.status === 0 && (rejection.statusText === '' || rejection.statusText === 'Unknown Error')) {
            this.alertService.error('Unable to connect to the server, please try again in a couple of seconds.');
        } else if (rejection.status === 400) {
            if (typeof rejection.error === "object") {
                let validationMessage = [];
                let validationErrorDictionary = rejection.error.errors;
                for (let fieldName in validationErrorDictionary) {
                    if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                        validationMessage.push(validationErrorDictionary[fieldName]);
                    }
                }
                msg = validationMessage.join(', ');
            }
            else if (rejection.error.length > 0 && rejection.error[0].description) {
                let validationMessage = [];
                for (let index = 0; index < rejection.error.length; index++) {
                    validationMessage.push(rejection.error[index].description);
                }
                msg = validationMessage.join(', ');
            }
            else if (rejection.error) {
                msg = rejection.error;
            }
            else {
                msg = rejection.message;
            }
            this.alertService.error(msg);
        } else if (rejection.status === 404) {
            if (rejection.message) {
                this.alertService.error(rejection.message);
            }
        } else if (rejection.status === 500) {
            if (rejection.error) {
                this.alertService.error(rejection.error);
            }
            else if (rejection.message) {
                let ex = rejection.message;
                while (ex.innerException) {
                    ex = ex.innerException;
                }
                this.alertService.error(ex.exceptionMessage);
            }
        } else if (rejection.responseStatus === 401) {
            //this.authService.logOut();
            this.router.navigate(['/login']);
        } else if (rejection.responseStatus === 0) {
            this.alertService.error('Error occured, while uploading file');
        } else if (rejection.responseStatus === 400) {
            if (rejection.response) { // jshint ignore:line
                msg = rejection.response; // jshint ignore:line
            }
            this.alertService.error(msg);
        }
    }

    isNewVersionCheckRoute(action): boolean {
        return action.indexOf('version') >= 0;
    }
}
