import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Distance } from 'app/main/models/distance.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { Warehouse } from 'app/main/models/warehouse.model';
import { Station } from 'app/main/models/station.model';

@Component({
    selector: 'distances-search',
    templateUrl: './distances-search.component.html',
    styleUrls: ['./distances-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DistancesSearchComponent implements OnInit {
    distances: Distance[] = [];
    warehouses: Warehouse[];
    stations: Station[];
    editFlag: boolean = false;
    hideFlag: boolean = false;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private genericService: GenericService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.distances = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveShownEntities(environment.entities.Distance).subscribe(data => {
            this.distances = data;
            this.originalColumns = ['distance', 'warehouse', 'station'];
            this.displayedColumns = ['Distance', 'Warehouse', 'Station'];
            this.dataSource = new MatTableDataSource(this.distances);
            this.dataSource.filterPredicate = (data: Distance, filter: string) => {
                return data.distance.toString().startsWith(filter)
            };
            this.dataSource.paginator = this.paginator;
        })
    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue;
    }

    toggleEdit() {
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(data => {
            this.warehouses = data;
        })
        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(data => {
            this.stations = data;
        })
        this.editFlag = !this.editFlag;
        this.distances.length = 0;
        this.genericService.retrieveShownEntities(environment.entities.Distance).subscribe(data => {
            data.forEach(distance => {
                this.distances.push(distance)
            })
            this.originalColumns = ['distance', 'warehouse', 'station'];
            this.displayedColumns = ['Distance', 'Warehouse', 'Station'];
            this.dataSource.paginator = this.paginator;
        })
    }

    modifyData(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.distances.forEach(row => {
            if (row["id"] == rowID) {
                let modifiedRow = this.dataSource.filteredData[filteredRow];
                this.genericService.updateEntity(environment.entities.Distance, modifiedRow).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                    },
                    error => {
                        this.snackbar.open(error.message);
                    }
                );
            }
        })
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.distances.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Distance).subscribe(data => {
                data.forEach(distance => {
                    this.distances.push(distance)
                })
                this.originalColumns = ['distance', 'warehouse', 'station', 'hidden'];
                this.displayedColumns = ['Distance', 'Warehouse', 'Station', ' '];
                this.dataSource.paginator = this.paginator;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Distance).subscribe(data => {
                data.forEach(distance => {
                    this.distances.push(distance)
                })
                this.originalColumns = ['distance', 'warehouse', 'station'];
                this.displayedColumns = ['Distance', 'Warehouse', 'Station'];
                this.dataSource.paginator = this.paginator;
            })
        }
    }

    toggleDistanceVisibility(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.distances.forEach((row, index) => {
            if (row["id"] == rowID) {
                let modifiedRow = this.dataSource.filteredData[filteredRow];
                this.distances[index]["hidden"] = !this.distances[index]["hidden"]
                this.genericService.updateEntity(environment.entities.Distance, modifiedRow).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                    },
                    error => {
                        this.snackbar.open(error.message);
                    }
                );
            }
        })
    }
}
