import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'warehouse',
    templateUrl: './warehouse.component.html',
    styleUrls: ['./warehouse.component.scss'],
    animations: fuseAnimations
})
export class WarehouseComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() {
        
    }

}
