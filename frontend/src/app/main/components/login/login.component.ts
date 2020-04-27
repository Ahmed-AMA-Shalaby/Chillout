import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { User } from 'app/main/models/user.model';
import { Router } from '@angular/router';
import { AppStorageService } from 'app/main/services/app-storage.service';
import { MatSnackBar } from '@angular/material';
import { BaseResponse } from 'app/main/models/base_response.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private storageService: AppStorageService,
        private snackbar: MatSnackBar,
        private router: Router
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            phoneNumber: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.storageService.removeUser();
    }

    login() {
        this.genericService.checkUser(this.loginForm.value.phoneNumber, this.loginForm.value.password).subscribe(data => {
            let user = data as User;
            if (user.role === environment.roles.Administrator) {
                this.storageService.storeUser(user);
                this._fuseNavigationService.setCurrentNavigation(environment.roles.Administrator);
                this.router.navigate(['/home']);
                this.snackbar.open(`Welcome, ${user.firstName}`);
            }
            else if (user.role === environment.roles.Operator) {
                this.storageService.storeUser(user);
                this._fuseNavigationService.setCurrentNavigation(environment.roles.Operator);
                this.router.navigate(['/home']);
                this.snackbar.open(`Welcome, ${user.firstName}`);
            }
            else {
                this.snackbar.open('User not authenticated');
            }

            let response = data as BaseResponse;
            if (response.error === true) {
                this.snackbar.open(response.message);
            }
        })
    }
}
