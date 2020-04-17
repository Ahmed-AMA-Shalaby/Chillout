import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { DistancesReportComponent } from './distances-report.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule, MatTableModule, MatSelectModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { MatTableExporterModule } from 'mat-table-exporter';

const routes = [
    {
        path: '**',
        component: DistancesReportComponent
    }
];

@NgModule({
    declarations: [
        DistancesReportComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,

        // Material
        MatTableModule,
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
        DistancesReportComponent
    ]
})

export class DistancesReportModule {
}
