import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Company } from 'app/main/models/company.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'companies-create',
    templateUrl: './companies-create.component.html',
    styleUrls: ['./companies-create.component.scss']
})
export class CompaniesCreateComponent implements OnInit {
    companyForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.companyForm = this._formBuilder.group({
            companyName: ['', Validators.required]
        });
    }

    createCompany() {
        const company = <Company>{
            companyName: this.companyForm.value.companyName
        }
        this.genericService.createEntity(environment.entities.Company, company).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}