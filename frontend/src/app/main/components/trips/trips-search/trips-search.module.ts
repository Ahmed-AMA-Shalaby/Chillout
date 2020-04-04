import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { TripsSearchComponent } from './trips-search.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule, MatDatepickerModule, MatTableModule, MatPaginatorModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: TripsSearchComponent
    }
];

@NgModule({
    declarations: [
        TripsSearchComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,

        // Material
        MatTableModule,
        MatPaginatorModule,
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
        MatDatepickerModule,
        // App modules
        GenericTableModule
    ],
    exports: [
        TripsSearchComponent
    ]
})

export class TripsSearchModule {
}
