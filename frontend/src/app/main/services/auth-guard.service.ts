import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AppStorageService } from './app-storage.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        public router: Router,
        private storageService: AppStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const user = this.storageService.loadUser();
        if (user) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}