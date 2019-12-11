import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

    constructor(
        private _fuseConfigService: FuseConfigService
    ) {
        // this._fuseConfigService.config = {
        //     layout: {
        //         navbar: {
        //             hidden: true
        //         }
        //     }
        // };
    }
}
