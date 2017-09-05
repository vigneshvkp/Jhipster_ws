import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModelComponent } from './model.component';
import { ModelDetailComponent } from './model-detail.component';
import { ModelPopupComponent } from './model-dialog.component';
import { ModelDeletePopupComponent } from './model-delete-dialog.component';

export const modelRoute: Routes = [
    {
        path: 'model',
        component: ModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.model.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'model/:id',
        component: ModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.model.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelPopupRoute: Routes = [
    {
        path: 'model-new',
        component: ModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model/:id/edit',
        component: ModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model/:id/delete',
        component: ModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tuto2App.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
