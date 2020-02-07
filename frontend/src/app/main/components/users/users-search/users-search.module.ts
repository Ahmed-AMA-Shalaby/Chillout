import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { UsersSearchComponent } from './users-search.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: UsersSearchComponent
    }
];

@NgModule({
    declarations: [
        UsersSearchComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,

        // Material
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
        // App modules
        GenericTableModule
    ],
    exports: [
        UsersSearchComponent
    ]
})

export class UsersSearchModule {
}
