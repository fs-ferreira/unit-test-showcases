import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyonComponent } from './spyon.component';

describe('SpyonComponent', () => {
  let component: SpyonComponent;
  let fixture: ComponentFixture<SpyonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpyonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isLogged', () => {
    it("should log user when button clicked", () => {
      let isLoggedSpy = spyOn(component, 'isLogged').and.callThrough();
      component.isLogged();

      expect(isLoggedSpy).toHaveBeenCalled();
      expect(component.logged).toBeTrue();
    });
  });

});
