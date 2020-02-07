import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { UsersCreateComponent } from './users-create.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatOptionModule, MatSelectModule } from '@angular/material';

const routes = [
    {
        path: '**',
        component: UsersCreateComponent
    }
];

@NgModule({
    declarations: [
        UsersCreateComponent
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
        UsersCreateComponent
    ]
})

export class UsersCreateModule {
}
