import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'trip',
    templateUrl: './trip.component.html',
    styleUrls: ['./trip.component.scss'],
    animations: fuseAnimations
})
export class TripComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() {
        
    }

}
