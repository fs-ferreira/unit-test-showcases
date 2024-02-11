import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HandleEventComponent } from './handle-event.component';

describe('HandleEventComponent', () => {
  let component: HandleEventComponent;
  let fixture: ComponentFixture<HandleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandleEventComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HandleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define emoji when button clicked', () => {
    const spy = spyOn(component, 'onClick').and.callThrough();
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(title.textContent).toBe('👨‍🎓');
    expect(spy).toHaveBeenCalled();
  });

});
