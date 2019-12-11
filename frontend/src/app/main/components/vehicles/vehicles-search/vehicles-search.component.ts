import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'vehicles-search',
  templateUrl: './vehicles-search.component.html',
  styleUrls: ['./vehicles-search.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class VehiclesSearchComponent implements OnInit {
  vehicles: { id: number, vehicleCode: string, vehiclePlate: string, vehicleCard: string, trailerPlate: string}[]

  constructor() { }

  ngOnInit() {
    this.vehicles = [
      { id: 1, vehicleCode: "160", vehiclePlate: "ا ك ن 256", vehicleCard: "551205648654", trailerPlate: "ه ت ى 4868"},
      { id: 2, vehicleCode: "185", vehiclePlate: "ل ى م 135", vehicleCard: "456484318435", trailerPlate: "م ل ص 4868"},
      { id: 1, vehicleCode: "127", vehiclePlate: "ت ه ح 817", vehicleCard: "555843512254", trailerPlate: "ح ف ن 4868"}
    ]
  }

}
