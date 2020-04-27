import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Vehicle } from 'app/main/models/vehicle.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'vehicles-create',
    templateUrl: './vehicles-create.component.html',
    styleUrls: ['./vehicles-create.component.scss']
})
export class VehiclesCreateComponent implements OnInit {
    vehicleForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.vehicleForm = this._formBuilder.group({
            vehicleCode: [null, Validators.required],
            vehiclePlateNumbers: [null, Validators.required],
            vehiclePlateLetters: [null, Validators.required],
            vehicleCard: [null, Validators.required],
            trailerPlateNumbers: [null, Validators.required],
            trailerPlateLetters: [null, Validators.required],
            vehiclePhoneNumber:  [null, Validators.required]
        });
    }

    createVehicle() {
        const vehicle = <Vehicle>{
            vehicleCode: this.vehicleForm.value.vehicleCode,
            vehiclePlate: this.vehicleForm.value.vehiclePlateNumbers + "-" + this.vehicleForm.value.vehiclePlateLetters.replace(/\s/g, '') as any,
            vehicleCard: this.vehicleForm.value.vehicleCard,
            trailerPlate: this.vehicleForm.value.trailerPlateNumbers + "-" + this.vehicleForm.value.trailerPlateLetters.replace(/\s/g, '') as any,
            vehiclePhoneNumber: this.vehicleForm.value.vehiclePhoneNumber.replace(/\s/g, '')
        }
        this.genericService.updateEntity(environment.entities.Vehicle, vehicle).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}
