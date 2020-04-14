import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AppStorageService } from './app-storage.service';
@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(
        public router: Router,
        private storageService: AppStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;
        const user = this.storageService.loadUser();
        if (user) {
            if (user.role === expectedRole) {
                return true;
            }
        }
        this.router.navigate(['login']);
        return false;
    }
}