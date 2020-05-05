import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Sale } from 'app/main/models/sale.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Station } from 'app/main/models/station.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'app/main/models/product.model';
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
    selector: 'sales-report',
    templateUrl: './sales-report.component.html',
    styleUrls: ['./sales-report.component.scss'],
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

export class SalesReportComponent implements OnInit {
    startdate = new FormControl(moment());
    enddate = new FormControl(moment());
    sales: Sale[] = [];
    stations: Station[];
    products: Product[];

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    startdateForm: FormGroup;
    enddateForm: FormGroup;

    minEndDate: _moment.Moment
    maxEndDate: _moment.Moment

    aggregate: (string | number)[] = [];
    aggregateFlag: boolean = false;

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
        this.stations = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(stations => {
            this.stations = stations;
            this.originalColumns = ['station'];
            this.displayedColumns = ['المحطه'];
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                this.products = products;
                this.products.forEach(product => {
                    if (product.productName !== "إجمالى المبالغ الإضافيه") {
                        this.displayedColumns.push(product.productName);
                    }
                })
                this.displayedColumns.sort();
            })
            this.retrieveCurrentSales();
            this.dataSource = new MatTableDataSource(this.stations);
            this.cdr.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
    }

    adjustSalesDisplay(rowIndex: number, columnIndex: number) {
        let salesAccumulator = { isUpdated: false, value: 0 };
        for (let salesIndex = 0; salesIndex < this.sales.length; salesIndex++) {
            if (this.sales[salesIndex].station.stationName === this.stations[rowIndex].stationName && this.sales[salesIndex].product.productName === this.displayedColumns[columnIndex]) {
                salesAccumulator.value += this.sales[salesIndex].saleAmount;
                salesAccumulator.isUpdated = true;
            }
        }
        if (salesAccumulator.isUpdated) {
            if (!this.aggregateFlag) {
                return salesAccumulator.value;
            }
            else {
                return (salesAccumulator.value / (this.enddate.value.date() - this.startdate.value.date() + 1)).toFixed(0);
            }
        }
        else {
            return "";
        }
    }

    checkProductInStation(rowIndex: number, columnIndex: number) {
        for (let tankIndex = 0; tankIndex < (this.stations[rowIndex] as Station).tanks.length; tankIndex++) {
            if ((this.stations[rowIndex] as Station).tanks[tankIndex].product.productName === this.displayedColumns[columnIndex]) {
                return true;
            }
        }
        return false;
    }

    updateEndDatePicker() {
        this.enddate.setValue(this.startdate.value)
        this.retrieveCurrentSales()
    }

    retrieveCurrentSales() {
        this.minEndDate = moment(`${this.startdate.value.year()}-${this.startdate.value.month() + 1}-${this.startdate.value.date()}`, "YYYY-MM-DD")
        this.maxEndDate = moment(`${this.startdate.value.year()}-${this.startdate.value.month() + 1}-${this.startdate.value.daysInMonth()}`, "YYYY-MM-DD")
        this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Sale, this.enddate.value.year(), this.enddate.value.month() + 1).subscribe(data => {
            this.sales = (data as Sale[]).filter(sale => {
                return moment(`${sale.year}-${sale.month}-${sale.day}`, "YYYY-MM-DD").isBetween(
                    moment(`${this.startdate.value.year()}-${this.startdate.value.month() + 1}-${this.startdate.value.date()}`, "YYYY-MM-DD"),
                    moment(`${this.enddate.value.year()}-${this.enddate.value.month() + 1}-${this.enddate.value.date()}`, "YYYY-MM-DD"),
                    null, "[]")
            })
            this.calculateTotal();
        })
    }

    toggleAggregate() {
        this.aggregateFlag = !this.aggregateFlag;
        this.calculateTotal();
    }

    calculateTotal() {
        this.aggregate = [];
        if (!this.aggregateFlag) {
            this.aggregate.push('الإجمالى')
        }
        else {
            this.aggregate.push('المتوسط')
        }
        for (let columnIndex = 1; columnIndex < this.displayedColumns.length; columnIndex++) {
            let salesAccumulator = { isUpdated: false, value: 0 };
            for (let salesIndex = 0; salesIndex < this.sales.length; salesIndex++) {
                if (this.sales[salesIndex].product.productName === this.displayedColumns[columnIndex]) {
                    salesAccumulator.value += this.sales[salesIndex].saleAmount;
                    salesAccumulator.isUpdated = true;
                }
            }
            if (salesAccumulator.isUpdated) {
                if (!this.aggregateFlag) {
                    this.aggregate.push(salesAccumulator.value);
                }
                else {
                    this.aggregate.push((salesAccumulator.value / (this.enddate.value.date() - this.startdate.value.date() + 1)).toFixed(0));
                }
            }
            else {
                this.aggregate.push(0);
            }
        }
    }

    exportTable() {
        this.exporter.exportTable('xlsx', { fileName: `المبيعات-${this.startdate.value.date()}_${this.startdate.value.month() + 1}_${this.startdate.value.year()}-${this.enddate.value.date()}_${this.enddate.value.month() + 1}_${this.enddate.value.year()}` })
    }
}
