import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Temp } from './temp.model';
import { TempPopupService } from './temp-popup.service';
import { TempService } from './temp.service';

@Component({
    selector: 'jhi-temp-dialog',
    templateUrl: './temp-dialog.component.html'
})
export class TempDialogComponent implements OnInit {

    temp: Temp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private tempService: TempService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.temp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tempService.update(this.temp));
        } else {
            this.subscribeToSaveResponse(
                this.tempService.create(this.temp));
        }
    }

    private subscribeToSaveResponse(result: Observable<Temp>) {
        result.subscribe((res: Temp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Temp) {
        this.eventManager.broadcast({ name: 'tempListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-temp-popup',
    template: ''
})
export class TempPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tempPopupService: TempPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tempPopupService
                    .open(TempDialogComponent as Component, params['id']);
            } else {
                this.tempPopupService
                    .open(TempDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
