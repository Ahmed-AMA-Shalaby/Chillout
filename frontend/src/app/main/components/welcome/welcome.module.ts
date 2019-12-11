import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { WelcomeComponent } from './welcome.component';


const routes = [
    {
        path: '**',
        component: WelcomeComponent
    }
];

@NgModule({
    declarations: [
        WelcomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,
    ],
    exports: [
        WelcomeComponent
    ],
    providers: [
    ]
})

export class WelcomeModule {
}
