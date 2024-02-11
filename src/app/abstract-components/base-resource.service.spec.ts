import { faker } from '@faker-js/faker';
import { UserFactory } from './../utils/factory/user-factory';
import { User } from './../utils/interfaces/user';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getRandomHttpError } from '../utils/utils';
import { BaseResourceService } from './base-resource.service';

describe('BaseResourceService', () => {
  let service: BaseResourceService<any>;
  let httpTestingController: HttpTestingController;
  let userReq: TestRequest;
  const url = 'api/path';

  beforeEach(() => {
    const apiPathStub = () => url;
    const converterFnStub = () => (data: any) => data;
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        BaseResourceService,
        { provide: String, useFactory: apiPathStub },
        { provide: Function, useFactory: converterFnStub },
      ]
    });
    service = TestBed.inject(BaseResourceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call method', () => {
      const emptyArray: any[] = [];
      service.getAll().subscribe(resp => {

        expect(resp).toEqual(emptyArray);
      });
      userReq = httpTestingController.expectOne(url);
      userReq.flush(emptyArray);
    });

    it('should call method with response', () => {
      const userArray: User[] = new UserFactory().buildRandomUserList(4);
      service.getAll().subscribe(resp => {
        expect(resp).toEqual(userArray);
      });
      userReq = httpTestingController.expectOne(url);
      userReq.flush(userArray);
    });

    it('should test generic throw error', () => {
      const mockError = getRandomHttpError();
      service.getAll().subscribe({
        error(err) {
          expect(err).toBeTruthy();
        },
      });

      const testReq = httpTestingController.expectOne(url);
      testReq.flush(mockError.errorCode, {
        status: mockError.errorCode,
        statusText: mockError.errorMessage
      });
    });
  });

  describe('getById', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call method with response', () => {
      const user: User = new UserFactory().buildRandomUser();
      const id = faker.number.int();
      service.getById(id).subscribe(resp => {
        expect(resp).toEqual(user);
      });
      userReq = httpTestingController.expectOne(`${url}/${id}`);
      userReq.flush(user);
    });

  });

  describe('create', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call method with response', () => {
      const user: User = new UserFactory().buildRandomUser();
      service.create(user).subscribe(resp => {
        expect(resp).toEqual(user);
      });
      userReq = httpTestingController.expectOne(`${url}`);
      userReq.flush(user);
    });
  });

  describe('update', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call method with response', () => {
      const user: User = new UserFactory().buildRandomUser();
      service.update(user).subscribe(resp => {
        expect(resp).toEqual(user);
      });
      userReq = httpTestingController.expectOne(`${url}/${user.id}`);
      userReq.flush(user);
    });

  });

  describe('delete', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call method with response', () => {
      const id = faker.number.int();
      service.delete(id).subscribe(resp => {
        expect(resp).toBeFalsy();
      });
      userReq = httpTestingController.expectOne(`${url}/${id}`);
      userReq.flush(null);
    });

  });
});
