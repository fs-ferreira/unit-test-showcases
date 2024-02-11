import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoDetectChangeComponent } from './auto-detect-change.component';

describe('AutoDetectChangeComponent', () => {
  let component: AutoDetectChangeComponent;
  let fixture: ComponentFixture<AutoDetectChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoDetectChangeComponent],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AutoDetectChangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define emoji on button click', () => {
    const spy = spyOn(component, 'defineEmoji').and.callThrough();
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.click();

    expect(title.textContent).toBe('👨‍🎓');
    expect(spy).toHaveBeenCalled();
  });
});
