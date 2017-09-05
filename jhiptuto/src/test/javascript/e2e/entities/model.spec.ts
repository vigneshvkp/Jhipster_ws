import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';


describe('Model e2e test', () => {

    let navBarPage: NavBarPage;
    let modelDialogPage: ModelDialogPage;
    let modelComponentsPage: ModelComponentsPage;


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Models', () => {
        navBarPage.goToEntity('model');
        modelComponentsPage = new ModelComponentsPage();
        expect(modelComponentsPage.getTitle()).toMatch(/tuto2App.model.home.title/);

    });

    it('should load create Model dialog', () => {
        modelComponentsPage.clickOnCreateButton();
        modelDialogPage = new ModelDialogPage();
        expect(modelDialogPage.getModalTitle()).toMatch(/tuto2App.model.home.createOrEditLabel/);
        modelDialogPage.close();
    });

    it('should create and save Models', () => {
        modelComponentsPage.clickOnCreateButton();
        modelDialogPage.save();
        expect(modelDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ModelComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-model div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ModelDialogPage {
    modalTitle = element(by.css('h4#myModelLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
