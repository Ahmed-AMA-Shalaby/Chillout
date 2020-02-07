import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { WarehousesSearchComponent } from './warehouses-search.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: WarehousesSearchComponent
    }
];

@NgModule({
    declarations: [
        WarehousesSearchComponent
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
        WarehousesSearchComponent
    ]
})

export class WarehousesSearchModule {
}
