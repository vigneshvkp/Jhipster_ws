import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Tuto2TempModule } from './temp/temp.module';
import { Tuto2ModelModule } from './model/model.module';
import { Tuto2RegionMySuffixModule } from './region/region-my-suffix.module';
import { Tuto2CountryMySuffixModule } from './country/country-my-suffix.module';
import { Tuto2LocationMySuffixModule } from './location/location-my-suffix.module';
import { Tuto2DepartmentMySuffixModule } from './department/department-my-suffix.module';
import { Tuto2TaskMySuffixModule } from './task/task-my-suffix.module';
import { Tuto2EmployeeMySuffixModule } from './employee/employee-my-suffix.module';
import { Tuto2JobMySuffixModule } from './job/job-my-suffix.module';
import { Tuto2JobHistoryMySuffixModule } from './job-history/job-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Tuto2TempModule,
        Tuto2ModelModule,
        Tuto2RegionMySuffixModule,
        Tuto2CountryMySuffixModule,
        Tuto2LocationMySuffixModule,
        Tuto2DepartmentMySuffixModule,
        Tuto2TaskMySuffixModule,
        Tuto2EmployeeMySuffixModule,
        Tuto2JobMySuffixModule,
        Tuto2JobHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tuto2EntityModule {}
