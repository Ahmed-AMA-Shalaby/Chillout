import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Station } from 'app/main/models/station.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';

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
    administratorFlag: boolean = true;
    constructor(
        private genericService: GenericService,
        private storageService: AppStorageService
        ) { }

    ngOnInit() {
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
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.stations.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Station).subscribe(data => {
                this.stations = data;
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
        else {
            this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(data => {
                this.stations = data;
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
    }
}
