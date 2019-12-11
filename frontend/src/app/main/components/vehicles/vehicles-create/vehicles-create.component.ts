import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'vehicles-create',
  templateUrl: './vehicles-create.component.html',
  styleUrls: ['./vehicles-create.component.scss']
})
export class VehiclesCreateComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.vehicleForm = this._formBuilder.group({
      vehicleCode: ['', Validators.required],
      vehiclePlate: ['', Validators.required],
      vehicleCard: ['', Validators.required],
      trailerPlate: ['', Validators.required]
    });
  }

  createVehicle() {
    this.snackbar.open("Vehicle added", "Ok");
  }
}
