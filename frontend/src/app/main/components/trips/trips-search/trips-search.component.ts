import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Trip } from 'app/main/models/trip.model';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';
import { MatTableExporterDirective } from 'mat-table-exporter';
const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'trips-search',
    templateUrl: './trips-search.component.html',
    styleUrls: ['./trips-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class TripsSearchComponent implements OnInit {
    date = new FormControl(moment());
    dateForm: FormGroup;
    trips: Trip[] = [];
    deleteFlag: boolean = false;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    administratorFlag: boolean = true;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild('exporter')
    exporter: MatTableExporterDirective

    constructor(
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private snackbar: MatSnackBar,
        private storageService: AppStorageService,
        private cdr: ChangeDetectorRef
        ) { }

    ngOnInit() {
        this.dateForm = this._formBuilder.group({
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();
        
        this.retrieveCurrentTrips();
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue;
    }

    toggleDelete() {
        this.deleteFlag = !this.deleteFlag;
        this.trips.length = 0;
        if (this.deleteFlag) {
            this.genericService.retrieveEntitiesbyDate(environment.entities.Trip, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
                (data as Trip[]).forEach(trip => {
                    this.trips.push(trip as never)
                })
                this.originalColumns = ['order', 'vehicle', 'outboundDistance', 'details', 'inboundDistance', 'distance', 'delete'];
                this.displayedColumns = ['Order', 'Vehicle', 'Outbound Warehouse', 'Details', 'Inbound Warehouse', 'Total Distance', ' '];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            })
        }
        else {
            this.genericService.retrieveEntitiesbyDate(environment.entities.Trip, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
                (data as Trip[]).forEach(trip => {
                    this.trips.push(trip as never)
                })
                this.originalColumns = ['order', 'vehicle', 'outboundDistance', 'details', 'inboundDistance', 'distance'];
                this.displayedColumns = ['Order', 'Vehicle', 'Outbound Warehouse', 'Details', 'Inbound Warehouse', 'Total Distance'];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            })
        }
    }

    deleteTrip(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.trips.forEach((row, index) => {
            if (row["id"] == rowID) {
                let deletedTrip = this.trips.splice(index, 1)[0] as Trip
                this.genericService.deleteEntity(environment.entities.Trip, rowID).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                    },
                    error => {
                        this.snackbar.open(error.message);
                    }
                );
                this.trips.map(trip => {
                    if (trip.vehicle.vehicleCode === deletedTrip.vehicle.vehicleCode && trip.order > deletedTrip.order) {
                        return trip.order -= 1;
                    }
                })
                this.trips.forEach(trip => {
                    this.genericService.updateEntity(environment.entities.Trip, trip).subscribe(
                        data => {
                            this.snackbar.open(data.message);
                        },
                        error => {
                            this.snackbar.open(error.message);
                        }
                    );
                })
                this.dataSource = new MatTableDataSource(this.trips);
            }
        })
    }

    retrieveCurrentTrips() {
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveEntitiesbyDate(environment.entities.Trip, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            this.trips = data as Trip[];
            this.originalColumns = ['order', 'vehicle', 'outboundDistance', 'details', 'inboundDistance', 'distance'];
            this.displayedColumns = ['Order', 'Vehicle', 'Outbound Warehouse', 'Details', 'Inbound Warehouse', 'Total Distance'];
            this.dataSource = new MatTableDataSource(this.trips);
            this.cdr.detectChanges();
            this.dataSource.filterPredicate = (data: Trip, filter: string) => {
                return data.vehicle.vehicleCode.toString().startsWith(filter)
            };
            this.dataSource.paginator = this.paginator;
        })
    }

    exportTable() {
        if (this.dataSource.filter) {
            this.exporter.exportTable('xlsx', { fileName: `Trips-${this.date.value.date()}_${this.date.value.month() + 1}_${this.date.value.year()}(${this.dataSource.filter})` })
        }
        else {
            this.exporter.exportTable('xlsx', { fileName: `Trips-${this.date.value.date()}_${this.date.value.month() + 1}_${this.date.value.year()}` })
        }
    }

}
