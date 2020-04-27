import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GenericService } from 'app/main/services/generic.service';
import { environment } from 'environments/environment';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatPaginatorIntl } from '@angular/material';
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
        private storageService: AppStorageService,
        private cdr: ChangeDetectorRef,
        private paginatorLabel: MatPaginatorIntl,
    ) { }

    ngOnInit() {
        this.users = [];
        this.dataSource = new MatTableDataSource([]);
        this.genericService.retrieveAllEntities(environment.entities.User).subscribe(data => {
            this.users = data as [];
            this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role'];
            this.displayedColumns = ['الإسم الأول', 'الإسم الأوسط', 'الإسم الأخير', 'رقم الهاتف', 'الدور'];
            this.dataSource = new MatTableDataSource(this.users);
            this.cdr.detectChanges();
            this.dataSource.filterPredicate = (data: User, filter: string) => {
                return data.firstName.startsWith(filter) || data.middleName.startsWith(filter) || data.lastName.startsWith(filter) || data.phoneNumber.startsWith(filter)
            };
            this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
        })
        this.storageService.loadUser().role === environment.roles.Administrator ? this.administratorFlag = true : this.administratorFlag = false;
    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue;
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
                this.displayedColumns = ['الإسم الأول', 'الإسم الأوسط', 'الإسم الأخير', 'رقم الهاتف', 'الدور', ' '];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
            })
        }
        else {
            this.genericService.retrieveAllEntities(environment.entities.User).subscribe(data => {
                (data as User[]).forEach(user => {
                    this.users.push(user as never)
                })
                this.originalColumns = ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role'];
                this.displayedColumns = ['الإسم الأول', 'الإسم الأوسط', 'الإسم الأخير', 'رقم الهاتف', 'الدور'];
                this.cdr.detectChanges();
                this.dataSource.paginator = this.paginator;
            this.paginatorLabel.itemsPerPageLabel = "مواد لكل صفحه:"
            this.paginatorLabel.nextPageLabel = "الصفحة التاليه"
            this.paginatorLabel.previousPageLabel = "الصفحة السابقة"
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
