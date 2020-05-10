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
    warehouses: Warehouse[];
    stations: Station[];
    distanceForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.distanceForm = this._formBuilder.group({
            distance: [null, Validators.required],
            warehouse: [null, Validators.required],
            station: [null, Validators.required]
        });
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(warehouses => {
            this.warehouses = warehouses;
            this.warehouses.sort((a, b) => {
                if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                    return 1;
                }
                else if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                    return 0;
                }
                else {
                    return -1
                }
            });
        })
        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(stations => {
            this.stations = stations;
            this.stations.sort((a, b) => {
                if (a.stationName > b.stationName) {
                    return 1;
                }
                else if (a.stationName == b.stationName) {
                    return 0;
                }
                else {
                    return -1
                }
            });
        })
    }

    createDistance() {
        const distance = <Distance>{
            distance: this.distanceForm.value.distance,
            warehouse: this.distanceForm.value.warehouse,
            station: this.distanceForm.value.station,
        }

        this.genericService.retrieveAllEntities(environment.entities.Distance).subscribe(distances => {
            let distanceExists = false;
            for (let distanceIndex = 0; distanceIndex < distances.length; distanceIndex++) {
                if ((distances as Distance[])[distanceIndex].warehouse.id === distance.warehouse.id && (distances as Distance[])[distanceIndex].station.id === distance.station.id) {
                    distanceExists = true;
                    this.snackbar.open("Distance failed to update", "Ok");
                    return;
                }
            }
            if (!distanceExists) {
                this.genericService.updateEntity(environment.entities.Distance, distance).subscribe(
                    data => {
                        this.snackbar.open(data.message, "Ok");
                    },
                    error => {
                        this.snackbar.open(error.message, "Ok");
                    }
                )
            }
        })
    }
}