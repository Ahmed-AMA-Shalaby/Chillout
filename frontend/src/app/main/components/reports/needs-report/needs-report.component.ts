import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Existing } from 'app/main/models/existing.model';
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
    selector: 'needs-report',
    templateUrl: './needs-report.component.html',
    styleUrls: ['./needs-report.component.scss'],
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

export class NeedsReportComponent implements OnInit {
    date = new FormControl(moment());
    existings: Existing[] = [];
    stations: Station[];
    products: Product[];
    editFlag: boolean = false;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    dateForm: FormGroup;

    tanksAndNeeds: number[]

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
        this.dateForm = this._formBuilder.group({
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();
        this.stations = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(stations => {
            this.stations = stations;
            this.stations.sort((a, b) => {
                if (a.stationName > b.stationName) {
                    return 1;
                }
                else if (a.stationName == b.stationName) {
                    return 0;
                }
                else {
                    return -1
                }
            });
            this.originalColumns = ['station'];
            this.displayedColumns = ['Station'];
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                this.products = products;
                this.products.forEach(product => {
                    if (product.productName !== "إجمالى المبالغ الإضافيه") {
                        this.displayedColumns.push(product.productName);
                    }
                })
                this.displayedColumns.sort();
            })
            this.genericService.retrieveEntitiesbyDate(environment.entities.Existing, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
                this.existings = data as Existing[];
            })
            this.dataSource = new MatTableDataSource(this.stations);
            this.cdr.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.existings.length = 0;
        this.retrieveCurrentNeeds();
        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(stations => {
            this.stations = stations;
            this.originalColumns = ['station'];
            this.displayedColumns = ['Station'];
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                this.products = products;
                this.products.forEach(product => {
                    if (product.productName !== "إجمالى المبالغ الإضافيه") {
                        this.displayedColumns.push(product.productName);
                    }
                })
                this.displayedColumns.sort();
            })
            this.dataSource = new MatTableDataSource(this.stations);
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
    }

    modifyData(filteredRow, filteredColumn, modifiedAmount) {
        let modifiedRow = filteredRow as Station;
        let modifiedColumn: Product;
        this.products.forEach(product => {
            if (product.productName === filteredColumn) {
                modifiedColumn = product;
            }
        })

        this.genericService.retrieveEntitiesbyDate(environment.entities.Existing, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            this.existings = data as Existing[];
            let existingFound = false;
            this.existings.forEach(existing => {
                if (existing.station.stationName === modifiedRow.stationName && existing.product.productName === modifiedColumn.productName) {
                    existingFound = true;
                    existing.existingAmount = modifiedAmount;
                    this.genericService.updateEntity(environment.entities.Existing, existing).subscribe(
                        data => {
                            this.snackbar.open(data.message);
                            return;
                        },
                        error => {
                            this.snackbar.open(error.message);
                            return;
                        }
                    );
                }
            })

            if (!existingFound) {
                let existing = <Existing>{
                    year: this.date.value.year(),
                    month: this.date.value.month() + 1,
                    day: this.date.value.date(),
                    station: modifiedRow,
                    product: modifiedColumn,
                    existingAmount: modifiedAmount
                }

                this.genericService.updateEntity(environment.entities.Existing, existing).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                        return;
                    },
                    error => {
                        this.snackbar.open(error.message);
                        return;
                    }
                );
            }
        })

    }

    adjustNeedsDisplay(rowIndex: number, columnIndex: number) {
        this.tanksAndNeeds = [];
        for (let existingsIndex = 0; existingsIndex < this.existings.length; existingsIndex++) {
            if (this.existings[existingsIndex].station.stationName === this.stations[rowIndex].stationName && this.existings[existingsIndex].product.productName === this.displayedColumns[columnIndex]) {
                for (let tankIndex = 0; tankIndex < this.stations[rowIndex].tanks.length; tankIndex++) {
                    if (this.stations[rowIndex].tanks[tankIndex].product.productName === this.displayedColumns[columnIndex]) {
                        this.tanksAndNeeds.push(this.stations[rowIndex].tanks[tankIndex].tankVolume);
                        this.tanksAndNeeds.push(this.stations[rowIndex].tanks[tankIndex].tankVolume - this.existings[existingsIndex].existingAmount);
                        return true;
                    }
                }
            }
        }
        return "";
    }

    checkProductInStation(rowIndex: number, columnIndex: number) {
        for (let tankIndex = 0; tankIndex < (this.stations[rowIndex] as Station).tanks.length; tankIndex++) {
            if ((this.stations[rowIndex] as Station).tanks[tankIndex].product.productName === this.displayedColumns[columnIndex]) {
                return true;
            }
        }
        return false;
    }

    retrieveCurrentNeeds() {
        this.genericService.retrieveEntitiesbyDate(environment.entities.Existing, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            this.existings = data as Existing[];
        })
    }

    checkTankLimit(filteredRow, filteredColumn) {
        let modifiedRow = filteredRow as Station;
        let modifiedColumn: Product;
        this.products.forEach(product => {
            if (product.productName === filteredColumn) {
                modifiedColumn = product;
            }
        })

        if (modifiedColumn.productName !== "إجمالى المبالغ الإضافيه") {
            for (let existingIndex = 0; existingIndex < this.existings.length; existingIndex++) {
                if (this.existings[existingIndex].station.stationName === modifiedRow.stationName && this.existings[existingIndex].product.productName === modifiedColumn.productName) {
                    for (let tankIndex = 0; tankIndex < this.existings[existingIndex].station.tanks.length; tankIndex++) {
                        if (this.existings[existingIndex].station.tanks[tankIndex].product.productName === modifiedColumn.productName && this.existings[existingIndex].existingAmount > this.existings[existingIndex].station.tanks[tankIndex].tankVolume) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        else {
            return true;
        }
    }

    exportTable() {
        this.exporter.exportTable('xlsx', { fileName: `الإحتياجات-${this.date.value.date()}_${this.date.value.month() + 1}_${this.date.value.year()}` })
    }
}
