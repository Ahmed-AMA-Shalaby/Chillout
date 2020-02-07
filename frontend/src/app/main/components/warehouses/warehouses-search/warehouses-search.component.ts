import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Warehouse } from 'app/main/models/warehouse.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

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
    constructor(private genericService: GenericService) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(
            data => {
                this.warehouses = data;
            }
        )
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.warehouses.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Warehouse).subscribe(data => {
                this.warehouses = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(data => {
                this.warehouses = data;
            })
        }
    }
}
