import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { User } from 'app/main/models/user.model';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'users-search',
    templateUrl: './users-search.component.html',
    styleUrls: ['./users-search.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class UsersSearchComponent implements OnInit {
    users: User[] = [];
    filterValue: string;
    editFlag: boolean = false;
    hideFlag: boolean = false;
    constructor(private genericService: GenericService) { }

    ngOnInit() {
        this.genericService.retrieveShownEntities(environment.entities.User).subscribe(
            data => {
                this.users = data;
            }
        )
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleEdit() {
        this.editFlag = !this.editFlag;
    }

    toggleHide() {
        this.hideFlag = !this.hideFlag;
        this.users.length = 0;
        if (this.hideFlag) {
            this.genericService.retrieveAllEntities(environment.entities.User).subscribe(data => {
                this.users = data;
            })
        }
        else {
            this.genericService.retrieveShownEntities(environment.entities.User).subscribe(data => {
                this.users = data;
            })
        }
    }
}
