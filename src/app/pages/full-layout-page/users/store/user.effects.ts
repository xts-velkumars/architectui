import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, concatMap, catchError, tap, mergeMap } from "rxjs/operators";
import { UserService, NavigationService, AlertService } from "../../../../services/index";
import * as userActions from "./user.actions";

import { Users, User } from "../../../../models/users";
import { Action } from "@ngrx/store";

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private userService: UserService,
        private alertService: AlertService,
        private navigationService: NavigationService) { }


    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType<userActions.GetUsers>(userActions.UsersActionTypes.GET_USERS),
            concatMap((action) => this.userService.getUsers(action.isRefresh)),
            map((data: Users[]) => new userActions.GetUsersSuccess(data)),
            catchError(error => of(new userActions.GetUsersFailure(error)))
        )
    );

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType<userActions.GetUser>(userActions.UsersActionTypes.GET_USER),
            concatMap(action => this.userService.getUser(action.id)),
            map((data: User) => new userActions.GetUserSuccess(data)),
            catchError(error => of(new userActions.GetUserFailure(error)))
        )
    );


    saveUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType<userActions.SaveUser>(userActions.UsersActionTypes.SAVE_USER),
            concatMap(action =>
                this.userService.saveUser(action.payload).pipe(
                    map(response => new userActions.SaveUserSuccess(response)),
                    tap(() => {
                        debugger;
                        let msg = action.payload.id > 0 ? 'User updated successfully' : 'User added successfully';
                        this.alertService.success(msg);
                        this.navigationService.goToUsers()
                    }),
                    catchError(error => of(new userActions.SaveUserFailure(error))))
            ),

        )
    );


    // deleteUser$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType<userActions.DeleteUser>(userActions.UsersActionTypes.DELETE_USER),
    //         concatMap(action => this.userService.deleteUser(action.id)),
    //         map((data) => new userActions.DeleteUserSuccess(data)),
    //         tap(() => {
    //             this.alertService.success('User deleted successfully');
    //         }),
    //         catchError(error => of(new userActions.DeleteUserFailure(error)))
    //     ), { dispatch: true }
    // );


    deleteUser$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType<userActions.DeleteUser>(userActions.UsersActionTypes.DELETE_USER),
            map((action: userActions.DeleteUser) => action.id),
            mergeMap((id: number) =>
                this.userService.deleteUser(id).pipe(
                    map(() => new userActions.DeleteUserSuccess(id)),
                    catchError(error => of(new userActions.DeleteUserFailure(error)))
                )
            ),tap(() =>  this.navigationService.goToUsers())
        ))      
}