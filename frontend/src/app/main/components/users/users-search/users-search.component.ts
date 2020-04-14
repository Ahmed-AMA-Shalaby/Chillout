import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { User } from 'app/main/models/user.model';
import { AppStorageService } from 'app/main/services/app-storage.service';

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
    deleteFlag: boolean = false;

    dataSource: MatTableDataSource<{}>;
    originalColumns = [];
    displayedColumns = [];
    administratorFlag: boolean = true;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private genericService: GenericService,
        private snackbar: MatSnackBar,
        private storageService: AppStorageService
        ) { }

    ngOnInit() {
        this.users = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveAllEntities(environment.entities.User).subscribe(data => {
            this.users = data;
            this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role'];
            this.displayedColumns = ['First Name', 'Middle Name', 'Last Name', 'Phone Number', 'Role'];
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.filterPredicate = (data: User, filter: string) => {
                return data.firstName.startsWith(filter) || data.middleName.startsWith(filter) || data.lastName.startsWith(filter);
            };
            this.dataSource.paginator = this.paginator;
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.filterValue = filterValue;
    }

    toggleDelete() {
        this.deleteFlag = !this.deleteFlag;
        this.users.length = 0;
        if (this.deleteFlag) {
            this.genericService.retrieveAllEntities(environment.entities.User).subscribe(data => {
                (data as User[]).forEach(user => {
                    this.users.push(user as never)
                })
                this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role', 'delete'];
                this.displayedColumns = ['First Name', 'Middle Name', 'Last Name', 'Phone Number', 'Role', ' '];
                this.dataSource.paginator = this.paginator;
            })
        }
        else {
            this.genericService.retrieveAllEntities(environment.entities.User).subscribe(data => {
                (data as User[]).forEach(user => {
                    this.users.push(user as never)
                })
                this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role'];
                this.displayedColumns = ['First Name', 'Middle Name', 'Last Name', 'Phone Number', 'Role'];
                this.dataSource.paginator = this.paginator;
            })
        }
    }

    deleteUser(filteredRow) {
        let rowID = this.dataSource.filteredData[filteredRow]["id"]
        this.users.forEach((row, index) => {
            if (row["id"] == rowID) {
                this.users.splice(index, 1)[0] as User
                this.genericService.deleteEntity(environment.entities.User, rowID).subscribe(
                    data => {
                        this.snackbar.open(data.message);
                    },
                    error => {
                        this.snackbar.open(error.message);
                    }
                );
                this.dataSource = new MatTableDataSource(this.users);
            }
        })
    }


}
