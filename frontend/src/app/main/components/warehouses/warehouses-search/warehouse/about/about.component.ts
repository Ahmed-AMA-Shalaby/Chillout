import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Warehouse } from 'app/main/models/warehouse.model';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'app/main/services/generic.service';
import { Sector } from 'app/main/models/sector.model';
import { Product } from 'app/main/models/product.model';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from 'environments/environment';
import { GenericDialogComponent } from 'app/layout/components/generic-dialog/generic-dialog.component';
import { AppStorageService } from 'app/main/services/app-storage.service';

@Component({
    selector: 'warehouse-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: fuseAnimations,
})
export class AboutComponent implements OnInit {
    warehouse: Warehouse;
    products: Product[] = [];
    sectors: Sector[];
    editFlag: boolean = false;
    addFlag: boolean = false;
    newProduct: Product;
    administratorFlag: boolean = true;
    constructor(
        private route: ActivatedRoute,
        private snackbar: MatSnackBar,
        private genericService: GenericService,
        private dialog: MatDialog,
        private storageService: AppStorageService
        ) { }

    ngOnInit() {
        this.genericService.retrieveEntitybyID(environment.entities.Warehouse, this.route.snapshot.params["id"]).subscribe(warehouse => {
            this.warehouse = warehouse as Warehouse;
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    toggleEdit() {
        if (this.editFlag) {
            this.genericService.updateEntity(environment.entities.Warehouse, this.warehouse).subscribe(
                data => {
                    this.snackbar.open(data.message, "Ok");
                },
                error => {
                    this.snackbar.open(error.message, "Ok");
                }
            )
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Sector).subscribe(sectors => {
                this.sectors = sectors;
            })
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                (products as Product[]).forEach((product, index) => {
                    if (product.productName === "إجمالى المبالغ الإضافيه") {
                        products.splice(index, 1)
                    }
                })
                this.warehouse.products.forEach(warehouseProduct => {
                    (products as Product[]).forEach((product, index) => {
                        if (product.productName === warehouseProduct.productName || product.productName === "إجمالى المبالغ الإضافيه") {
                            products.splice(index, 1)
                        }
                    })
                })
                this.products = products;
            })
        }
        this.editFlag = !this.editFlag;
    }

    toggleAdd() {
        if (!this.addFlag) {
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                (products as Product[]).forEach((product, index) => {
                    if (product.productName === "إجمالى المبالغ الإضافيه") {
                        products.splice(index, 1)
                    }
                })
                this.warehouse.products.forEach(warehouseProduct => {
                    (products as Product[]).forEach((product, index) => {
                        if (product.productName === warehouseProduct.productName || product.productName === "إجمالى المبالغ الإضافيه") {
                            products.splice(index, 1)
                        }
                    })
                })
                this.products = products;
            })
        }
        this.addFlag = !this.addFlag;
    }

    removeProduct(productIndex, product) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            title: "Warning!",
            content: "هل أنت متأكد من أنك تريد إزالة المنتج " + product + " ?"
        };

        const dialogRef = this.dialog.open(GenericDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            response => {
                if (response === "Remove") {
                    this.warehouse.products.forEach((product, index) => {
                        if (productIndex == index) {
                            this.warehouse.products.splice(index, 1)
                        }
                    })
                    this.genericService.updateEntity(environment.entities.Warehouse, this.warehouse).subscribe(
                        data => {
                            this.snackbar.open(data.message, "Ok");
                        },
                        error => {
                            this.snackbar.open(error.message, "Ok");
                        }
                    )
                }
            });
    }

    addProduct() {
        this.warehouse.products.push(this.newProduct)
        this.newProduct = null
        this.addFlag = !this.addFlag;
        this.genericService.updateEntity(environment.entities.Warehouse, this.warehouse).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }

}
