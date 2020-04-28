import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Warehouse } from 'app/main/models/warehouse.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'app/main/models/product.model';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { Trip } from 'app/main/models/trip.model';
import { Quota } from 'app/main/models/quota.model';
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
    selector: 'remainings-report',
    templateUrl: './remainings-report.component.html',
    styleUrls: ['./remainings-report.component.scss'],
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

export class RemainingsReportComponent implements OnInit {
    startdate = new FormControl(moment());
    enddate = new FormControl(moment());
    trips: Trip[] = [];
    warehouses: Warehouse[];
    products: Product[];
    quotas: Quota[];

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    startdateForm: FormGroup;
    enddateForm: FormGroup;

    minEndDate: _moment.Moment
    maxEndDate: _moment.Moment

    total: (string | number)[] = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild('exporter')
    exporter: MatTableExporterDirective

    constructor(
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private snackbar: MatSnackBar,
        private cdr: ChangeDetectorRef,
        private paginatorLabel: MatPaginatorIntl,
    ) { }

    ngOnInit() {
        this.startdateForm = this._formBuilder.group({
            startdate: [null, Validators.required]
        });
        this.startdateForm.get('startdate').disable();
        this.enddateForm = this._formBuilder.group({
            enddate: [null, Validators.required]
        });
        this.enddateForm.get('enddate').disable();
        this.warehouses = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(warehouses => {
            this.warehouses = warehouses;
            this.originalColumns = ['warehouse'];
            this.displayedColumns = ['الشركه - المستودع'];
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                this.products = products;
                this.products.forEach(product => {
                    if (product.productName !== "إجمالى المبالغ الإضافيه") {
                        this.displayedColumns.push(product.productName);
                    }
                })
                this.displayedColumns.sort();
            })
            this.retrieveCurrentTrips();
            this.dataSource = new MatTableDataSource(this.warehouses);
            this.cdr.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
    }

    adjustRemainingsDisplay(rowIndex: number, columnIndex: number) {
        let remainingsAccumulator = { isUpdated: false, value: 0 };
        for (let tripsIndex = 0; tripsIndex < this.trips.length; tripsIndex++) {
            for (let transferIndex = 0; transferIndex < this.trips[tripsIndex].transfers.length; transferIndex++) {
                if (this.trips[tripsIndex].outboundDistance.warehouse.companyName === this.warehouses[rowIndex].companyName && this.trips[tripsIndex].outboundDistance.warehouse.warehouseName === this.warehouses[rowIndex].warehouseName && this.trips[tripsIndex].transfers[transferIndex].product.productName === this.displayedColumns[columnIndex]) {
                    remainingsAccumulator.value += this.trips[tripsIndex].transfers[transferIndex].transferredAmount;
                    remainingsAccumulator.isUpdated = true;
                }

            }
        }
        if (remainingsAccumulator.isUpdated) {
            for (let quotaIndex = 0; quotaIndex < this.quotas.length; quotaIndex++) {
                if (this.quotas[quotaIndex].warehouse.companyName === this.warehouses[rowIndex].companyName && this.quotas[quotaIndex].warehouse.warehouseName === this.warehouses[rowIndex].warehouseName && this.quotas[quotaIndex].product.productName === this.displayedColumns[columnIndex]) {
                    return this.quotas[quotaIndex].quotaAmount - remainingsAccumulator.value;
                }

            }
        }
        else {
            return "";
        }
    }

    checkProductInRemaining(rowIndex: number, columnIndex: number) {
        for (let productIndex = 0; productIndex < (this.warehouses[rowIndex] as Warehouse).products.length; productIndex++) {
            if ((this.warehouses[rowIndex] as Warehouse).products[productIndex].productName === this.displayedColumns[columnIndex]) {
                return true;
            }
        }
        return false;
    }

    updateEndDatePicker() {
        this.enddate.setValue(this.startdate.value)
        this.retrieveCurrentTrips()
    }

    retrieveCurrentTrips() {
        this.minEndDate = moment(`${this.startdate.value.year()}-${this.startdate.value.month() + 1}-${this.startdate.value.date()}`, "YYYY-MM-DD")
        this.maxEndDate = moment(`${this.startdate.value.year()}-${this.startdate.value.month() + 1}-${this.startdate.value.daysInMonth()}`, "YYYY-MM-DD")
        this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Quota, this.startdate.value.year(), this.startdate.value.month() + 1).subscribe(data => {
            this.quotas = data as Quota[];
            this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Trip, this.enddate.value.year(), this.enddate.value.month() + 1).subscribe(data => {
                this.trips = (data as Trip[]).filter(trip => {
                    return moment(`${trip.year}-${trip.month}-${trip.day}`, "YYYY-MM-DD").isBetween(
                        moment(`${this.startdate.value.year()}-${this.startdate.value.month() + 1}-${this.startdate.value.date()}`, "YYYY-MM-DD"),
                        moment(`${this.enddate.value.year()}-${this.enddate.value.month() + 1}-${this.enddate.value.date()}`, "YYYY-MM-DD"),
                        null, "[]")
                })
                this.calculateTotal();
            })
        })
    }

    calculateTotal() {
        this.total = [];
        this.total.push('الإجمالى')
        for (let columnIndex = 1; columnIndex < this.displayedColumns.length; columnIndex++) {
            let remainingsAccumulator = { isUpdated: false, value: 0 };
            for (let tripsIndex = 0; tripsIndex < this.trips.length; tripsIndex++) {
                for (let transferIndex = 0; transferIndex < this.trips[tripsIndex].transfers.length; transferIndex++) {
                    if (this.trips[tripsIndex].transfers[transferIndex].product.productName === this.displayedColumns[columnIndex]) {
                        remainingsAccumulator.value += this.trips[tripsIndex].transfers[transferIndex].transferredAmount;
                        remainingsAccumulator.isUpdated = true;
                    }

                }
            }
            if (remainingsAccumulator.isUpdated) {
                let quotaAccumulator = 0;
                for (let quotaIndex = 0; quotaIndex < this.quotas.length; quotaIndex++) {
                    if (this.quotas[quotaIndex].product.productName === this.displayedColumns[columnIndex]) {
                        quotaAccumulator += this.quotas[quotaIndex].quotaAmount
                    }
                }
                this.total.push(quotaAccumulator - remainingsAccumulator.value);
            }
        }
    }

    exportTable() {
        this.exporter.exportTable('xlsx', { fileName: `المتبقيات-${this.startdate.value.date()}_${this.startdate.value.month() + 1}_${this.startdate.value.year()}-${this.enddate.value.date()}_${this.enddate.value.month() + 1}_${this.enddate.value.year()}` })
    }
}
