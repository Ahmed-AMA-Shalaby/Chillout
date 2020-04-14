import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Sector } from 'app/main/models/sector.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';

@Component({
    selector: 'sectors-search',
    templateUrl: './sectors-search.component.html',
    styleUrls: ['./sectors-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class SectorsSearchComponent implements OnInit {
    sectors: Sector[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    administratorFlag: boolean = true;
    constructor(
        private genericService: GenericService,
        private storageService: AppStorageService
        ) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Sector).subscribe(data => {
            this.sectors = data;
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.sectors.length = 0;
        this.genericService.retrieveShownEntities(environment.entities.Sector).subscribe(
            data => {
                this.sectors = data;
            }
        )
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.sectors.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Sector).subscribe(data => {
                this.sectors = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Sector).subscribe(data => {
                this.sectors = data;
            })
        }
    }
}
