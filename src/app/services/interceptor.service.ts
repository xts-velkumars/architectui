import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, pipe, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { tap, finalize, concatMap, delay, retryWhen } from 'rxjs/operators';

import { SessionService } from "./session.service";
import { AuthenticationService } from './authentication.service';
import { NavigationService } from './navigation.service';
import { AlertService } from './alert.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    private baseUrl = environment.apiBaseUrl;

    private authService: AuthenticationService;
    private sessionService: SessionService;
    private alertService: AlertService;
    private navigationService: NavigationService;

    private retryCount = 3;
    private retryWaitMilliSeconds = 500;

    constructor(private injector: Injector) {

        this.alertService = this.injector.get(AlertService);
        this.authService = this.injector.get(AuthenticationService);
        this.sessionService = this.injector.get(SessionService);
        this.navigationService = this.injector.get(NavigationService);
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let ok: string;
        const started = Date.now();

        // Handle request
        request = this.addAuthHeader(request);

        return next.handle(request).pipe(
            tap(event => ok = event instanceof HttpResponse ? 'succeeded' : ''),
            retryWhen(error => error.pipe(concatMap((error, count) => {
                ok = 'failed'
                if (count <= this.retryCount && this.isRetry(error)) {
                    return of(error);
                }
                return this.handleResponseError(error, request, next);
            }), delay(this.retryWaitMilliSeconds),
                tap(err => console.log("Retrying...")))
            ), finalize(() => {
                this.consoleLogRequestTime(started, ok, request);
            }))
    }

    handleResponseError(error, request?: HttpRequest<any>, next?: HttpHandler) {

        // Server unavailable 
        if (error.status === 0 && (error.statusText === '' || error.statusText === 'Unknown Error')) {
            this.alertService.error('Unable to connect to the server, please try again in a couple of seconds.');
        }

        // Business error
        else if (error.status === 400) {
            // Show message
            this.broadcastFriendlyErrorMessage(error);
        }

        // Invalid token error
        else if (error.status === 401) {
            this.authService.logOut();
            this.navigationService.goToLogin()
        }

        // Access denied error
        else if (error.status === 403) {
            this.alertService.warning("You don't have permission. Please contact your administrator");
        }

        // Server error
        else if (error.status === 500) {
            if (error.error) {
                this.alertService.error(error.error);
            }
        }

        // Maintenance error
        else if (error.status === 503) {
            // Redirect to the maintenance page
            this.alertService.error(error.response);
        }

        else if (error.responseStatus === 0) {
            this.alertService.error('Error occured, while uploading file');
        }

        return throwError(error);
    }

    broadcastFriendlyErrorMessage(error) {
        let msg = '';
        if (typeof error.error === "object") {
            let validationMessage = [];
            let validationErrorDictionary = error.error.errors;
            for (let fieldName in validationErrorDictionary) {
                if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                    validationMessage.push(validationErrorDictionary[fieldName]);
                }
            }
            msg = validationMessage.join(', ');
        }
        else if (error.error.length > 0 && error.error[0].description) {
            let validationMessage = [];
            for (let index = 0; index < error.error.length; index++) {
                validationMessage.push(error.error[index].description);
            }
            msg = validationMessage.join(', ');
        }
        else if (error.error) {
            msg = error.error;
        }
        else {
            msg = error.message;
        }
        this.alertService.error(msg);
    }


    reAuthenticate(): Observable<any> {
        // Do your auth call here
        return;
    }

    consoleLogRequestTime(started, ok: string, request: HttpRequest<any>) {
        const action = request.urlWithParams.replace(this.baseUrl, '');
        if (this.isNewVersionCheckRoute(action))
            return;

        const elapsed = Date.now() - started;
        const msg = `${action} ${ok} in ${elapsed} ms.`;
        console.log(msg);
    }

    canAddAuthHeader(): boolean {
        const authToken = this.sessionService.authToken();
        if (this.sessionService.userId() && authToken) {
            return true;
        }
        return false;
    }

    isRetry(error) {
        // Allow retry on if Server unavailable         
        return (error.status === 0 && (error.statusText === '' || error.statusText === 'Unknown Error'))
    }


    addAuthHeader(request: HttpRequest<any>) {
        const authToken = this.sessionService.authToken();

        if (this.canAddAuthHeader()) {
            return request.clone({
                setHeaders: {
                    "Authorization": `Bearer ${authToken}`
                }
            });
        }
        return request;
    }

    isNewVersionCheckRoute(action: string | string[]): boolean {
        return action.indexOf('version') >= 0;
    }
}

