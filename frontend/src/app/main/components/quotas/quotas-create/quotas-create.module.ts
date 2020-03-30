import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { QuotasCreateComponent } from './quotas-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule, MatDatepickerModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: QuotasCreateComponent
    }
];

@NgModule({
    declarations: [
        QuotasCreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule
    ],
    exports: [
        QuotasCreateComponent
    ]
})

export class QuotasCreateModule {
}
