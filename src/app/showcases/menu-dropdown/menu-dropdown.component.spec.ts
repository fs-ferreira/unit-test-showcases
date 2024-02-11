import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { faker } from '@faker-js/faker';

import { MenuDropdownComponent } from './menu-dropdown.component';

describe('MenuDropdownComponent', () => {
  let component: MenuDropdownComponent;
  let fixture: ComponentFixture<MenuDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDropdownComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Menu" label in button', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.dropdown-toggle')).nativeElement;
    const label = faker.word.sample();

    component.label = label;

    fixture.detectChanges();
    expect(button.textContent?.trim()).toBe(label);
  });

  describe('toggleDropdown', () => {
    it("should display block on .dropdown-menu when isOpen is true", () => {
      const button = fixture.debugElement.query(By.css('.dropdown-toggle')).nativeElement;
      const menu = fixture.nativeElement.querySelector('.dropdown-menu');

      const spy = spyOn(component, 'toggleDropdown').and.callThrough();

      button.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(component.isOpen).toBeTrue();
      expect(menu.classList.contains('show')).toBeTrue();
    });
  });

  describe('onItemSelected', () => {
    beforeEach(() => {
      component.items = [
        { label: faker.word.sample(), value: faker.string.numeric(4) },
        { label: faker.word.sample(), value: faker.string.numeric(4) }
      ];
      const button = fixture.debugElement.query(By.css('.dropdown-toggle')).nativeElement;

      button.click();
      fixture.detectChanges();
    });
    
    it('should select item correctly by click on it', () => {
      const menuItems = fixture.nativeElement.querySelectorAll('.dropdown-item');
      expect(menuItems.length).toBe(2);
    });

    it('should trigger "selected" event when select menu item', () => {
      const menuItems = fixture.nativeElement.querySelectorAll('.dropdown-item');
      const spy = spyOn(component.selected,'emit')

      const firstItem = component.items[0];
      menuItems[0].click();

      expect(spy).toHaveBeenCalledOnceWith(firstItem.value)
    });
  });

});
