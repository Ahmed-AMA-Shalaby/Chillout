import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { SectorsSearchComponent } from './sectors-search.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: SectorsSearchComponent
    }
];

@NgModule({
    declarations: [
        SectorsSearchComponent
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
        SectorsSearchComponent
    ]
})

export class SectorsSearchModule {
}
