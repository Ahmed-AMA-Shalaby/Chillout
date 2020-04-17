import { GenericTableModule } from '../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { QuotasComponent } from './quotas.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { MatTableExporterModule } from 'mat-table-exporter';

const routes = [
    {
        path: '**',
        component: QuotasComponent
    }
];

@NgModule({
    declarations: [
        QuotasComponent
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
        MatDatepickerModule,
        MatTableExporterModule,

        // App modules
        GenericTableModule
    ],
    exports: [
        QuotasComponent
    ]
})

export class QuotasModule {
}
