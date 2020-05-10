import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Agent } from 'app/main/models/agent.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';

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
    administratorFlag: boolean = true;
    constructor(
        private genericService: GenericService,
        private storageService: AppStorageService
    ) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.Agent).subscribe(
            data => {
                this.agents = data;
                this.agents.sort((a, b) => {
                    if (a.agentName > b.agentName) {
                        return 1;
                    }
                    else if (a.agentName == b.agentName) {
                        return 0;
                    }
                    else {
                        return -1
                    }
                });
            }
        )
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
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
                this.agents.sort((a, b) => {
                    if (a.agentName > b.agentName) {
                        return 1;
                    }
                    else if (a.agentName == b.agentName) {
                        return 0;
                    }
                    else {
                        return -1
                    }
                });
            }
        )
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.agents.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Agent).subscribe(data => {
                this.agents = data;
                this.agents.sort((a, b) => {
                    if (a.agentName > b.agentName) {
                        return 1;
                    }
                    else if (a.agentName == b.agentName) {
                        return 0;
                    }
                    else {
                        return -1
                    }
                });
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Agent).subscribe(data => {
                this.agents = data;
                this.agents.sort((a, b) => {
                    if (a.agentName > b.agentName) {
                        return 1;
                    }
                    else if (a.agentName == b.agentName) {
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
