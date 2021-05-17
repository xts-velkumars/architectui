import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RouteHelperService {

    readonly USER = {

        getUsersRoute: (): string => "/api/users",
        getUserRoute: (id: number): string => `/api/user/${id}`,
        saveUserRoute: (): string => "/api/user",
        deleteUserRoute: (id: number): string => `/api/user/${id}`,
    }
}