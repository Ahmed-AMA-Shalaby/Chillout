import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { User } from 'app/main/models/user.model';
import { MatSnackBar } from '@angular/material';
import { AppStorageService } from 'app/main/services/app-storage.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private storageService: AppStorageService,
        private snackbar: MatSnackBar,
        private router: Router,
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

    ngOnInit() {
        this.registerForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    register(){
        const user = <User>{
            firstName: this.registerForm.value.firstName,
            middleName: this.registerForm.value.middleName,
            lastName: this.registerForm.value.lastName,
            phoneNumber: this.registerForm.value.phoneNumber,
            password: this.registerForm.value.password,
            role: environment.roles.Administrator
        }

        
        this.genericService.updateEntity(environment.entities.User, user).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
                this.storageService.storeUser(user);
                this._fuseNavigationService.setCurrentNavigation(environment.roles.Administrator);
                this.router.navigate(['/home']);
                this.snackbar.open(`Welcome, ${user.firstName}`);
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
        
    }
}