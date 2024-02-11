import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComponent } from './request.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpService } from '../service/http.service';
import { UserFactory } from '../../utils/factory/user-factory';
import { faker } from '@faker-js/faker';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;
  let service: HttpService;

  const usersList = new UserFactory().buildRandomUserList(4)
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RequestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(HttpService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should call service', () => {
      const spy = spyOn(service, 'getUsers').and.returnValues(of(usersList));
      component.getUsers()
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getUserWithHeaders', () => {
    it('should call service', () => {
      const spy = spyOn(service, 'getUserWithHeaders').and.returnValues(of(usersList));
      component.getUsersWithHeaders()
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getUsersById', () => {
    it('should call service', () => {
      const spy = spyOn(service, 'getUsersById').and.returnValues(of(usersList[0]));
      component.getUsersById(faker.number.int())
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('postUsers', () => {
    it('should call service', () => {
      const spy = spyOn(service, 'postUser').and.returnValues(of(usersList[0]));
      component.postUsers()
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('putUsers', () => {
    it('should call service', () => {
      const spy = spyOn(service, 'putUser').and.returnValues(of(usersList[0]));
      component.putUsers(faker.number.int())
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should call service', () => {
      const spy = spyOn(service, 'deleteUser').and.returnValues(of(usersList[0]));
      component.deleteUser(faker.number.int())
      expect(spy).toHaveBeenCalled();
    });
  });
});
