import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from "../../../shared/shared.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import * as fromProductState from "./store/user.reducers";
import { ProductEffects } from "./store/user.effects";
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherModule } from 'angular-feather';
import { Camera, RefreshCw, Save, Search, Plus, Trash2, X, CheckSquare, Edit } from 'angular-feather/icons';
import { NgxMaskModule, IConfig } from 'ngx-mask'


// Select some icons (use an object, not an array)
const icons = {
    Camera,
    RefreshCw,
    Save,
    Search,
    Plus,
    Trash2,
    X,
    CheckSquare,
    Edit
};

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        UsersComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature(fromProductState.usersStateFeatureKey, fromProductState.usersReducer),
        EffectsModule.forFeature([ProductEffects]),
        FeatherModule.pick(icons),
        NgxDatatableModule,
        PerfectScrollbarModule,
        SharedModule,
        NgxMaskModule.forRoot(),
        FontAwesomeModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }
