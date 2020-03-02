import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { StationsCreateComponent } from './stations-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: StationsCreateComponent
    }
];

@NgModule({
    declarations: [
        StationsCreateComponent
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
        StationsCreateComponent
    ]
})

export class StationsCreateModule {
}
