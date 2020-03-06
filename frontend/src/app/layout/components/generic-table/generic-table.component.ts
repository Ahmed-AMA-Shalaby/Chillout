import { Component, ViewChild, SimpleChanges, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { Agent } from 'app/main/models/agent.model';
import { Driver } from 'app/main/models/driver.model';
import { Sector } from 'app/main/models/sector.model';
import { Station } from 'app/main/models/station.model';
import { Product } from 'app/main/models/product.model';
import { User } from 'app/main/models/user.model';
import { Warehouse } from 'app/main/models/warehouse.model';
import { Distance } from 'app/main/models/distance.model';

@Component({
    selector: 'generic-table',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class GenericTableComponent implements OnChanges {

    @Input() data: [];
    @Input() cellLink: string;
    @Input() type: string;
    @Input() filterValue: string;
    @Input() editMode: string;
    @Input() hideMode: string;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private genericService: GenericService,
        private snackbar: MatSnackBar) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes.data) {
                this.data = changes.data.currentValue;
                this.dataSource = new MatTableDataSource(this.data);
            }
            if (changes.hideMode) {
                if (this.type == environment.entities.Agent) {
                    this.originalColumns = changes.hideMode.currentValue ? ['agentName', 'hidden'] : ['agentName']
                    this.displayedColumns = changes.hideMode.currentValue ? ['Agent Name', ' '] : ['Agent Name']
                    this.dataSource.filterPredicate = (data: Agent, filter: string) => !filter || data.agentName.startsWith(filter);
                }
                else if (this.type == environment.entities.Distance) {
                    this.originalColumns = changes.hideMode.currentValue ? ['distance', 'warehouse', 'station', 'hidden'] : ['distance', 'warehouse', 'station']
                    this.displayedColumns = changes.hideMode.currentValue ? ['Distance', 'Warehouse', 'Station', ' '] : ['Distance', 'Warehouse', 'Station']
                    this.dataSource.filterPredicate = (data: Distance, filter: string) => !filter || data.distance.toString().startsWith(filter);
                }
                else if (this.type == environment.entities.Driver) {
                    this.originalColumns = changes.hideMode.currentValue ? ['firstName', 'middleName', 'lastName', 'phoneNumber', 'hidden'] : ['firstName', 'middleName', 'lastName', 'phoneNumber']
                    this.displayedColumns = changes.hideMode.currentValue ? ['Driver First Name', 'Driver Middle Name', 'Driver Last Name', 'Driver Phone Number', ' '] : ['Driver First Name', 'Driver Middle Name', 'Driver Last Name', 'Driver Phone Number']
                    this.dataSource.filterPredicate = (data: Driver, filter: string) => !filter || data.firstName.startsWith(filter) || data.middleName.startsWith(filter) || data.lastName.startsWith(filter) || data.phoneNumber.startsWith(filter);
                }
                else if (this.type == environment.entities.Product) {
                    this.originalColumns = changes.hideMode.currentValue ? ['productName', 'hidden'] : ['productName']
                    this.displayedColumns = changes.hideMode.currentValue ? ['Product Name', ' '] : ['Product Name']
                    this.dataSource.filterPredicate = (data: Product, filter: string) => !filter || data.productName.startsWith(filter);
                }
                else if (this.type == environment.entities.Sector) {
                    this.originalColumns = changes.hideMode.currentValue ? ['sectorName', 'hidden'] : ['sectorName']
                    this.displayedColumns = changes.hideMode.currentValue ? ['Sector Name', ' '] : ['Sector Name']
                    this.dataSource.filterPredicate = (data: Sector, filter: string) => !filter || data.sectorName.startsWith(filter);
                }
                else if (this.type == environment.entities.Station) {
                    this.originalColumns = changes.hideMode.currentValue ? ['stationCode', 'stationName', 'hidden'] : ['stationCode', 'stationName']
                    this.displayedColumns = changes.hideMode.currentValue ? ['Station Code', 'Station Name', ' '] : ['Station Code', 'Station Name']
                    this.dataSource.filterPredicate = (data: Station, filter: string) => !filter || data.stationCode.toString().startsWith(filter) || data.stationName.startsWith(filter);
                }
                else if (this.type == environment.entities.User) {
                    this.originalColumns = changes.hideMode.currentValue ? ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role', 'hidden'] : ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role']
                    this.displayedColumns = changes.hideMode.currentValue ? ['User First Name', 'User Middle Name', 'User Last Name', 'User Phone Number', 'Role', ' '] : ['User First Name', 'User Middle Name', 'User Last Name', 'User Phone Number', 'Role']
                    this.dataSource.filterPredicate = (data: User, filter: string) => !filter || data.firstName.startsWith(filter) || data.middleName.startsWith(filter) || data.lastName.startsWith(filter) || data.phoneNumber.startsWith(filter) || data.phoneNumber.startsWith(filter);
                }
                else if (this.type == environment.entities.Warehouse) {
                    this.originalColumns = changes.hideMode.currentValue ? ['warehouseName', 'hidden'] : ['warehouseName']
                    this.displayedColumns = changes.hideMode.currentValue ? ['Warehouse Name', ' '] : ['Warehouse Name']
                    this.dataSource.filterPredicate = (data: Warehouse, filter: string) => !filter || data.warehouseName.startsWith(filter);
                }
                this.dataSource.paginator = this.paginator;
            }
        }
        this.dataSource.filter = this.filterValue;
    }

    modifyData(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.data.forEach(row => {
            if (row["id"] == rowID) {
                let modifiedRow = this.dataSource.filteredData[filteredRow];
                this.genericService.updateEntity(this.type, modifiedRow).subscribe(
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

    toggleVisibility(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.data.forEach(row => {
            if (row["id"] == rowID) {
                let modifiedRow = this.dataSource.filteredData[filteredRow];
                modifiedRow["hidden"] = !modifiedRow["hidden"];
                this.genericService.updateEntity(this.type, modifiedRow).subscribe(
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
