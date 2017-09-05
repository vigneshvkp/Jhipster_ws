import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TempComponent } from './temp.component';
import { TempDetailComponent } from './temp-detail.component';
import { TempPopupComponent } from './temp-dialog.component';
import { TempDeletePopupComponent } from './temp-delete-dialog.component';

export const tempRoute: Routes = [
    {
        path: 'temp',
        component: TempComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.temp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'temp/:id',
        component: TempDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.temp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tempPopupRoute: Routes = [
    {
        path: 'temp-new',
        component: TempPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.temp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'temp/:id/edit',
        component: TempPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.temp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'temp/:id/delete',
        component: TempDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.temp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
