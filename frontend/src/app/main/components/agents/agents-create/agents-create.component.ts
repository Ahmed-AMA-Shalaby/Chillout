import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Agent } from 'app/main/models/agent.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'agents-create',
    templateUrl: './agents-create.component.html',
    styleUrls: ['./agents-create.component.scss']
})
export class AgentsCreateComponent implements OnInit {
    agentForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.agentForm = this._formBuilder.group({
            agentName: ['', Validators.required]
        });
    }

    createAgent() {
        const agent = <Agent>{
            agentName: this.agentForm.value.agentName
        }
        this.genericService.createEntity(environment.entities.Agent, agent).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }
}