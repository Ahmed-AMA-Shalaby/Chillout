import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { DistancesCreateComponent } from './distances-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: DistancesCreateComponent
    }
];

@NgModule({
    declarations: [
        DistancesCreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,

        
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule
    ],
    exports: [
        DistancesCreateComponent
    ]
})

export class DistancesCreateModule {
}
