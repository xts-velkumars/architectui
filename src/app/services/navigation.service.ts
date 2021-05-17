import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
 export class NavigationService {
    constructor(private router: Router) { }

    isOnLoginScreen(): boolean {
        return this.router.url === "/login";
    }
 
    goToLogin() {
        this.router.navigate(["/login"]);
    }
 
    goToDashboard() {
        this.router.navigate(["/dashboard"]);
    }

    goToUsers() {
        this.router.navigate(["/users"]);
    }

    goToUser(id: number) {
        this.router.navigate(["/users/" + id]);
    }
 
}
