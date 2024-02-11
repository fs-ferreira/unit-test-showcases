import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';

import { GuardGuard } from './guard.guard';

describe('GuardGuard', () => {
  let guard: GuardGuard;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/login' };
  const routerMock: any = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    });
    guard = TestBed.inject(GuardGuard);
    localStorage.removeItem('token')
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect user for login page when not authorized', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/login'])
  });

  it('should authorize user when token is avaliable', () => {
    localStorage.setItem('token', faker.string.alphanumeric(10))
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

});
