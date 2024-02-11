import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HoverFocusDirective } from '../../hover-focus.directive';

import { TestingDirectiveComponent } from './testing-directive.component';

describe('TestingDirectiveComponent', () => {
  let component: TestingDirectiveComponent;
  let fixture: ComponentFixture<TestingDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestingDirectiveComponent,
        HoverFocusDirective
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestingDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test if bgColor has been changed on mouse hover', () => {
    const title = fixture.debugElement.query(By.css('h1'))

    title.triggerEventHandler('mouseover', null)
    fixture.detectChanges();
    expect(title.nativeElement.style.backgroundColor).toBe('blue')
  })

  it('should test if bgColor has been changed on mouse hover', () => {
    const title = fixture.debugElement.query(By.css('h1'))

    title.triggerEventHandler('mouseout', null)
    fixture.detectChanges();
    expect(title.nativeElement.style.backgroundColor).toBe('inherit')
  })
});
