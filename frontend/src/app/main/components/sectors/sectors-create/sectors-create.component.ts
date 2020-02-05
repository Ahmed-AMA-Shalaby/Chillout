import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Sector } from 'app/main/models/sector.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'sectors-create',
    templateUrl: './sectors-create.component.html',
    styleUrls: ['./sectors-create.component.scss']
})
export class SectorsCreateComponent implements OnInit {
    sectorForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.sectorForm = this._formBuilder.group({
            sectorName: ['', Validators.required]
        });
    }

    createSector() {
        const sector = <Sector>{
            sectorName: this.sectorForm.value.sectorName
        }
        this.genericService.createEntity(environment.entities.Sector, sector).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}