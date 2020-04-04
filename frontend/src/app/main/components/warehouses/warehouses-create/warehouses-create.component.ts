import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Warehouse } from 'app/main/models/warehouse.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { Sector } from 'app/main/models/sector.model';

@Component({
    selector: 'warehouses-create',
    templateUrl: './warehouses-create.component.html',
    styleUrls: ['./warehouses-create.component.scss']
})
export class WarehousesCreateComponent implements OnInit {
    sectors: Sector[];
    warehouseForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.warehouseForm = this._formBuilder.group({
            warehouseName: [null, Validators.required],
            companyName: [null, Validators.required],
            sector: [null, Validators.required]
        });
        this.genericService.retrieveShownEntities(environment.entities.Sector).subscribe(sectors => {
            this.sectors = sectors;
        })
    }

    createWarehouse() {
        const warehouse = <Warehouse>{
            warehouseName: this.warehouseForm.value.warehouseName,
            companyName: this.warehouseForm.value.companyName,
            sector: this.warehouseForm.value.sector
        }
        this.genericService.updateEntity(environment.entities.Warehouse, warehouse).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}