import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Station } from 'app/main/models/station.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'stations-search',
    templateUrl: './stations-search.component.html',
    styleUrls: ['./stations-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class StationsSearchComponent implements OnInit {
    stations: Station[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    constructor(private genericService: GenericService) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(
            data => {
                this.stations = data;
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
        this.stations.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Station).subscribe(data => {
                this.stations = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(data => {
                this.stations = data;
            })
        }
    }
}
