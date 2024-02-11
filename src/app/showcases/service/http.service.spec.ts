import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { UserFactory } from '../../utils/factory/user-factory';
import { getRandomHttpError } from '../../utils/utils';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;
  let url: any;
  const factory = new UserFactory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = 'http://localhost:3000';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test generic throw error', () => {
    const mockError = getRandomHttpError();
    service.getUsers().subscribe({
      error(err) {
        expect(err.status).toBe(mockError.errorCode);
      },
    });

    const testReq = httpTestingController.expectOne(`${url}/users`);
    testReq.flush(mockError.errorCode, {
      status: mockError.errorCode,
      statusText: mockError.errorMessage
    });
    httpTestingController.verify();
  });

  describe("getUsersById", () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should test GET http request with id param', () => {
      const id = faker.number.int({ min: 1, max: 3 });
      const mockUser = factory.buildRandomUser();
      service.getUsersById(id).subscribe(data => {
        expect(data).toEqual(mockUser);
      });

      const testReq = httpTestingController.expectOne(`${url}/users/${id}`);

      expect(testReq.request.method).toBe('GET');
      expect(testReq.request.url).toBe(`${url}/users/${id}`);

      testReq.flush(mockUser);
    });
  });

  describe("getUsers", () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should test GET http request', () => {
      const mockUsers = factory.buildRandomUserList(4);
      service.getUsers().subscribe(data => {
        expect(data).toEqual(mockUsers);
      });
      const testReq = httpTestingController.expectOne(`${url}/users`);

      expect(testReq.request.method).toBe('GET');
      expect(testReq.request.url).toBe(`${url}/users`);

      testReq.flush(mockUsers);
    });
  });

  describe("postUser", () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should test POST http request', () => {
      const mockUser = factory.buildRandomUser();
      service.postUser(mockUser).subscribe(data => {
        expect(data).toEqual(mockUser);
      });
      const testReq = httpTestingController.expectOne(`${url}/users`);

      expect(testReq.request.method).toBe('POST');
      expect(testReq.request.url).toBe(`${url}/users`);
      expect(testReq.request.body).toBe(mockUser);

      testReq.flush(mockUser);
    });
  });

  describe("putUser", () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should test PUT http request', () => {
      const mockUser = factory.buildRandomUser();
      const id = faker.number.int({ min: 1, max: 3 });

      service.putUser(id, mockUser).subscribe(data => {
        expect(data).toEqual(mockUser);
      });
      const testReq = httpTestingController.expectOne(`${url}/users/${id}`);

      expect(testReq.request.method).toBe('PUT');
      expect(testReq.request.url).toBe(`${url}/users/${id}`);
      expect(testReq.request.body).toBe(mockUser);

      testReq.flush(mockUser);
    });
  });

  describe("deleteUser", () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should test DELETE http request', () => {
      const id = faker.number.int({ min: 1, max: 3 });
      service.deleteUser(id).subscribe(data => {
        expect(data).toEqual({});
      });
      const testReq = httpTestingController.expectOne(`${url}/users/${id}`);

      expect(testReq.request.method).toBe('DELETE');
      expect(testReq.request.url).toBe(`${url}/users/${id}`);

      testReq.flush({});
    });
  });

  describe("getUserWithHeaders", () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should test GET http request with Bearer header', () => {
      service.getUserWithHeaders().subscribe();
      const testReq = httpTestingController.expectOne(`${url}/users`);

      expect(testReq.request.method).toBe('GET');
      expect(testReq.request.url).toBe(`${url}/users`);
      expect(testReq.request.headers.has('content-type')).toBeTrue();
      expect(testReq.request.headers.has('Authorization')).toBeTrue();
    });
  });

  describe('isAuthenticated', () => {
    it('should resolve true', async () => {
      service.isAuthenticated().then(resolve => {
        expect(resolve).toEqual(true);
      });
    });
  });

  describe('getUsersWithPromise', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should return a promise', async () => {
      service.getUsersWithPromise();

      const testReq = httpTestingController.expectOne(`${url}/users`);

      expect(testReq.request.method).toBe('GET');
      expect(testReq.request.url).toBe(`${url}/users`);
    });

    it('should return users', (done: DoneFn) => {
      const mockUsers = new UserFactory().buildRandomUserList(3);

      service.getUsersWithPromise().then((users) => {
        expect(users).toEqual(mockUsers);
        done();
      });

      const req = httpTestingController.expectOne(`${service.url}/users`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockUsers);
    });

    it('should handle error', (done: DoneFn) => {
      service.getUsersWithPromise().catch((error) => {
        expect(error).toBeTruthy();
        done();
      });

      const req = httpTestingController.expectOne(`${service.url}/users`);
      const mockError = getRandomHttpError();

      req.flush(mockError.errorCode, {
        status: mockError.errorCode,
        statusText: mockError.errorMessage
      });
    });
  });
});
