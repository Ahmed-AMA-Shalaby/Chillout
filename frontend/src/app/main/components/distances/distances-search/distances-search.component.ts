import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Distance } from 'app/main/models/distance.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Warehouse } from 'app/main/models/warehouse.model';
import { Station } from 'app/main/models/station.model';
import { AppStorageService } from 'app/main/services/app-storage.service';

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

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    administratorFlag: boolean = true;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private genericService: GenericService,
        private snackbar: MatSnackBar,
        private storageService: AppStorageService,
        private cdr: ChangeDetectorRef,
        private paginatorLabel: MatPaginatorIntl,
    ) { }

    ngOnInit() {
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveAllEntities(environment.entities.Distance).subscribe(data => {
            this.distances = data;
            (this.distances as Distance[]).sort((a, b) => a.distance - b.distance);
            this.originalColumns = ['distance', 'warehouse', 'station'];
            this.displayedColumns = ['المسافه', 'الشركه - المستودع', 'المحطه'];
            this.dataSource = new MatTableDataSource(this.distances);
            this.cdr.detectChanges();
            this.dataSource.filterPredicate = (data: Distance, filter: string) => {
                return data.warehouse.companyName.startsWith(filter) ||data.warehouse.warehouseName.startsWith(filter) || data.station.stationName.startsWith(filter)
            };
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
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
        this.genericService.retrieveAllEntities(environment.entities.Distance).subscribe(data => {
            data.forEach(distance => {
                this.distances.push(distance)
            });
            (this.distances as Distance[]).sort((a, b) => a.distance - b.distance);
            this.originalColumns = ['distance', 'warehouse', 'station'];
            this.displayedColumns = ['المسافه', 'الشركه - المستودع', 'المحطه'];
            this.cdr.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
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
}
