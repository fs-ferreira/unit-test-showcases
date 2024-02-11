import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { faker } from '@faker-js/faker';
import { HttpService } from '../service/http.service';

import { FormLoginComponent } from './form-login.component';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let httpService: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLoginComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpService = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test if button is disabled when form is invalid', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-login')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should test if button is enabled when form is valid', () => {
    component.form.patchValue({
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-login')).nativeElement;
    expect(button.disabled).toBeFalsy();
  });

  describe('isValidForm', () => {
    it('should return form is invalid', () => {
      const result = component.isValidForm();

      expect(result).toBeFalse();
    });

    it('should return form is valid', () => {
      component.form.patchValue({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
      const result = component.isValidForm();

      expect(result).toBeTrue();
    });
  });

  describe('getValueControl', () => {
    it('should test if retun null', () => {
      expect(component.getValueControl(component.form, 'email')).toBeFalsy();
    });

    it('should test if retun value', () => {
      component.form.patchValue({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
      expect(component.getValueControl(component.form, 'email')).toBeTruthy();
    });
  });

  describe('createPayload', () => {
    it('should return empty paylod', () => {
      const result: {
        email: string | null,
        password: string | null;
      } = {
        email: null,
        password: null
      };
      expect(component.createPayload()).toEqual(result);
    });

    it('should return paylod with non null form values', () => {
      const emailValue = faker.internet.email();
      const passwordValue = faker.internet.password();
      component.form.patchValue({
        email: emailValue,
        password: passwordValue
      });
      const result = {
        email: emailValue,
        password: passwordValue,
      };
      expect(component.createPayload()).toEqual(result);
    });
  });

  describe('login', () => {
    it('should not call http.login when form is invalid', () => {
      const spy = spyOn(httpService, 'login');
      component.login();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call http.login when form is invalid', () => {
      const spy = spyOn(httpService, 'login').and.callThrough();
      component.form.patchValue({
        email: faker.internet.email(),
        password: faker.internet.password()
      });

      component.login();

      expect(spy).toHaveBeenCalled();
    });
  });
});
