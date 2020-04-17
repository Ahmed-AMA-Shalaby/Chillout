import { GenericTableModule } from '../../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { RemainingsReportComponent } from './remainings-report.component';
import { MatTabsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { MatTableExporterModule } from 'mat-table-exporter';

const routes = [
    {
        path: '**',
        component: RemainingsReportComponent
    }
];

@NgModule({
    declarations: [
        RemainingsReportComponent
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
        RemainingsReportComponent
    ]
})

export class RemainingsReportModule {
}
