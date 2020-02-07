import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { CompaniesCreateComponent } from './companies-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: CompaniesCreateComponent
    }
];

@NgModule({
    declarations: [
        CompaniesCreateComponent
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
        CompaniesCreateComponent
    ]
})

export class CompaniesCreateModule {
}
