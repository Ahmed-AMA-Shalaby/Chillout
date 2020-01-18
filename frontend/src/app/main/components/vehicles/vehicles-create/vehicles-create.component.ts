import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { VehicleService } from 'app/main/services/vehicle.service';
import { Vehicle } from 'app/main/models/vehicle.model';

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
        private vehicleService: VehicleService
    ) { }

    ngOnInit() {
        this.vehicleForm = this._formBuilder.group({
            vehicleCode: ['', Validators.required],
            vehiclePlateNumbers: ['', Validators.required],
            vehiclePlateLetters: ['', Validators.required],
            vehicleCard: ['', Validators.required],
            trailerPlateNumbers: ['', Validators.required],
            trailerPlateLetters: ['', Validators.required],

        });
    }

    createVehicle() {
        const vehicle = <Vehicle>{
            vehicleCode: this.vehicleForm.value.vehicleCode.replace(/\s/g, ''),
            vehiclePlate: this.vehicleForm.value.vehiclePlateNumbers.replace(/\s/g, '') + "-" + this.vehicleForm.value.vehiclePlateLetters.replace(/\s/g, '') as any,
            vehicleCard: this.vehicleForm.value.vehicleCard.replace(/\s/g, ''),
            trailerPlate: this.vehicleForm.value.trailerPlateNumbers.replace(/\s/g, '') + "-" + this.vehicleForm.value.trailerPlateLetters.replace(/\s/g, '') as any
        }
        this.vehicleService.createVehicle(vehicle).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}
