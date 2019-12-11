import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';

const routes = [
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule
    ],
    exports: [
        HomeComponent
    ]
})

export class HomeModule {
}
