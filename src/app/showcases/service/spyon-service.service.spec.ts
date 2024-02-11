import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { of } from 'rxjs';
import { UserFactory } from '../../utils/factory/user-factory';

import { SpyonServiceService } from './spyon-service.service';

describe('SpyonServiceService', () => {
  let service: SpyonServiceService;
  let httpTestingController: HttpTestingController;
  let userReq: TestRequest;

  const factory = new UserFactory();
  const logger = jasmine.createSpy('log');
  const status = jasmine.createSpyObj('service', ['name', 'age', 'email']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SpyonServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return an user list with spy', () => {
      const response = factory.buildRandomUserList(2);
      spyOn(service, 'getUsers').and.returnValue(of(response));

      service.getUsers().subscribe(data => {
        expect(data).toEqual(response);
        expect(data.length).toEqual(2);
      });
    });

    it('should return an user list with flush', () => {
      const response = factory.buildRandomUserList(2);
      service.getUsers().subscribe(data => {
        expect(data).toEqual(response);
        expect(data.length).toEqual(2);
      });

      userReq = httpTestingController.expectOne('http://localhost:3000/users');
      userReq.flush(response);
      httpTestingController.verify();
    });
  });

  it('should create method with createSpy', () => {
    const message = faker.word.words(3);
    logger(message);

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledOnceWith(message);
  });

  it('should create method with createSpyObj', () => {
    const mockUser = factory.buildRandomUser();
    status.name(mockUser.name);
    status.email(mockUser.email);
    status.age(mockUser.age);

    expect(status.name).toHaveBeenCalled();
    expect(status.name).toHaveBeenCalledWith(mockUser.name);
    expect(status.email).toHaveBeenCalled();
    expect(status.email).toHaveBeenCalledWith(mockUser.email);
    expect(status.age).toHaveBeenCalled();
    expect(status.age).toHaveBeenCalledWith(mockUser.age);
  });
});
