import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserFactory } from '../../utils/factory/user-factory';
import { User } from '../../utils/interfaces/user';
import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {
  let service: MyServiceService;
  let httpTestingController: HttpTestingController;
  let userReq: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MyServiceService
      ]
    });
    service = TestBed.inject(MyServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should call http empty request', () => {
      const emptyArray: User[] = [];
      service.getUsers().subscribe(resp => {
        expect(resp).toEqual(emptyArray);
      });
      userReq = httpTestingController.expectOne('http://localhost:3000/users');
      userReq.flush(emptyArray);
      httpTestingController.verify();
    });

    it('should call http not empty request', () => {
      const factory = new UserFactory();
      const response = factory.buildRandomUserList(3);
      spyOn(service, 'getUsers').and.returnValue(of(response));

      service.getUsers().subscribe(users => {
        expect(users).toEqual(response);
        expect(users.length).toEqual(3);
      });
    });
  });
});
