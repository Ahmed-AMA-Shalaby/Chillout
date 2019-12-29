import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { DriversCreateComponent } from './drivers-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: DriversCreateComponent
    }
];

@NgModule({
    declarations: [
        DriversCreateComponent
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
        DriversCreateComponent
    ]
})

export class DriversCreateModule {
}
