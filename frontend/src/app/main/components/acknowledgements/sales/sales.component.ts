import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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
    selector: 'sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss'],
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

export class SalesComponent implements OnInit {
    date = new FormControl(moment());
    sales: Sale[] = [];
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
        private snackbar: MatSnackBar,
        private paginatorLabel: MatPaginatorIntl,
    ) { }

    ngOnInit() {
        this.dateForm = this._formBuilder.group({
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();
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
                this.displayedColumns.push("إجمالى المبالغ الإضافيه");
            })
            this.genericService.retrieveEntitiesbyDate(environment.entities.Sale, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
                this.sales = data as Sale[];
            })
            this.dataSource = new MatTableDataSource(this.stations);
            this.dataSource.filterPredicate = (data: Station, filter: string) => {
                return data.stationName.includes(filter)
            };
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.sales.length = 0;
        this.retrieveCurrentSales();
    }

    modifyData(filteredRow, filteredColumn, modifiedAmount) {
        let modifiedRow = filteredRow as Station;
        let modifiedColumn: Product;
        this.products.forEach(product => {
            if (product.productName === filteredColumn) {
                modifiedColumn = product;
            }
        })

        this.genericService.retrieveEntitiesbyDate(environment.entities.Sale, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            this.sales = data as Sale[];
            let saleFound = false;
            this.sales.forEach(sale => {
                if (sale.station.stationName === modifiedRow.stationName && sale.product.productName === modifiedColumn.productName) {
                    saleFound = true;
                    sale.saleAmount = modifiedAmount;
                    this.genericService.updateEntity(environment.entities.Sale, sale).subscribe(
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

            if (!saleFound) {
                let sale = <Sale>{
                    year: this.date.value.year(),
                    month: this.date.value.month() + 1,
                    day: this.date.value.date(),
                    station: modifiedRow,
                    product: modifiedColumn,
                    saleAmount: modifiedAmount
                }

                this.genericService.updateEntity(environment.entities.Sale, sale).subscribe(
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

    adjustSalesDisplay(rowIndex: number, columnIndex: number) {
        for (let salesIndex = 0; salesIndex < this.sales.length; salesIndex++) {
            if (this.sales[salesIndex].station.stationName === (this.dataSource.filteredData[rowIndex] as Station).stationName && this.sales[salesIndex].product.productName === this.displayedColumns[columnIndex]) {
                return this.sales[salesIndex].saleAmount;
            }
        }
        return "";
    }

    checkProductInStation(rowIndex: number, columnIndex: number) {
        for (let tankIndex = 0; tankIndex < (this.dataSource.filteredData[rowIndex] as Station).tanks.length; tankIndex++) {
            if ((this.dataSource.filteredData[rowIndex] as Station).tanks[tankIndex].product.productName === this.displayedColumns[columnIndex]) {
                return true;
            }
        }
        return false;
    }

    retrieveCurrentSales() {
        this.genericService.retrieveEntitiesbyDate(environment.entities.Sale, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            this.sales = data as Sale[];
        })
    }
}
