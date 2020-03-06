import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { DistancesSearchComponent } from './distances-search.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: DistancesSearchComponent
    }
];

@NgModule({
    declarations: [
        DistancesSearchComponent
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
        MatSelectModule,
        MatOptionModule,
        
        // App modules
        GenericTableModule
    ],
    exports: [
        DistancesSearchComponent
    ]
})

export class DistancesSearchModule {
}
