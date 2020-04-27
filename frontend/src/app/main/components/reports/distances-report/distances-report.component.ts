import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatDatepicker } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { Trip } from 'app/main/models/trip.model';
const moment = _moment;


export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'distances-report',
    templateUrl: './distances-report.component.html',
    styleUrls: ['./distances-report.component.scss'],
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

export class DistancesReportComponent implements OnInit {
    date = new FormControl(moment());
    trips: Trip[] = [];
    days: number[] = [];
    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    dateForm: FormGroup;

    total: (string | number)[] = [];

    @ViewChild('exporter')
    exporter: MatTableExporterDirective

    constructor(
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.dateForm = this._formBuilder.group({
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();
        this.dataSource = new MatTableDataSource([]);
        this.retrieveCurrentTrips();
    }

    adjustDataDisplay(rowIndex: number, columnIndex: number) {
        let tripsAccumulator = { isUpdated: false, value: 0 };
        for (let tripsIndex = 0; tripsIndex < this.trips.length; tripsIndex++) {
            if (this.trips[tripsIndex].day === this.days[rowIndex]) {
                if (this.displayedColumns[columnIndex] === 'إجمالى المسافه') {
                    tripsAccumulator.value += (this.trips[tripsIndex].inboundDistance.distance + this.trips[tripsIndex].outboundDistance.distance);
                    tripsAccumulator.isUpdated = true;
                }
                else if (this.displayedColumns[columnIndex] === 'عدد الرحلات') {
                    tripsAccumulator.value += 1;
                    tripsAccumulator.isUpdated = true;
                }
            }
        }
        if (tripsAccumulator.isUpdated) {
            return tripsAccumulator.value;
        }
        else {
            return "";
        }
    }

    retrieveCurrentTrips() {
        this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Trip, this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
            this.trips = (data as Trip[]).filter(trip => {
                return trip.year == this.date.value.year() && trip.month == this.date.value.month() + 1;
            })
            this.calculateTotal();
            this.originalColumns = ['day', 'distances', 'trips'];
            this.displayedColumns = ['اليوم', 'إجمالى المسافه', 'عدد الرحلات'];
            this.days = new Array<number>(this.date.value.daysInMonth())
            console.log(this.days);

            for (let index = 0; index < this.days.length; index++) {
                this.days[index] = index + 1;
            }
            this.dataSource = new MatTableDataSource(this.days);
        })
    }

    calculateTotal() {
        this.total = [];
        this.total.push('الإجمالى');
        if (this.trips.length != 0) {
            this.total.push(this.trips.map(trip => trip.inboundDistance.distance + trip.outboundDistance.distance).reduce((accumulator, currentValue) => accumulator + currentValue))
            this.total.push(this.trips.length);
        }
    }

    chosenYearHandler(normalizedYear: _moment.Moment) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.month(normalizedMonth.month());
        this.date.setValue(ctrlValue);
        datepicker.close();
        this.retrieveCurrentTrips();
    }

    exportTable() {
        this.exporter.exportTable('xlsx', { fileName: `المسافات-${this.date.value.date()}_${this.date.value.month() + 1}` })
    }
}
