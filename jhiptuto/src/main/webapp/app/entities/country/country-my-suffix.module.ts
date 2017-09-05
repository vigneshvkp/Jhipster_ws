import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Tuto2SharedModule } from '../../shared';
import {
    CountryMySuffixService,
    CountryMySuffixPopupService,
    CountryMySuffixComponent,
    CountryMySuffixDetailComponent,
    CountryMySuffixDialogComponent,
    CountryMySuffixPopupComponent,
    CountryMySuffixDeletePopupComponent,
    CountryMySuffixDeleteDialogComponent,
    countryRoute,
    countryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        Tuto2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CountryMySuffixComponent,
        CountryMySuffixDetailComponent,
        CountryMySuffixDialogComponent,
        CountryMySuffixDeleteDialogComponent,
        CountryMySuffixPopupComponent,
        CountryMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CountryMySuffixComponent,
        CountryMySuffixDialogComponent,
        CountryMySuffixPopupComponent,
        CountryMySuffixDeleteDialogComponent,
        CountryMySuffixDeletePopupComponent,
    ],
    providers: [
        CountryMySuffixService,
        CountryMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tuto2CountryMySuffixModule {}
