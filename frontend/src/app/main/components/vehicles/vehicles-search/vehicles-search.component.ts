import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Vehicle } from 'app/main/models/vehicle.model';
import { VehicleService } from 'app/main/services/vehicle.service';

@Component({
    selector: 'vehicles-search',
    templateUrl: './vehicles-search.component.html',
    styleUrls: ['./vehicles-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class VehiclesSearchComponent implements OnInit {
    vehicles: Vehicle[]
    filterValue: string
    constructor(private vehicleService: VehicleService) { }

    ngOnInit() {
        this.vehicleService.retrieveVehicles().subscribe(
            data => {
                this.vehicles = data;
            }
        )
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }
}
