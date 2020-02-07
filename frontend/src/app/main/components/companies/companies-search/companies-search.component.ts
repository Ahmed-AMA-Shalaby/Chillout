import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Company } from 'app/main/models/company.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'companies-search',
    templateUrl: './companies-search.component.html',
    styleUrls: ['./companies-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CompaniesSearchComponent implements OnInit {
    companies: Company[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    constructor(private genericService: GenericService) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Company).subscribe(
            data => {
                this.companies = data;
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
        this.companies.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Company).subscribe(data => {
                this.companies = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Company).subscribe(data => {
                this.companies = data;
            })
        }
    }
}
