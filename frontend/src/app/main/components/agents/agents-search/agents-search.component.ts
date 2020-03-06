import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Agent } from 'app/main/models/agent.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'agents-search',
    templateUrl: './agents-search.component.html',
    styleUrls: ['./agents-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AgentsSearchComponent implements OnInit {
    agents: Agent[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    constructor(private genericService: GenericService) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Agent).subscribe(
            data => {
                this.agents = data;
            }
        )
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        this.agents.length = 0;
        this.genericService.retrieveShownEntities(environment.entities.Agent).subscribe(
            data => {
                this.agents = data;
            }
        )
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.agents.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Agent).subscribe(data => {
                this.agents = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Agent).subscribe(data => {
                this.agents = data;
            })
        }
    }
}
