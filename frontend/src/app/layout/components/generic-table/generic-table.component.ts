import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Vehicle } from 'app/main/models/vehicle.model';
import { GenericService } from 'app/main/services/generic.service';

@Component({
    selector: 'generic-table',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class GenericTableComponent implements OnInit, OnChanges {

    @Input() data: [];
    @Input() cellLink: String;
    @Input() type: String;
    @Input() filterValue: string;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private genericService: GenericService) { }

    ngOnInit(): void {
        if (this.type === 'Vehicle') {
            this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate'];
            this.displayedColumns = ['Vehicle Code', 'Vehicle Plate', 'Vehicle Card', 'Trailer Plate'];
            this.dataSource.filterPredicate = (data: Vehicle, filter: string) => {
                return data.vehicleCode.startsWith(filter)
            };

        }
        else if (this.type === "Driver") {
            this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber'];
            this.displayedColumns = ['Driver First Name', 'Driver Middle Name', 'Driver Last Name', 'Driver Phone Number'];
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            if (changes.data) {
                this.data = changes.data.currentValue;
                this.dataSource = new MatTableDataSource(this.data);
            }
        }
        this.dataSource.filter = this.filterValue;
    }

    modifyData(filteredRow, column) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        // console.log("modifiedRowID: " +  rowID);
        // console.log("modifiedColumnName: " +  column);
        // console.log("modifiedDataValue: " +  this.dataSource.filteredData[filteredRow][column]);
        // this.modifiedRow.emit({ id: rowID, key: column, value:this.dataSource.filteredData[filteredRow][column]})
        this.data.forEach(row => {
            if (row["id"] == rowID) {
                console.log(this.type, this.dataSource.filteredData[filteredRow]);
                
                this.genericService.updateEntity(this.dataSource.filteredData[filteredRow])
            }
        })
    }
}
