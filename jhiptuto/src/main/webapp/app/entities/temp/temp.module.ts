import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Tuto2SharedModule } from '../../shared';
import {
    TempService,
    TempPopupService,
    TempComponent,
    TempDetailComponent,
    TempDialogComponent,
    TempPopupComponent,
    TempDeletePopupComponent,
    TempDeleteDialogComponent,
    tempRoute,
    tempPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tempRoute,
    ...tempPopupRoute,
];

@NgModule({
    imports: [
        Tuto2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TempComponent,
        TempDetailComponent,
        TempDialogComponent,
        TempDeleteDialogComponent,
        TempPopupComponent,
        TempDeletePopupComponent,
    ],
    entryComponents: [
        TempComponent,
        TempDialogComponent,
        TempPopupComponent,
        TempDeleteDialogComponent,
        TempDeletePopupComponent,
    ],
    providers: [
        TempService,
        TempPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tuto2TempModule {}
