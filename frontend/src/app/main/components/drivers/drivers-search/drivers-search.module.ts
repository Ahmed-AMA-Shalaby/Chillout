import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { DriversSearchComponent } from './drivers-search.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: DriversSearchComponent
    }
];

@NgModule({
    declarations: [
        DriversSearchComponent
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

        // App modules
        GenericTableModule
    ],
    exports: [
        DriversSearchComponent
    ]
})

export class DriversSearchModule {
}
