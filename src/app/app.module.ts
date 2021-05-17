import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationBarModule } from 'ngx-notification-bar'
import { NgHttpLoaderModule } from 'ng-http-loader';

import { reducers, metaReducers } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// BOOTSTRAP COMPONENTS
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// LAYOUT
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';


import {
    DataService, UserService, AlertService,
    HttpInterceptorService, NavigationService

} from "./services";



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        // LAYOUT
        AppComponent,
        BaseLayoutComponent,
        PagesLayoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,

        //Ngrx Store 
        EffectsModule.forRoot([]),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({ maxAge: 25 }),

        // Angular Bootstrap Components
        PerfectScrollbarModule,
        NgbModule,
        HttpClientModule,
        NotificationBarModule,
        NgHttpLoaderModule.forRoot()
    ],
    providers: [
        DataService,
        UserService,
        AlertService,
        NavigationService,
        {
            provide:
                PERFECT_SCROLLBAR_CONFIG,
            useValue:
                DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        HttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
