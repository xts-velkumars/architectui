import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';

import {ComponentChangeDetectionGuard} from "../../../guards/component-changedetection-guard.service"

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        //canActivate: [AuthGuard],
        data: {
            title: 'Users',
            //requiredPermission: [RoleType.SuperAdmin]
        }
    },
    {
        path: 'add',
        component: UserComponent,
        //canActivate: [AuthGuard],
        data: {
            title: 'User',
            //requiredPermission: [RoleType.SuperAdmin]
        }
    },
    {
        path: ':id',
        component: UserComponent,
        canDeactivate: [ComponentChangeDetectionGuard],
        data: {
            title: 'User',
            //requiredPermission: [RoleType.SuperAdmin]
        }
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
