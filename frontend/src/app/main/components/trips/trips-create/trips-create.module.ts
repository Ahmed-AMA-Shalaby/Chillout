import { GenericTableModule } from '../../../../layout/components/generic-table/generic-table.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { TripsCreateComponent } from './trips-create.component';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatStepperModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: TripsCreateComponent
    }
];

@NgModule({
    declarations: [
        TripsCreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,

        // Material
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatStepperModule,
        MatOptionModule,
        MatDatepickerModule,
        

        // App modules
        GenericTableModule
    ],
    exports: [
        TripsCreateComponent
    ]
})

export class TripsCreateModule {
}
