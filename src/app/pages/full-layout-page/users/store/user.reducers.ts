import {
    createFeatureSelector,
    createSelector,
    createReducer,
    on
} from "@ngrx/store";

import { User, Users } from "../../../../models/users/index";
import * as userActions from "./user.actions";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface UserState extends EntityState<Users> {
    error: any;
    selectedUser: User;
}

export const userAdapter: EntityAdapter<Users> = createEntityAdapter<Users>();

export const initialState = userAdapter.getInitialState({
    error: null,
    selectedUser: null
});


export function usersReducer(state = initialState, action: userActions.UserActions): UserState {
    switch (action.type) {
        case userActions.UsersActionTypes.GET_USERS_SUCCESS: {
            console.log(action.data);

            return userAdapter.addMany(action.data, {
                ...state
            });
        }
        case userActions.UsersActionTypes.GET_USERS_FAILURE: {
            return {
                ...state,
                error: action.error
            };
        }
        case userActions.UsersActionTypes.GET_USER_SUCCESS: {
            console.log(action.data);
            return {
                ...state,
                selectedUser: action.data
            };
        }
        case userActions.UsersActionTypes.GET_USER_FAILURE: {
            return {
                ...state,
                error: action.error
            };
        }

        case userActions.UsersActionTypes.SAVE_USER: {
            return {
                ...state
            };
        }
        case userActions.UsersActionTypes.SAVE_USER_SUCCESS: {
            return {
                ...state
            };
        }
        case userActions.UsersActionTypes.SAVE_USER_FAILURE: {
            return {
                ...state,
                error: action.error
            };
        }
        case userActions.UsersActionTypes.DELETE_USER_SUCCESS: {
            return userAdapter.removeOne(action.payload, {
                ...state
            });
        }
        case userActions.UsersActionTypes.DELETE_USER_FAILURE: {
            return {
                ...state,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
}

export const { selectAll, selectIds, selectEntities } = userAdapter.getSelectors();

export const usersStateFeatureKey = "users";

export const userFeatureState = createFeatureSelector<UserState>(usersStateFeatureKey);

export const getUsers = createSelector(userFeatureState, selectAll);

export const getError = createSelector(userFeatureState, (state: UserState) => state.error);

export const getUser = createSelector(userFeatureState, (state: UserState) => state.selectedUser);