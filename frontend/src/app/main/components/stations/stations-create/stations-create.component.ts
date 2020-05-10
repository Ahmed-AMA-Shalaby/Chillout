import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Station } from 'app/main/models/station.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { Sector } from 'app/main/models/sector.model';
import { Product } from 'app/main/models/product.model';
import { Agent } from 'app/main/models/agent.model';

@Component({
    selector: 'stations-create',
    templateUrl: './stations-create.component.html',
    styleUrls: ['./stations-create.component.scss']
})
export class StationsCreateComponent implements OnInit {
    agents: Agent[];
    sectors: Sector[];
    stationForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private genericService: GenericService
    ) { }

    ngOnInit() {
        this.stationForm = this._formBuilder.group({
            stationCode: [null, Validators.required],
            stationName: [null, Validators.required],
            stationLocation: [null, Validators.required],
            agent: [null, Validators.required],
            sector: [null, Validators.required]
        });
        this.genericService.retrieveShownEntities(environment.entities.Agent).subscribe(agents => {
            this.agents = agents;
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
        this.genericService.retrieveShownEntities(environment.entities.Sector).subscribe(sectors => {
            this.sectors = sectors;
            this.sectors.sort((a, b) => {
                if (a.sectorName > b.sectorName) {
                    return 1;
                }
                else if (a.sectorName == b.sectorName) {
                    return 0;
                }
                else {
                    return -1
                }
            });
        })
    }

    createStation() {
        this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
            products.forEach(product => {
                if ((product as Product).productName == "إجمالى المبالغ الإضافيه") {
                    const station = <Station>{
                        stationCode: this.stationForm.value.stationCode,
                        stationName: this.stationForm.value.stationName,
                        stationLocation: this.stationForm.value.stationLocation,
                        agent: this.stationForm.value.agent,
                        sector: this.stationForm.value.sector,
                        tanks: [
                            {
                                tankVolume: 0,
                                product: (product as Product)
                            }
                        ]
                    }

                    this.genericService.updateEntity(environment.entities.Station, station).subscribe(
                        data => {
                            this.snackbar.open(data.message, "Ok");
                        },
                        error => {
                            this.snackbar.open(error.message, "Ok");
                        }
                    )
                }
            })
        })
    }
}