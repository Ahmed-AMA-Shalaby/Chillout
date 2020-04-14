import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Product } from 'app/main/models/product.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';

@Component({
    selector: 'products-search',
    templateUrl: './products-search.component.html',
    styleUrls: ['./products-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductsSearchComponent implements OnInit {
    products: Product[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    administratorFlag: boolean = true;
    constructor(
        private genericService: GenericService,
        private storageService: AppStorageService
        ) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(data => {
            this.products = data;
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.products.length = 0;
        this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(
            data => {
                this.products = data;
            }
        )
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.products.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Product).subscribe(data => {
                this.products = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(data => {
                this.products = data;
            })
        }
    }
}
