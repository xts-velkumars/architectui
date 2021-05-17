"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getError = exports.getUsers = exports.userFeatureState = exports.usersStateFeatureKey = exports.selectIds = exports.selectAll = exports.usersReducer = exports.initialState = exports.userAdapter = void 0;
var store_1 = require("@ngrx/store");
var userActions = require("./user.actions");
var entity_1 = require("@ngrx/entity");
exports.userAdapter = entity_1.createEntityAdapter();
exports.initialState = exports.userAdapter.getInitialState({
    error: null,
    selectedUser: null
});
function usersReducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case userActions.UsersActionTypes.GET_USERS_SUCCESS: {
            return exports.userAdapter.addMany(action.data, state);
        }
        case userActions.UsersActionTypes.GET_USERS_FAILURE: {
            return __assign(__assign({}, state), { error: action.error });
        }
        case userActions.UsersActionTypes.GET_USER_SUCCESS: {
            return __assign(__assign({}, state), { selectedUser: action.data });
        }
        case userActions.UsersActionTypes.GET_USER_FAILURE: {
            return __assign(__assign({}, state), { error: action.error });
        }
        case userActions.UsersActionTypes.SAVE_USER: {
            return __assign({}, state);
        }
        case userActions.UsersActionTypes.SAVE_USER_SUCCESS: {
            return __assign({}, state);
        }
        case userActions.UsersActionTypes.SAVE_USER_FAILURE: {
            return __assign(__assign({}, state), { error: action.error });
        }
        default: {
            return state;
        }
    }
}
exports.usersReducer = usersReducer;
exports.selectAll = (_a = exports.userAdapter.getSelectors(), _a.selectAll), exports.selectIds = _a.selectIds;
exports.usersStateFeatureKey = "users";
exports.userFeatureState = store_1.createFeatureSelector(exports.usersStateFeatureKey);
exports.getUsers = store_1.createSelector(exports.userFeatureState, exports.selectAll);
exports.getError = store_1.createSelector(exports.userFeatureState, function (state) { return state.error; });
exports.getUser = store_1.createSelector(exports.userFeatureState, function (state) { return state.selectedUser; });
//# sourceMappingURL=user.reducers.js.map