import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProductsCreateComponent } from './products-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: ProductsCreateComponent
    }
];

@NgModule({
    declarations: [
        ProductsCreateComponent
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
        ProductsCreateComponent
    ]
})

export class ProductsCreateModule {
}
