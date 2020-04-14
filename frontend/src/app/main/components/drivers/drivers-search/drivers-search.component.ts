import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Driver } from 'app/main/models/driver.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';

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
    administratorFlag: boolean = true;
    constructor(
        private genericService: GenericService,
        private storageService: AppStorageService
    ) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Driver).subscribe(data => {
            this.drivers = data;
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.drivers.length = 0;
        this.genericService.retrieveShownEntities(environment.entities.Driver).subscribe(
            data => {
                this.drivers = data;
            }
        )
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
