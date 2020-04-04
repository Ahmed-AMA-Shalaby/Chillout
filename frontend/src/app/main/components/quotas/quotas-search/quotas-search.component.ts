import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Quota } from 'app/main/models/quota.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { Warehouse } from 'app/main/models/warehouse.model';
import { Product } from 'app/main/models/product.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
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
    selector: 'quotas-search',
    templateUrl: './quotas-search.component.html',
    styleUrls: ['./quotas-search.component.scss'],
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
export class QuotasSearchComponent implements OnInit {
    date = new FormControl(moment());
    quotas: Quota[] = [];
    warehouses: Warehouse[];
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
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();
        this.quotas = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveQuotasbyYearandMonth(this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
            this.quotas = data as Quota[];
            this.originalColumns = ['warehouse', 'product', 'quotaAmount'];
            this.displayedColumns = ['Warehouse', 'Product', 'Quota Amount'];
            this.dataSource = new MatTableDataSource(this.quotas);
            this.dataSource.paginator = this.paginator;
        })
    }

    toggleEdit() {
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(data => {
            this.warehouses = data;
        })
        this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
            (products as Product[]).forEach((product, index) => {
                if (product.productName === "إجمالى المبالغ الإضافيه") {
                    products.splice(index, 1)
                }
            })
            this.products = products;
        })
        this.editFlag = !this.editFlag;
        this.quotas.length = 0;
        this.genericService.retrieveQuotasbyYearandMonth(this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
            this.quotas = data as Quota[];
            this.originalColumns = ['warehouse', 'product', 'quotaAmount'];
            this.displayedColumns = ['Warehouse', 'Product', 'Quota Amount'];
            this.dataSource = new MatTableDataSource(this.quotas);
            this.dataSource.paginator = this.paginator;
        })
    }

    modifyData(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.quotas.forEach(row => {
            if (row["id"] == rowID) {
                let modifiedRow = this.dataSource.filteredData[filteredRow];
                this.genericService.updateEntity(environment.entities.Quota, modifiedRow).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                    },
                    error => {
                        this.snackbar.open(error.message);
                    }
                );
            }
        })
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
        this.genericService.retrieveQuotasbyYearandMonth(this.date.value.year(), this.date.value.month() + 1).subscribe(data => {
            this.quotas = data as Quota[];
            this.originalColumns = ['warehouse', 'product', 'quotaAmount'];
            this.displayedColumns = ['Warehouse', 'Product', 'Quota Amount'];
            this.dataSource = new MatTableDataSource(this.quotas);
            this.dataSource.paginator = this.paginator;
        })
    }
}
