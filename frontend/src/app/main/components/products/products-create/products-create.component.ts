import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Product } from 'app/main/models/product.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'products-create',
    templateUrl: './products-create.component.html',
    styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent implements OnInit {
    productForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.productForm = this._formBuilder.group({
            productName: ['', Validators.required]
        });
    }

    createProduct() {
        const product = <Product>{
            productName: this.productForm.value.productName
        }
        this.genericService.updateEntity(environment.entities.Product, product).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}