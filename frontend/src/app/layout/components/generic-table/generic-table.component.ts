import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Vehicle } from 'app/main/models/vehicle.model';
import { GenericService } from 'app/main/services/generic.service';

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

export class GenericTableComponent implements OnInit, OnChanges {

    @Input() data: [];
    @Input() cellLink: string;
    @Input() type: string;
    @Input() filterValue: string;
    @Input() editMode: string;
    @Input() deleteMode: string;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private genericService: GenericService) { }

    ngOnInit(): void {
        if (this.type === "Driver") {
            this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber'];
            this.displayedColumns = ['Driver First Name', 'Driver Middle Name', 'Driver Last Name', 'Driver Phone Number'];
        }
        this.dataSource.paginator = this.paginator;
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

    modifyData(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.data.forEach(row => {
            if (row["id"] == rowID) {
                this.genericService.updateEntity(this.type, this.dataSource.filteredData[filteredRow]).subscribe();
            }
        })
    }
}
