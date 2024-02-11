import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MyServiceService } from '../service/my-service.service';
import { UserFactory } from '../../utils/factory/user-factory';

import { MockServiceComponent } from './mock-service.component';

describe('MockServiceComponent', () => {
  let component: MockServiceComponent;
  let fixture: ComponentFixture<MockServiceComponent>;
  let service: MyServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockServiceComponent],
      imports: [
        HttpClientTestingModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MockServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(MyServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should call service when button click', () => {
      const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      const spy = spyOn(service, 'getUsers').and.returnValues(of(new UserFactory().buildRandomUserList(2)));

      button.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });
});
