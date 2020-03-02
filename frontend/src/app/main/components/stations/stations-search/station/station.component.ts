import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'station',
    templateUrl: './station.component.html',
    styleUrls: ['./station.component.scss'],
    animations: fuseAnimations
})
export class StationComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() {
        
    }

}
