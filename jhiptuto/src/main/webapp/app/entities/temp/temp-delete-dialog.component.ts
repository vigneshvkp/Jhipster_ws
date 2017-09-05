import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Temp } from './temp.model';
import { TempPopupService } from './temp-popup.service';
import { TempService } from './temp.service';

@Component({
    selector: 'jhi-temp-delete-dialog',
    templateUrl: './temp-delete-dialog.component.html'
})
export class TempDeleteDialogComponent {

    temp: Temp;

    constructor(
        private tempService: TempService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tempService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tempListModification',
                content: 'Deleted an temp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-temp-delete-popup',
    template: ''
})
export class TempDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tempPopupService: TempPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tempPopupService
                .open(TempDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
