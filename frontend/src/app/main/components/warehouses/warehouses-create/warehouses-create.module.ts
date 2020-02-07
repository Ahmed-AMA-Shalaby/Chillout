import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { WarehousesCreateComponent } from './warehouses-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: WarehousesCreateComponent
    }
];

@NgModule({
    declarations: [
        WarehousesCreateComponent
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
        WarehousesCreateComponent
    ]
})

export class WarehousesCreateModule {
}
