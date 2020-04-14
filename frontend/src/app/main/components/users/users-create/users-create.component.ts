import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from 'app/main/models/user.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'users-create',
    templateUrl: './users-create.component.html',
    styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
    userForm: FormGroup;
    roles: string[];
    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.userForm = this._formBuilder.group({
            firstName: [null, Validators.required],
            middleName: [null, Validators.required],
            lastName: [null, Validators.required],
            phoneNumber: [null, Validators.required],
            password: [null, Validators.required],
            role: [null, Validators.required]
        });
        this.roles = Object.values(environment.roles)
    }

    createUser() {
        const user = <User>{
            firstName: this.userForm.value.firstName,
            middleName: this.userForm.value.middleName,
            lastName: this.userForm.value.lastName,
            phoneNumber: this.userForm.value.phoneNumber,
            password: this.userForm.value.password,
            role: this.userForm.value.role
        }
        this.genericService.updateEntity(environment.entities.User, user).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}