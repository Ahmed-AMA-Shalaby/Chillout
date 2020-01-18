import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Driver } from 'app/main/models/driver.model';
import { DriverService } from 'app/main/services/driver.service';

@Component({
    selector: 'drivers-search',
    templateUrl: './drivers-search.component.html',
    styleUrls: ['./drivers-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DriversSearchComponent implements OnInit {
    drivers: Driver[]
    filterValue: string
    editFlag: boolean = false;
    editColor: boolean = false;
    deleteFlag: boolean = false;
    deleteColor: boolean = false;
    constructor(private driverService: DriverService) { }

    ngOnInit() {
        this.driverService.retrieveDrivers().subscribe(
            data => {
                this.drivers = data;
            }
        )
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.editColor = !this.editColor;
    }

    toggleDelete() {
        this.deleteFlag = !this.deleteFlag;
        this.deleteColor = !this.deleteColor;
    }
}
