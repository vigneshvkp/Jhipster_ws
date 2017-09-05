import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Tuto2SharedModule } from '../../shared';
import {
    ModelService,
    ModelPopupService,
    ModelComponent,
    ModelDetailComponent,
    ModelDialogComponent,
    ModelPopupComponent,
    ModelDeletePopupComponent,
    ModelDeleteDialogComponent,
    modelRoute,
    modelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...modelRoute,
    ...modelPopupRoute,
];

@NgModule({
    imports: [
        Tuto2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModelComponent,
        ModelDetailComponent,
        ModelDialogComponent,
        ModelDeleteDialogComponent,
        ModelPopupComponent,
        ModelDeletePopupComponent,
    ],
    entryComponents: [
        ModelComponent,
        ModelDialogComponent,
        ModelPopupComponent,
        ModelDeleteDialogComponent,
        ModelDeletePopupComponent,
    ],
    providers: [
        ModelService,
        ModelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tuto2ModelModule {}
