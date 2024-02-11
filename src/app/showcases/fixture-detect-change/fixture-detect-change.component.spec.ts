import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FixtureDetectChangeComponent } from './fixture-detect-change.component';

describe('FixtureDetectChangeComponent', () => {
  let component: FixtureDetectChangeComponent;
  let fixture: ComponentFixture<FixtureDetectChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixtureDetectChangeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FixtureDetectChangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render title property', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).not.toBe('Aprendendo a usar fixture.detectChange()');
  });

  it('should render title property', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    fixture.detectChanges();
    expect(title.textContent).toBe('Aprendendo a usar fixture.detectChange()');
  });
});
