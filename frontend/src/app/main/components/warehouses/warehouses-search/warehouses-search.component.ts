import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Warehouse } from 'app/main/models/warehouse.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';

@Component({
    selector: 'warehouses-search',
    templateUrl: './warehouses-search.component.html',
    styleUrls: ['./warehouses-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class WarehousesSearchComponent implements OnInit {
    warehouses: Warehouse[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    administratorFlag: boolean = true;
    constructor(
        private genericService: GenericService,
        private storageService: AppStorageService
    ) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(data => {
            this.warehouses = data;
            this.warehouses.sort((a, b) => {
                if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                    return 1;
                }
                else if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                    return 0;
                }
                else {
                    return -1
                }
            });
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.warehouses.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Warehouse).subscribe(data => {
                this.warehouses = data;
                this.warehouses.sort((a, b) => {
                    if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                        return 1;
                    }
                    else if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                        return 0;
                    }
                    else {
                        return -1
                    }
                });
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(data => {
                this.warehouses = data;
                this.warehouses.sort((a, b) => {
                    if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                        return 1;
                    }
                    else if ([a.companyName, a.warehouseName].join(' - ') > [b.companyName, b.warehouseName].join(' - ')) {
                        return 0;
                    }
                    else {
                        return -1
                    }
                });
            })
        }
    }
}
