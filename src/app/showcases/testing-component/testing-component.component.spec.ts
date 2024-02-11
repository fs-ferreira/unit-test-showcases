import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TestingComponentComponent } from './testing-component.component';

describe('TestingComponentComponent', () => {
  let component: TestingComponentComponent;
  let fixture: ComponentFixture<TestingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should acces DOM Element with debugElement.query()', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toBe('Trabalhando com debugElement.query() e nativeElement.querySelector()');
  });

  it('should acces DOM Element with debugElement.querySelector()', () => {
    const paragraph = fixture.debugElement.nativeElement.querySelector('p')
    expect(paragraph.textContent).toBe('esta aprendendo com curso de testes unitarios?');
  });

  it('should have bgColor "green" on btn-yes', () => {
    const yesButton = fixture.debugElement.query(By.css('.btn-yes')).nativeElement;
    expect(yesButton.style.backgroundColor).toBe('green');
  });

  it('should have bgColor "green" on btn-yes', () => {
    const yesButton = fixture.debugElement.nativeElement.querySelector('.btn-no')
    expect(yesButton.style.backgroundColor).toBe('red');
  });

});
