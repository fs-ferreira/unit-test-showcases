import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FixProblemsComponent } from './fix-problems.component';


describe('FixProblemsComponent', () => {
  let component: FixProblemsComponent;
  let fixture: ComponentFixture<FixProblemsComponent>;
  let dialog: MatDialog

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixProblemsComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FixProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.inject(MatDialog)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    it('should method has been called', () => {
      const button:HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement
      const spy = spyOn(dialog, 'open').and.callThrough();

      button.click();
      fixture.detectChanges()

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
});
