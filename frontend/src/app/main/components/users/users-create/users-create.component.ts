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

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.userForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            password: ['', Validators.required],
            role: ['', Validators.required]
        });
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
        this.genericService.createEntity(environment.entities.User, user).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}