import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { SectorsCreateComponent } from './sectors-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: SectorsCreateComponent
    }
];

@NgModule({
    declarations: [
        SectorsCreateComponent
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
        SectorsCreateComponent
    ]
})

export class SectorsCreateModule {
}
