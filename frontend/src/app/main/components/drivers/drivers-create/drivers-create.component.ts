import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DriverService } from 'app/main/services/driver.service';
import { Driver } from 'app/main/models/driver.model';

@Component({
    selector: 'drivers-create',
    templateUrl: './drivers-create.component.html',
    styleUrls: ['./drivers-create.component.scss']
})
export class DriversCreateComponent implements OnInit {
    driverForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private driverService: DriverService
    ) { }

    ngOnInit() {
        this.driverForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        });
    }

    createDriver() {
        const driver = <Driver>{
            firstName: this.driverForm.value.firstName,
            middleName: this.driverForm.value.middleName,
            lastName: this.driverForm.value.lastName,
            phoneNumber: this.driverForm.value.phoneNumber
        }
        this.driverService.createDriver(driver).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}