import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Temp e2e test', () => {

    let navBarPage: NavBarPage;
    let tempDialogPage: TempDialogPage;
    let tempComponentsPage: TempComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Temps', () => {
        navBarPage.goToEntity('temp');
        tempComponentsPage = new TempComponentsPage();
        expect(tempComponentsPage.getTitle()).toMatch(/tuto2App.temp.home.title/);

    });

    it('should load create Temp dialog', () => {
        tempComponentsPage.clickOnCreateButton();
        tempDialogPage = new TempDialogPage();
        expect(tempDialogPage.getModalTitle()).toMatch(/tuto2App.temp.home.createOrEditLabel/);
        tempDialogPage.close();
    });

    it('should create and save Temps', () => {
        tempComponentsPage.clickOnCreateButton();
        tempDialogPage.setNameInput('name');
        expect(tempDialogPage.getNameInput()).toMatch('name');
        tempDialogPage.setAgeInput('5');
        expect(tempDialogPage.getAgeInput()).toMatch('5');
        tempDialogPage.save();
        expect(tempDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TempComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-temp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TempDialogPage {
    modalTitle = element(by.css('h4#myTempLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    ageInput = element(by.css('input#field_age'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setAgeInput = function (age) {
        this.ageInput.sendKeys(age);
    }

    getAgeInput = function () {
        return this.ageInput.getAttribute('value');
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
