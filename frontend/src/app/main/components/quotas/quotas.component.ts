import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Quota } from 'app/main/models/quota.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Warehouse } from 'app/main/models/warehouse.model';
import { Product } from 'app/main/models/product.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppStorageService } from 'app/main/services/app-storage.service';
import { MatTableExporterDirective } from 'mat-table-exporter';
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
    selector: 'quotas',
    templateUrl: './quotas.component.html',
    styleUrls: ['./quotas.component.scss'],
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
export class QuotasComponent implements OnInit {
    date = new FormControl(moment());
    quotas: Quota[] = [];
    warehouses: Warehouse[];
    products: Product[];
    editFlag: boolean = false;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    dateForm: FormGroup;
    administratorFlag: boolean = true;

    total: (string | number)[] = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild('exporter')
    exporter: MatTableExporterDirective

    constructor(
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private snackbar: MatSnackBar,
        private storageService: AppStorageService,
        private cdr: ChangeDetectorRef,
        private paginatorLabel: MatPaginatorIntl,
    ) { }

    ngOnInit() {
        this.dateForm = this._formBuilder.group({
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();
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
            this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Quota, this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
                this.quotas = data as Quota[];
                this.calculateTotal();
            })
            this.dataSource = new MatTableDataSource(this.warehouses);
            this.cdr.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.quotas.length = 0;
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
            this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Quota, this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
                this.quotas = data as Quota[];
                this.calculateTotal();
            })
            this.dataSource = new MatTableDataSource(this.warehouses);
            this.cdr.detectChanges();
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
    }

    modifyData(filteredRow, filteredColumn, modifiedAmount) {
        let modifiedRow = filteredRow as Warehouse;
        let modifiedColumn: Product;
        this.products.forEach(product => {
            if (product.productName === filteredColumn) {
                modifiedColumn = product;
            }
        })

        this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Quota, this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
            this.quotas = data as Quota[];
            let quotaFound = false;
            this.quotas.forEach(quota => {
                if (quota.warehouse.warehouseName === modifiedRow.warehouseName && quota.warehouse.companyName === modifiedRow.companyName && quota.product.productName === modifiedColumn.productName) {
                    quotaFound = true;
                    quota.quotaAmount = modifiedAmount;
                    this.genericService.updateEntity(environment.entities.Quota, quota).subscribe(
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

            if (!quotaFound) {
                let quota = <Quota>{
                    year: this.date.value.year(),
                    month: this.date.value.month() + 1,
                    warehouse: modifiedRow,
                    product: modifiedColumn,
                    quotaAmount: modifiedAmount
                }

                this.genericService.updateEntity(environment.entities.Quota, quota).subscribe(
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

    adjustQuotasDisplay(rowIndex: number, columnIndex: number) {
        for (let quotasIndex = 0; quotasIndex < this.quotas.length; quotasIndex++) {
            if (this.quotas[quotasIndex].warehouse.warehouseName === this.warehouses[rowIndex].warehouseName && this.quotas[quotasIndex].warehouse.companyName === this.warehouses[rowIndex].companyName && this.quotas[quotasIndex].product.productName === this.displayedColumns[columnIndex]) {
                return this.quotas[quotasIndex].quotaAmount;
            }
        }
        return "";
    }

    checkProductInWarehouse(rowIndex: number, columnIndex: number) {
        for (let productIndex = 0; productIndex < (this.warehouses[rowIndex] as Warehouse).products.length; productIndex++) {
            if ((this.warehouses[rowIndex] as Warehouse).products[productIndex].productName === this.displayedColumns[columnIndex]) {
                return true;
            }
        }
        return false;
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
        this.genericService.retrieveEntitiesbyYearandMonth(environment.entities.Quota, this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
            this.quotas = data as Quota[];
            this.calculateTotal();
        })
    }

    calculateTotal() {
        this.total = [];
        this.total.push('الإجمالى')
        for (let columnIndex = 1; columnIndex < this.displayedColumns.length; columnIndex++) {
            let quotaAccumulator = 0;
            for (let quotaIndex = 0; quotaIndex < this.quotas.length; quotaIndex++) {
                if (this.quotas[quotaIndex].product.productName === this.displayedColumns[columnIndex]) {
                    quotaAccumulator += this.quotas[quotaIndex].quotaAmount
                }
            }
            this.total.push(quotaAccumulator);
        }
    }

    exportTable() {
        this.exporter.exportTable('xlsx', { fileName: `الكوتات-${this.date.value.month() + 1}_${this.date.value.year()}` })
    }
}
