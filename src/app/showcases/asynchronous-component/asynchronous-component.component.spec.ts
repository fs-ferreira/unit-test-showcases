import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpService } from '../service/http.service';
import { UserFactory } from '../../utils/factory/user-factory';

import { AsynchronousComponentComponent } from './asynchronous-component.component';

describe('AsynchronousComponentComponent', () => {
  let component: AsynchronousComponentComponent;
  let fixture: ComponentFixture<AsynchronousComponentComponent>;
  let httpService: HttpService;

  const factory = new UserFactory();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsynchronousComponentComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AsynchronousComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpService = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUsers', () => {

    it('should do request to get users list', () => {
      const usersList = factory.buildRandomUserList(3);
      spyOn(httpService, 'getUsers').and.returnValue(of(usersList));

      component.getUsers();

      expect(component.data).toEqual(usersList);
    });
  });

  describe('getUsersWithPromise', () => {

    it('should do request to get users list', async () => {
      const usersList = factory.buildRandomUserList(3);
      spyOn(httpService, 'getUsersWithPromise').and.returnValue(Promise.resolve(usersList));

      await component.getUsersWithPromise();

      expect(component.dataPromise).toEqual(usersList);
    });
  });

  describe('isAuthenticated', () => {

    it('should log user', (done: DoneFn) => {
      const loggedOut = fixture.debugElement.query(By.css('.logged-out')).nativeElement;
      const spy = spyOn(httpService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

      component.isAuthenticated();

      spy.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges();
        const logged = fixture.debugElement.query(By.css('.logged')).nativeElement;
        expect(logged.textContent).toBe('Logado');
        done();
      });

      expect(loggedOut.textContent).toBe('Deslogado');
    });

    it('should log user whenStable', async () => {
      const loggedOut = fixture.debugElement.query(By.css('.logged-out')).nativeElement;
      spyOn(httpService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

      component.isAuthenticated();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const logged = fixture.debugElement.query(By.css('.logged')).nativeElement;
        expect(logged.textContent).toBe('Logado');
      });

      expect(loggedOut.textContent).toBe('Deslogado');
    });
  });

  describe('defineValue', () => {
    it('should set name property before timeout', () => {
      component.defineValue();
      expect(component.name).toBe('Danilo')
    });

    it('should set name property after timeout', fakeAsync(() => {
      component.defineValue();
      tick(100)
      expect(component.name).toBe('Jessica')
    }));
  });
});
