import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyOnPropertyComponent } from './spy-on-property.component';

describe('SpyOnPropertyComponent', () => {
  let component: SpyOnPropertyComponent;
  let fixture: ComponentFixture<SpyOnPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpyOnPropertyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpyOnPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('message', () => {
    it('should return the initial message on property', () => {
      const message = 'Olá, Mundo!';
      spyOnProperty(component, 'message', 'get').and.callThrough();
      expect(component.message).toBe(message);
    });
  });

});
