import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { MatSnackBar, MatHorizontalStepper } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'app/main/models/product.model';
import { Station } from 'app/main/models/station.model';
import { Warehouse } from 'app/main/models/warehouse.model';
import { Driver } from 'app/main/models/driver.model';
import { Vehicle } from 'app/main/models/vehicle.model';
import { environment } from 'environments/environment';
import { Trip } from 'app/main/models/trip.model';
import { Transfer } from 'app/main/models/transfer.model';
import { Distance } from 'app/main/models/distance.model';
const moment = _moment;


export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'trips-create',
    templateUrl: './trips-create.component.html',
    styleUrls: ['./trips-create.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})

export class TripsCreateComponent implements OnInit {
    date = new FormControl(moment());
    dateForm: FormGroup;
    transfer1Form: FormGroup;
    transfer2Form: FormGroup;
    transfer3Form: FormGroup;
    tripForm: FormGroup;
    products: Product[];
    transfer1products: Product[];
    transfer2products: Product[];
    transfer3products: Product[];
    stations: Station[];
    warehouses: Warehouse[];
    drivers: Driver[];
    vehicles: Vehicle[];
    distances: Distance[];

    constructor(
        private _formBuilder: FormBuilder,
        private genericService: GenericService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.dateForm = this._formBuilder.group({
            date: [null, Validators.required]
        });
        this.dateForm.get('date').disable();

        this.transfer1Form = this._formBuilder.group({
            station: [null, Validators.required],
            product: [null, Validators.required],
            transferredAmount: [null, Validators.required]
        });

        this.transfer2Form = this._formBuilder.group({
            station: [null, Validators.required],
            product: [null, Validators.required],
            transferredAmount: [null, Validators.required]
        });

        this.transfer3Form = this._formBuilder.group({
            station: [null, Validators.required],
            product: [null, Validators.required],
            transferredAmount: [null, Validators.required]
        });

        this.tripForm = this._formBuilder.group({
            outboundWarehouse: [null, Validators.required],
            driver: [null, Validators.required],
            vehicle: [null, Validators.required],
            inboundWarehouse: [null, Validators.required],
        });

        this.genericService.retrieveShownEntities(environment.entities.Warehouse).subscribe(warehouses => {
            this.warehouses = warehouses;
        })

        this.genericService.retrieveShownEntities(environment.entities.Station).subscribe(stations => {
            this.stations = stations;
        })

        this.genericService.retrieveShownEntities(environment.entities.Product).subscribe(products => {
            (products as Product[]).forEach((product, index) => {
                if (product.productName === "إجمالى المبالغ الإضافيه") {
                    products.splice(index, 1)
                }
            })
            this.products = products;
        })

        this.genericService.retrieveShownEntities(environment.entities.Driver).subscribe(drivers => {
            this.drivers = drivers;
        })

        this.genericService.retrieveShownEntities(environment.entities.Vehicle).subscribe(vehicles => {
            this.vehicles = vehicles;
        })

        this.genericService.retrieveAllEntities(environment.entities.Distance).subscribe(distances => {
            this.distances = distances;
        })
    }

    createTrip(stepper: MatHorizontalStepper) {
        let tripDistances = this.calculateTripDistances();

        let trip = <Trip>{
            day: this.date.value.date(),
            month: this.date.value.month() + 1,
            year: this.date.value.year(),
            outboundDistance: tripDistances.outboundDistance,
            inboundDistance: tripDistances.inboundDistance,
            driver: this.tripForm.value.driver,
            vehicle: this.tripForm.value.vehicle,
            transfers: []
        }

        if (!this.transfer1Form.invalid) {
            let transfer1 = <Transfer>{
                day: this.date.value.date(),
                month: this.date.value.month() + 1,
                year: this.date.value.year(),
                product: this.transfer1Form.value.product,
                station: this.transfer1Form.value.station,
                transferredAmount: this.transfer1Form.value.transferredAmount,
            }
            trip.transfers.push(transfer1);
        }

        if (!this.transfer2Form.invalid) {
            let transfer2 = <Transfer>{
                day: this.date.value.date(),
                month: this.date.value.month() + 1,
                year: this.date.value.year(),
                product: this.transfer2Form.value.product,
                station: this.transfer2Form.value.station,
                transferredAmount: this.transfer2Form.value.transferredAmount,
            }
            trip.transfers.push(transfer2);
        }

        if (!this.transfer3Form.invalid) {
            let transfer3 = <Transfer>{
                day: this.date.value.date(),
                month: this.date.value.month() + 1,
                year: this.date.value.year(),
                product: this.transfer3Form.value.product,
                station: this.transfer3Form.value.station,
                transferredAmount: this.transfer3Form.value.transferredAmount,
            }
            trip.transfers.push(transfer3);
        }


        this.genericService.retrieveEntitiesbyDate(environment.entities.Trip, this.date.value.year(), this.date.value.month() + 1, this.date.value.date()).subscribe(data => {
            let trips = data as Trip[];
            let orderCount = 1;
            trips.forEach(trip => {
                if (trip.vehicle.vehicleCode === this.tripForm.value.vehicle.vehicleCode) {
                    orderCount += 1;
                }
            })
            trip.order = orderCount;

            this.genericService.updateEntity(environment.entities.Trip, trip).subscribe(
                data => {
                    this.snackbar.open(data.message, "Ok");
                },
                error => {
                    this.snackbar.open(error.message, "Ok");
                }
            )
            stepper.reset();
        })
    }

    calculateTripDistances() {
        let outboundDistance = {
            value: 0,
            distance: <Distance>{}
        };

        for (let distanceIndex = 0; distanceIndex < this.distances.length; distanceIndex++) {
            if (this.distances[distanceIndex].warehouse.id === this.tripForm.value.outboundWarehouse.id) {
                if (!this.transfer1Form.invalid) {
                    if (this.distances[distanceIndex].station.id === this.transfer1Form.value.station.id && this.distances[distanceIndex].distance > outboundDistance.value) {
                        outboundDistance.value = this.distances[distanceIndex].distance;
                        outboundDistance.distance = this.distances[distanceIndex];
                    }
                }
                if (!this.transfer2Form.invalid) {
                    if (this.distances[distanceIndex].station.id === this.transfer2Form.value.station.id && this.distances[distanceIndex].distance > outboundDistance.value) {
                        outboundDistance.value = this.distances[distanceIndex].distance;
                        outboundDistance.distance = this.distances[distanceIndex];
                    }
                }
                if (!this.transfer3Form.invalid) {
                    if (this.distances[distanceIndex].station.id === this.transfer3Form.value.station.id && this.distances[distanceIndex].distance > outboundDistance.value) {
                        outboundDistance.value = this.distances[distanceIndex].distance;
                        outboundDistance.distance = this.distances[distanceIndex];
                    }
                }
            }
        }

        let inboundDistance = <Distance>{};
        for (let distanceIndex = 0; distanceIndex < this.distances.length; distanceIndex++) {
            if (this.distances[distanceIndex].warehouse.id === this.tripForm.value.inboundWarehouse.id && this.distances[distanceIndex].station.id === outboundDistance.distance.station.id) {
                inboundDistance = this.distances[distanceIndex]
            }
        }
        return { outboundDistance: outboundDistance.distance, inboundDistance: inboundDistance }
    }

    restrictProducts(outboundWarehouse: Warehouse) {
        this.products = this.products.filter(product => {
            for (let productIndex = 0; productIndex < outboundWarehouse.products.length; productIndex++) {
                if (outboundWarehouse.products[productIndex].id === product.id) {
                    return true;
                }
            }
        });
    }

    restrictTransfer1products(station: Station) {
        this.transfer1products = this.products
        this.transfer1products = this.transfer1products.filter(product => {
            for (let tankIndex = 0; tankIndex < station.tanks.length; tankIndex++) {
                if (station.tanks[tankIndex].product.id === product.id) {
                    return true;
                }
            }
        });
    }

    restrictTransfer2products(station: Station) {
        this.transfer2products = this.products
        this.transfer2products = this.transfer2products.filter(product => {
            for (let tankIndex = 0; tankIndex < station.tanks.length; tankIndex++) {
                if (station.tanks[tankIndex].product.id === product.id) {
                    return true;
                }
            }
        });
    }

    restrictTransfer3products(station: Station) {
        this.transfer3products = this.products
        this.transfer3products = this.transfer3products.filter(product => {
            for (let tankIndex = 0; tankIndex < station.tanks.length; tankIndex++) {
                if (station.tanks[tankIndex].product.id === product.id) {
                    return true;
                }
            }
        });
    }
}