import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Temp } from './temp.model';
import { TempService } from './temp.service';

@Component({
    selector: 'jhi-temp-detail',
    templateUrl: './temp-detail.component.html'
})
export class TempDetailComponent implements OnInit, OnDestroy {

    temp: Temp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tempService: TempService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTemps();
    }

    load(id) {
        this.tempService.find(id).subscribe((temp) => {
            this.temp = temp;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTemps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tempListModification',
            (response) => this.load(this.temp.id)
        );
    }
}
