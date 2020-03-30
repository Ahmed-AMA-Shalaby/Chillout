import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Existing } from 'app/main/models/existing.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { Station } from 'app/main/models/station.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'app/main/models/product.model';
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
    selector: 'existings',
    templateUrl: './existings.component.html',
    styleUrls: ['./existings.component.scss'],
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

export class ExistingsComponent implements OnInit {
    date = new FormControl(moment());
    existings: Existing[] = [];
    stations: Station[];
    products: Product[];
    editFlag: boolean = false;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    dateForm: FormGroup;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.dateForm = this._formBuilder.group({
            date: ['', Validators.required]
        });
        this.dateForm.get('date').disable();
        this.dataSource = new MatTableDataSource([]);
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
                this.displayedColumns.push("إجمالى المبالغ الإضافيه");
            })
            this.genericService.retrieveExistingsbyDate(this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
                this.existings = data as Existing[];
            })
            this.dataSource = new MatTableDataSource(this.stations);
            this.dataSource.paginator = this.paginator;
        })
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.existings.length = 0;
        this.retrieveCurrentExistings();
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
                this.displayedColumns.push("إجمالى المبالغ الإضافيه");
            })
            this.dataSource = new MatTableDataSource(this.stations);
            this.dataSource.paginator = this.paginator;
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

        this.genericService.retrieveExistingsbyDate(this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
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

    adjustExistingsDisplay(rowIndex: number, columnIndex: number) {
        for (let existingsIndex = 0; existingsIndex < this.existings.length; existingsIndex++) {
            if (this.existings[existingsIndex].station.stationName === this.stations[rowIndex].stationName && this.existings[existingsIndex].product.productName === this.displayedColumns[columnIndex]) {
                return this.existings[existingsIndex].existingAmount;
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

    retrieveCurrentExistings() {
        this.genericService.retrieveExistingsbyDate(this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
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

        for (let existingIndex = 0; existingIndex < this.existings.length; existingIndex++) {
            if (this.existings[existingIndex].station.stationName === modifiedRow.stationName && this.existings[existingIndex].product.productName === modifiedColumn.productName) {
                for (let tankIndex = 0; tankIndex < this.existings[existingIndex].station.tanks.length; tankIndex++) {
                    if (this.existings[existingIndex].station.tanks[tankIndex].product.productName === modifiedColumn.productName && this.existings[existingIndex].existingAmount > this.existings[existingIndex].station.tanks[tankIndex].tankVolume) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
