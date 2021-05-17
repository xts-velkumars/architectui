import { Injectable } from "@angular/core";
import { DataService  } from "./data.service";
import { RouteHelperService  } from "./route.helper.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Users, User } from '../models/users';


@Injectable()
export class UserService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    getUsers(refresh: boolean): Observable<Users[]> {
        return this.dataService.getData(this.routeHelperService.USER.getUsersRoute(), refresh);
    }

    getUser(id: number) {
        return this.dataService.getRecord(this.routeHelperService.USER.getUserRoute(id));
    }

    saveUser(user: User) {
        return this.dataService.post(this.routeHelperService.USER.saveUserRoute(), user).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.USER.getUsersRoute());
            return response;
        }));
    }

    deleteUser(id: number) {
        return this.dataService.delete(this.routeHelperService.USER.deleteUserRoute(id));
    }
}
