import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';


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
        path: ':id',
        component: UserComponent,
        //canActivate: [AuthGuard],
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
