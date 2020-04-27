import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Station } from 'app/main/models/station.model';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'app/main/services/generic.service';
import { Sector } from 'app/main/models/sector.model';
import { Product } from 'app/main/models/product.model';
import { Tank } from 'app/main/models/tank.model';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from 'environments/environment';
import { GenericDialogComponent } from 'app/layout/components/generic-dialog/generic-dialog.component';
import { Agent } from 'app/main/models/agent.model';
import { AppStorageService } from 'app/main/services/app-storage.service';

@Component({
    selector: 'station-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: fuseAnimations,
})
export class AboutComponent implements OnInit {
    station: Station;
    agents: Agent[];
    products: Product[] = [];
    sectors: Sector[];
    editFlag: boolean = false;
    addFlag: boolean = false;
    newTankVolume: number;
    newProduct: Product;
    administratorFlag: boolean = true;
    constructor(
        private route: ActivatedRoute,
        private snackbar: MatSnackBar,
        private genericService: GenericService,
        private dialog: MatDialog,
        private storageService: AppStorageService
        ) { }

    ngOnInit() {
        this.genericService.retrieveEntitybyID(environment.entities.Station, this.route.snapshot.params["id"]).subscribe(station => {
            this.station = station as Station;
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    toggleEdit() {
        if (this.editFlag) {
            this.genericService.updateEntity(environment.entities.Station, this.station).subscribe(
                data => {
                    this.snackbar.open(data.message, "Ok");
                },
                error => {
                    this.snackbar.open(error.message, "Ok");
                }
            )
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Agent).subscribe(agents => {
                this.agents = agents;
            })
            this.genericService.retrieveShownEntities(environment.entities.Sector).subscribe(sectors => {
                this.sectors = sectors;
            })
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                this.station.tanks.forEach(tank => {
                    (products as Product[]).forEach((product, index) => {
                        if (product.productName === tank.product.productName || product.productName === "إجمالى المبالغ الإضافيه") {
                            products.splice(index, 1)
                        }
                    })
                })
                this.products = products;
            })
        }
        this.editFlag = !this.editFlag;
    }

    toggleAdd() {
        if (!this.addFlag) {
            this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
                this.station.tanks.forEach(tank => {
                    (products as Product[]).forEach((product, index) => {
                        if (product.productName === tank.product.productName || product.productName === "إجمالى المبالغ الإضافيه") {
                            products.splice(index, 1)
                        }
                    })
                })
                this.products = products;
            })
        }
        this.addFlag = !this.addFlag;
    }

    removeProduct(tankIndex, product, tankVolume) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            title: "Warning!",
            content: "Are you sure that you want to remove the product " + product + " and its associated " + this.adjustThousands(tankVolume) + " litres ?"
        };

        const dialogRef = this.dialog.open(GenericDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            response => {
                if (response === "Remove") {
                    this.station.tanks.forEach((tank, index) => {
                        if (tankIndex == index) {
                            this.station.tanks.splice(index, 1)
                        }
                    })
                    this.genericService.updateEntity(environment.entities.Station, this.station).subscribe(
                        data => {
                            this.snackbar.open(data.message, "Ok");
                        },
                        error => {
                            this.snackbar.open(error.message, "Ok");
                        }
                    )
                }
            });
    }

    addTank() {
        let tank = <Tank>{
            tankVolume: this.newTankVolume,
            product: this.newProduct,
        }
        this.station.tanks.push(tank)
        this.newTankVolume = null;
        this.newProduct = null
        this.addFlag = !this.addFlag;
        this.genericService.updateEntity(environment.entities.Station, this.station).subscribe(
            data => {
                this.snackbar.open(data.message, "Ok");
            },
            error => {
                this.snackbar.open(error.message, "Ok");
            }
        )
    }

    adjustThousands(number: number) {
        return number > 999 ? number / 1000 + 'ألف' : number;
    }
}
