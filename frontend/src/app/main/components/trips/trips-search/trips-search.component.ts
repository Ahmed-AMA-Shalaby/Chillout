import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Trip } from 'app/main/models/trip.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
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

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private _formBuilder: FormBuilder,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.dateForm = this._formBuilder.group({
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();


        this.trips = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveTripsbyDate(this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            this.trips = data as Trip[];
            this.originalColumns = ['order', 'vehicle', 'outboundDistance', 'station', 'inboundDistance'];
            this.displayedColumns = ['Order', 'Vehicle', 'Outbound Warehouse', 'Farthest Station', 'Inbound Warehouse'];
            this.dataSource = new MatTableDataSource(this.trips);
            this.dataSource.filterPredicate = (data: Trip, filter: string) => {
                return data.vehicle.vehicleCode.toString().startsWith(filter)
            };
            this.dataSource.paginator = this.paginator;
        })


    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue;
    }

    retrieveCurrentTrips() {
        this.genericService.retrieveTripsbyDate(this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            this.trips = data as Trip[];
        })
    }

}
