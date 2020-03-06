import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Distance } from 'app/main/models/distance.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { Station } from 'app/main/models/station.model';
import { Warehouse } from 'app/main/models/warehouse.model';

@Component({
    selector: 'distances-create',
    templateUrl: './distances-create.component.html',
    styleUrls: ['./distances-create.component.scss']
})
export class DistancesCreateComponent implements OnInit {
    stations: Station[];
    warehouses: Warehouse[];
    distanceForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.distanceForm = this._formBuilder.group({
            distance: ['', Validators.required],
            warehouse: ['', Validators.required],
            station: ['', Validators.required]
        });
        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(stations => {
            this.stations = stations;
        })
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(warehouses => {
            this.warehouses = warehouses;
        })
    }

    createDistance() {
        const distance = <Distance>{
            distance: this.distanceForm.value.distance,
            warehouse: this.distanceForm.value.warehouse,
            station: this.distanceForm.value.station,
        }
        
        this.genericService.updateEntity(environment.entities.Distance, distance).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}