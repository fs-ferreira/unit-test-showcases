import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserFactory } from '../../utils/factory/user-factory';

import { FixProblemsService } from './fix-problems.service';

describe('FixProblemsService', () => {
  let service: FixProblemsService;
  let httpTestingController: HttpTestingController;
  let url: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FixProblemsService);
    httpTestingController = TestBed.inject(HttpTestingController)
    url = 'http://localhost:3000'
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getUsers", () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should test GET http request', () => {
      const mockUsers = new UserFactory().buildRandomUserList(4);
      service.getUsers().subscribe(data => {
        expect(data).toEqual(mockUsers);
      });
      const testReq = httpTestingController.expectOne(`${url}/users`);

      expect(testReq.request.method).toBe('GET');
      expect(testReq.request.url).toBe(`${url}/users`);

      testReq.flush(mockUsers);
    });
  });
});
