import { Action, createAction, props } from "@ngrx/store";
import { Users, User } from "../../../../models/users/index";


export enum UsersActionTypes {
    GET_USERS = "[User] Get Users",
    GET_USERS_SUCCESS = "[User] Get Users Success",
    GET_USERS_FAILURE = "[User] Get Users Failure",

    GET_USER = "[User] Get User",
    GET_USER_SUCCESS = "[User] Get User Success",
    GET_USER_FAILURE = "[User] Get User Failure",

    SAVE_USER = "[User] Save User",
    SAVE_USER_SUCCESS = "[User] Save User Success",
    SAVE_USER_FAILURE = "[User] Save User Failure",

    DELETE_USER = "[User] Delete User",
    DELETE_USER_SUCCESS = "[User] Delete User Success",
    DELETE_USER_FAILURE = "[User] Delete User Failure",
}


//Get All Users
export class GetUsers implements Action {
    readonly type = UsersActionTypes.GET_USERS;

    constructor(public isRefresh: boolean) { }
}

//Get All Users Success
export class GetUsersSuccess implements Action {
    readonly type = UsersActionTypes.GET_USERS_SUCCESS;

    constructor(public data: Users[]) { }
}

//Get All Users Failure
export class GetUsersFailure implements Action {
    readonly type = UsersActionTypes.GET_USERS_FAILURE;

    constructor(public error: string) { }
}

//Get User
export class GetUser implements Action {
    readonly type = UsersActionTypes.GET_USER;

    constructor(public id: number) { }
}

//Get User Success
export class GetUserSuccess implements Action {

    readonly type = UsersActionTypes.GET_USER_SUCCESS;

    constructor(public data: User) { }
}

//Get User Failure
export class GetUserFailure implements Action {
    readonly type = UsersActionTypes.GET_USER_FAILURE;

    constructor(public error: string) { }
}

//Save User
export class SaveUser implements Action {
    readonly type = UsersActionTypes.SAVE_USER;

    constructor(public payload: User) { }
}

//Save User Success
export class SaveUserSuccess implements Action {
    readonly type = UsersActionTypes.SAVE_USER_SUCCESS;

    constructor(public response: number) { }
}

//Save User Failure
export class SaveUserFailure implements Action {
    readonly type = UsersActionTypes.SAVE_USER_FAILURE;

    constructor(public error: string) { }
}

//Delete User
export class DeleteUser implements Action {
    readonly type = UsersActionTypes.DELETE_USER;

    constructor(public id: number) { }
}

//Delete User Success
export class DeleteUserSuccess implements Action {
    readonly type = UsersActionTypes.DELETE_USER_SUCCESS;

    constructor(public payload: number) {}
}

//Delete User Failure
export class DeleteUserFailure implements Action {
    readonly type = UsersActionTypes.DELETE_USER_FAILURE;

    constructor(public error: string) { }
}


export type UserActions =
    | GetUsers
    | GetUsersSuccess
    | GetUsersFailure

    | GetUser
    | GetUserSuccess
    | GetUserFailure

    | SaveUser
    | SaveUserSuccess
    | SaveUserFailure
    
    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserFailure;