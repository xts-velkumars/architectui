"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteserFailure = exports.DeleteUserSuccess = exports.DeleteUser = exports.SaveUserFailure = exports.SaveUserSuccess = exports.SaveUser = exports.GetUserFailure = exports.GetUserSuccess = exports.GetUser = exports.GetUsersFailure = exports.GetUsersSuccess = exports.GetUsers = exports.UsersActionTypes = void 0;
var UsersActionTypes;
(function (UsersActionTypes) {
    UsersActionTypes["GET_USERS"] = "[User] Get Users";
    UsersActionTypes["GET_USERS_SUCCESS"] = "[User] Get Users Success";
    UsersActionTypes["GET_USERS_FAILURE"] = "[User] Get Users Failure";
    UsersActionTypes["GET_USER"] = "[User] Get User";
    UsersActionTypes["GET_USER_SUCCESS"] = "[User] Get User Success";
    UsersActionTypes["GET_USER_FAILURE"] = "[User] Get User Failure";
    UsersActionTypes["SAVE_USER"] = "[User] Save User";
    UsersActionTypes["SAVE_USER_SUCCESS"] = "[User] Save User Success";
    UsersActionTypes["SAVE_USER_FAILURE"] = "[User] Save User Failure";
    UsersActionTypes["DELETE_USER"] = "[User] Delete User";
    UsersActionTypes["DELETE_USER_SUCCESS"] = "[User] Delete User Success";
    UsersActionTypes["DELETE_USER_FAILURE"] = "[User] Delete User Failure";
})(UsersActionTypes = exports.UsersActionTypes || (exports.UsersActionTypes = {}));
//Get All Users
var GetUsers = /** @class */ (function () {
    function GetUsers(isRefresh) {
        this.isRefresh = isRefresh;
        this.type = UsersActionTypes.GET_USERS;
    }
    return GetUsers;
}());
exports.GetUsers = GetUsers;
//Get All Users Success
var GetUsersSuccess = /** @class */ (function () {
    function GetUsersSuccess(data) {
        this.data = data;
        this.type = UsersActionTypes.GET_USERS_SUCCESS;
    }
    return GetUsersSuccess;
}());
exports.GetUsersSuccess = GetUsersSuccess;
//Get All Users Failure
var GetUsersFailure = /** @class */ (function () {
    function GetUsersFailure(error) {
        this.error = error;
        this.type = UsersActionTypes.GET_USERS_FAILURE;
    }
    return GetUsersFailure;
}());
exports.GetUsersFailure = GetUsersFailure;
//Get User
var GetUser = /** @class */ (function () {
    function GetUser(id) {
        this.id = id;
        this.type = UsersActionTypes.GET_USER;
    }
    return GetUser;
}());
exports.GetUser = GetUser;
//Get User Success
var GetUserSuccess = /** @class */ (function () {
    function GetUserSuccess(data) {
        this.data = data;
        this.type = UsersActionTypes.GET_USER_SUCCESS;
    }
    return GetUserSuccess;
}());
exports.GetUserSuccess = GetUserSuccess;
//Get User Failure
var GetUserFailure = /** @class */ (function () {
    function GetUserFailure(error) {
        this.error = error;
        this.type = UsersActionTypes.GET_USER_FAILURE;
    }
    return GetUserFailure;
}());
exports.GetUserFailure = GetUserFailure;
//Save User
var SaveUser = /** @class */ (function () {
    function SaveUser(payload) {
        this.payload = payload;
        this.type = UsersActionTypes.SAVE_USER;
    }
    return SaveUser;
}());
exports.SaveUser = SaveUser;
//Save User Success
var SaveUserSuccess = /** @class */ (function () {
    function SaveUserSuccess(response) {
        this.response = response;
        this.type = UsersActionTypes.SAVE_USER_SUCCESS;
    }
    return SaveUserSuccess;
}());
exports.SaveUserSuccess = SaveUserSuccess;
//Save User Failure
var SaveUserFailure = /** @class */ (function () {
    function SaveUserFailure(error) {
        this.error = error;
        this.type = UsersActionTypes.SAVE_USER_FAILURE;
    }
    return SaveUserFailure;
}());
exports.SaveUserFailure = SaveUserFailure;
//Delete User
var DeleteUser = /** @class */ (function () {
    function DeleteUser(payload) {
        this.payload = payload;
        this.type = UsersActionTypes.SAVE_USER;
    }
    return DeleteUser;
}());
exports.DeleteUser = DeleteUser;
//Delete User Success
var DeleteUserSuccess = /** @class */ (function () {
    function DeleteUserSuccess(response) {
        this.response = response;
        this.type = UsersActionTypes.SAVE_USER_SUCCESS;
    }
    return DeleteUserSuccess;
}());
exports.DeleteUserSuccess = DeleteUserSuccess;
//Delete User Failure
var DeleteserFailure = /** @class */ (function () {
    function DeleteserFailure(error) {
        this.error = error;
        this.type = UsersActionTypes.SAVE_USER_FAILURE;
    }
    return DeleteserFailure;
}());
exports.DeleteserFailure = DeleteserFailure;
//# sourceMappingURL=user.actions.js.map