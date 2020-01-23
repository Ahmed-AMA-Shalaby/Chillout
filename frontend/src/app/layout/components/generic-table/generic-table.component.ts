import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

interface CustomVehicle {
    id: string;
    vehicleCode: string;
    vehiclePlateNumbers: string;
    vehiclePlateLetters: string;
    vehicleCard: string;
    trailerPlateNumbers: string;
    trailerPlateLetters: string;
    hidden?: boolean;
}

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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            if (changes.data) {
                this.data = changes.data.currentValue;
                this.dataSource = new MatTableDataSource(this.data);
            }
            if (changes.hideMode) {
                if (this.type == environment.entities.Driver) {
                    if (changes.hideMode.currentValue) {
                        this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber', 'hidden'];
                        this.displayedColumns = ['Driver First Name', 'Driver Middle Name', 'Driver Last Name', 'Driver Phone Number', ' '];
                    }
                    else {
                        this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber'];
                        this.displayedColumns = ['Driver First Name', 'Driver Middle Name', 'Driver Last Name', 'Driver Phone Number'];
                    }
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
        this.data.forEach((row, index) => {
            if (row["id"] == rowID) {
                let modifiedRow = JSON.parse(JSON.stringify(this.dataSource.filteredData[filteredRow]).replace("\"hidden\":", "\"isHidden\":"));
                delete modifiedRow["hidden"];
                modifiedRow["isHidden"] = !modifiedRow["isHidden"];
                this.data[index]["hidden"] = !this.data[index]["hidden"] as never;
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
