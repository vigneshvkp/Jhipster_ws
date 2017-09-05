/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Tuto2TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TempDetailComponent } from '../../../../../../main/webapp/app/entities/temp/temp-detail.component';
import { TempService } from '../../../../../../main/webapp/app/entities/temp/temp.service';
import { Temp } from '../../../../../../main/webapp/app/entities/temp/temp.model';

describe('Component Tests', () => {

    describe('Temp Management Detail Component', () => {
        let comp: TempDetailComponent;
        let fixture: ComponentFixture<TempDetailComponent>;
        let service: TempService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Tuto2TestModule],
                declarations: [TempDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TempService,
                    JhiEventManager
                ]
            }).overrideTemplate(TempDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TempDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TempService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Temp(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.temp).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
