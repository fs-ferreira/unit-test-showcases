import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';

import { TestingRouteComponent } from './testing-route.component';

describe('TestingRouteComponent', () => {
  let component: TestingRouteComponent;
  let fixture: ComponentFixture<TestingRouteComponent>;

  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingRouteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestingRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateUrl', () => {

    it('should navigate to informed url', () => {
      const url = faker.word.sample();
      const spy = spyOn(router, 'navigate');

      component.navigateUrl(url);

      expect(spy).toHaveBeenCalledOnceWith([`/${url}`]);
    });
  });

});
