import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { VehiclesCreateComponent } from './vehicles-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: VehiclesCreateComponent
    }
];

@NgModule({
    declarations: [
        VehiclesCreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,

        
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        VehiclesCreateComponent
    ]
})

export class VehiclesCreateModule {
}
