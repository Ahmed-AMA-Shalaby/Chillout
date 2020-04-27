import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatPaginatorIntl } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Vehicle } from 'app/main/models/vehicle.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { AppStorageService } from 'app/main/services/app-storage.service';

interface CustomVehicle {
    id: string;
    vehicleCode: number;
    vehiclePlateNumbers: string;
    vehiclePlateLetters: string;
    vehicleCard: number;
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
    vehicles: [] = [];
    editFlag: boolean = false;
    hideFlag: boolean = false;
    plateLettersOriginal = ["أ", "ب", "ج", "د", "ر", "س", "ص", "ط", "ع", "ف", "ق", "ل", "م", "ن", "ه", "و", "ى"];
    plateLettersHex = ["\uFE83", "\uFE8F", "\uFE9D", "\uFEA9", "\uFEAD", "\uFEB1", "\uFEB9", "\uFEC1", "\uFEC9", "\uFED1", "\uFED5", "\uFEDD", "\uFEE1", "\uFEE5", "\uFEE9", "\uFEED", "\uFEEF"];

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    administratorFlag: boolean = true;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private genericService: GenericService,
        private snackbar: MatSnackBar,
        private storageService: AppStorageService,
        private cdr: ChangeDetectorRef,
        private paginatorLabel: MatPaginatorIntl,
    ) { }

    ngOnInit() {
        this.vehicles = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveShownEntities(environment.entities.Vehicle).subscribe(data => {
            this.vehicles = data as [];
            this.displayIsolatedCharacter();
            this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate'];
            this.displayedColumns = ['كود المركبه', 'لوحة المركبه', 'كارت المركبه', 'لوحة المقطوره'];
            this.dataSource = new MatTableDataSource(this.vehicles);
            this.cdr.detectChanges();
            this.dataSource.filterPredicate = (data: Vehicle, filter: string) => {
                return data.vehicleCode.toString().startsWith(filter)
            };
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    displayIsolatedCharacter() {
        this.vehicles.forEach((vehicle, vehicleIndex) => {
            let plate = "";
            (vehicle as Vehicle).vehiclePlate.split('').forEach((character) => {
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
            (vehicle as Vehicle).trailerPlate.split('').forEach((character) => {
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
        this.vehicles.length = 0;
        if (this.editFlag) {
            this.genericService.retrieveShownEntities(environment.entities.Vehicle).subscribe(data => {
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
                this.displayedColumns = ['كود المركبه', 'أرقام لوحة المركبه', 'حروف لوحة المركبه', 'كارت المركبه', 'أرقام لوحة المقطوره', 'حروف لوحة المقطوره'];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Vehicle).subscribe(data => {
                data.forEach(vehicle => {
                    this.vehicles.push(vehicle as never)
                    this.displayIsolatedCharacter();
                })
                this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate'];
                this.displayedColumns = ['كود المركبه', 'لوحة المركبه', 'كارت المركبه', 'لوحة المقطوره'];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
            })
        }
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
                this.genericService.updateEntity(environment.entities.Vehicle, vehicle).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                    },
                    error => {
                        this.snackbar.open(error.message);
                    }
                );
            }
        })
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.vehicles.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.Vehicle).subscribe(data => {
                data.forEach(vehicle => {
                    this.vehicles.push(vehicle as never)
                    this.displayIsolatedCharacter();
                })
                this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate', 'hidden'];
                this.displayedColumns = ['كود المركبه', 'لوحة المركبه', 'كارت المركبه', 'لوحة المقطوره', ' '];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.Vehicle).subscribe(data => {
                data.forEach(vehicle => {
                    this.vehicles.push(vehicle as never)
                    this.displayIsolatedCharacter();
                })
                this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate'];
                this.displayedColumns = ['كود المركبه', 'لوحة المركبه', 'كارت المركبه', 'لوحة المقطوره'];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
            })
        }
    }

    toggleVehicleVisibility(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.vehicles.forEach((row, index) => {
            if (row["id"] == rowID) {
                let vehicle: Vehicle = {
                    id: this.dataSource.filteredData[filteredRow]["id"],
                    vehicleCode: this.dataSource.filteredData[filteredRow]["vehicleCode"],
                    vehiclePlate: this.dataSource.filteredData[filteredRow]["vehiclePlate"],
                    vehicleCard: this.dataSource.filteredData[filteredRow]["vehicleCard"],
                    trailerPlate: this.dataSource.filteredData[filteredRow]["trailerPlate"],
                    hidden: !this.dataSource.filteredData[filteredRow]["hidden"]
                }
                this.vehicles[index]["hidden"] = !this.vehicles[index]["hidden"] as never
                this.genericService.updateEntity(environment.entities.Vehicle, vehicle).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                    },
                    error => {
                        this.snackbar.open(error.message);
                    }
                );
            }
        })
    }

}
