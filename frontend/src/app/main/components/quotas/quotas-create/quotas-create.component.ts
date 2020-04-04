import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Quota } from 'app/main/models/quota.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { Warehouse } from 'app/main/models/warehouse.model';
import { Product } from 'app/main/models/product.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
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
    selector: 'quotas-create',
    templateUrl: './quotas-create.component.html',
    styleUrls: ['./quotas-create.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class QuotasCreateComponent implements OnInit {
    date = new FormControl(moment());
    products: Product[];
    warehouses: Warehouse[];
    quotaForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.quotaForm = this._formBuilder.group({
            date: [null, Validators.required],
            warehouse: [null, Validators.required],
            product: [null, Validators.required],
        });
        this.quotaForm.get('date').disable();
        this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
            (products as Product[]).forEach((product, index) => {
                if (product.productName === "إجمالى المبالغ الإضافيه") {
                    products.splice(index, 1)
                }
            })
            this.products = products;
        })
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(warehouses => {
            this.warehouses = warehouses;
        })
    }

    createQuota() {
        const quota = <Quota>{
            month: this.date.value.month() + 1,
            year: this.date.value.year(),
            warehouse: this.quotaForm.value.warehouse,
            product: this.quotaForm.value.product,
            quotaAmount: 0,
        }
        this.genericService.updateEntity(environment.entities.Quota, quota).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
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
    }
}