import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserFactory } from '../../utils/factory/user-factory';

import { InputOutputComponent } from './input-output.component';

describe('InputOutputComponent', () => {
  let component: InputOutputComponent;
  let fixture: ComponentFixture<InputOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputOutputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recieve user on init', () => {
    const mockUser = new UserFactory().buildRandomUser();
    component.user = mockUser;

    expect(component.user).toBe(mockUser);
  });

  describe('onUserEmit', () => {
    it('should emit message when click on button', () => {
      const spy = spyOn(component.userMessage, 'emit');

      const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();

      expect(spy).toHaveBeenCalled();
    });
  });

});
