import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Vehicle } from 'app/main/models/vehicle.model';
import { VehicleService } from 'app/main/services/vehicle.service';
import { GenericService } from 'app/main/services/generic.service';

interface CustomVehicle {
    id: string;
    vehicleCode: string;
    vehiclePlateNumbers: string;
    vehiclePlateLetters: string;
    vehicleCard: string;
    trailerPlateNumbers: string;
    trailerPlateLetters: string;
    hidden?: boolean;
}

@Component({
    selector: 'vehicles-search',
    templateUrl: './vehicles-search.component.html',
    styleUrls: ['./vehicles-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class VehiclesSearchComponent implements OnInit {
    vehicles: []
    editFlag: boolean = false;
    deleteFlag: boolean = false;
    plateLettersOriginal = ["أ", "ب", "ج", "د", "ر", "س", "ص", "ط", "ع", "ف", "ق", "ل", "م", "ن", "ه", "و", "ى"];
    plateLettersHex = ["\uFE83", "\uFE8F", "\uFE9D", "\uFEA9", "\uFEAD", "\uFEB1", "\uFEB9", "\uFEC1", "\uFEC9", "\uFED1", "\uFED5", "\uFEDD", "\uFEE1", "\uFEE5", "\uFEE9", "\uFEED", "\uFEEF"];

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private vehicleService: VehicleService, private genericService: GenericService) { }

    ngOnInit() {
        this.vehicles = [];
        this.dataSource = new MatTableDataSource([]);
        this.vehicleService.retrieveVehicles().subscribe(data => {
            this.vehicles = data as [];
            this.displayIsolatedCharacter();
            this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate'];
            this.displayedColumns = ['Vehicle Code', 'Vehicle Plate', 'Vehicle Card', 'Trailer Plate'];
            this.dataSource = new MatTableDataSource(this.vehicles);
            this.dataSource.filterPredicate = (data: Vehicle, filter: string) => {
                return data.vehicleCode.startsWith(filter)
            };
            this.dataSource.paginator = this.paginator;
        })
    }

    displayIsolatedCharacter(){
        this.vehicles.forEach((vehicle, vehicleIndex) => {
            let plate = "";
            (vehicle as Vehicle).vehiclePlate.split('').forEach((character, characterIndex) => {
                let isolatedLetter = this.plateLettersHex[this.plateLettersOriginal.indexOf(character)];
                if (isolatedLetter != undefined) {
                    plate += isolatedLetter;
                }
                else {
                    plate += character;
                }
            })
            this.vehicles[vehicleIndex]["vehiclePlate"] = plate as never;
            plate = "";
            (vehicle as Vehicle).trailerPlate.split('').forEach((character, characterIndex) => {
                let isolatedLetter = this.plateLettersHex[this.plateLettersOriginal.indexOf(character)];
                if (isolatedLetter != undefined) {
                    plate += isolatedLetter;
                }
                else {
                    plate += character;
                }
            })
            this.vehicles[vehicleIndex]["trailerPlate"] = plate as never;
        })
    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
        if (this.editFlag) {
            this.vehicleService.retrieveVehicles().subscribe(data => {
                this.vehicles.length = 0;
                data.forEach(vehicle => {
                    let customVehicle: CustomVehicle = {
                        id: (vehicle as Vehicle).id,
                        vehicleCode: (vehicle as Vehicle).vehicleCode,
                        vehiclePlateNumbers: (vehicle as Vehicle).vehiclePlate.split('-')[0],
                        vehiclePlateLetters: (vehicle as Vehicle).vehiclePlate.split('-')[1],
                        vehicleCard: (vehicle as Vehicle).vehicleCard,
                        trailerPlateNumbers: (vehicle as Vehicle).trailerPlate.split('-')[0],
                        trailerPlateLetters: (vehicle as Vehicle).trailerPlate.split('-')[1],
                        hidden: (vehicle as Vehicle).hidden
                    }
                    this.vehicles.push(customVehicle as never)
                })
                this.originalColumns = ['vehicleCode', 'vehiclePlateNumbers', 'vehiclePlateLetters', 'vehicleCard', 'trailerPlateNumbers', 'trailerPlateLetters'];
                this.displayedColumns = ['Vehicle Code', 'Vehicle Plate Numbers', 'Vehicle Plate Letters', 'Vehicle Card', 'Trailer Plate Numbers', 'Trailer Plate Letters'];
                this.dataSource.paginator = this.paginator;
            })
        }
        else {
            this.vehicles.length = 0;
            this.vehicleService.retrieveVehicles().subscribe(data => {
                data.forEach(vehicle => {
                    this.vehicles.push(vehicle as never)
                    this.displayIsolatedCharacter();
                })
                this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate'];
                this.displayedColumns = ['Vehicle Code', 'Vehicle Plate', 'Vehicle Card', 'Trailer Plate'];
                this.dataSource.paginator = this.paginator;
            })
        }
    }

    toggleDelete() {
        this.deleteFlag = !this.deleteFlag;
    }

    modifyData(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.vehicles.forEach(row => {
            if (row["id"] == rowID) {
                let vehicle: Vehicle = {
                    id: this.dataSource.filteredData[filteredRow]["id"],
                    vehicleCode: this.dataSource.filteredData[filteredRow]["vehicleCode"].replace(/\s/g, ''),
                    vehiclePlate: this.dataSource.filteredData[filteredRow]["vehiclePlateNumbers"].replace(/\s/g, '') + '-' + this.dataSource.filteredData[filteredRow]["vehiclePlateLetters"].replace(/\s/g, ''),
                    vehicleCard: this.dataSource.filteredData[filteredRow]["vehicleCard"].replace(/\s/g, ''),
                    trailerPlate: this.dataSource.filteredData[filteredRow]["trailerPlateNumbers"].replace(/\s/g, '') + '-' + this.dataSource.filteredData[filteredRow]["trailerPlateLetters"].replace(/\s/g, '')
                }
                this.genericService.updateEntity("Vehicle", vehicle).subscribe();
            }
        })
    }
}
