import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppStorageService } from 'app/main/services/app-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit {
    logoutFlag: boolean;
    constructor(
        private storageService: AppStorageService,
        private router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        if (this.storageService.loadUser() === null) {
            this.logoutFlag = false;
        }
        else{
            this.logoutFlag = true;
        }
    }
    
    logout(){
        this.storageService.removeUser();
        this.router.navigate(['/login']);
    }
}
