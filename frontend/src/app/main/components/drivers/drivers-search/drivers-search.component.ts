import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Driver } from 'app/main/models/driver.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'drivers-search',
    templateUrl: './drivers-search.component.html',
    styleUrls: ['./drivers-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DriversSearchComponent implements OnInit {
    drivers: Driver[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    constructor(private genericService: GenericService) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Driver).subscribe(
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
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.drivers.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Driver).subscribe(data => {
                this.drivers = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Driver).subscribe(data => {
                this.drivers = data;
            })
        }
    }
}
