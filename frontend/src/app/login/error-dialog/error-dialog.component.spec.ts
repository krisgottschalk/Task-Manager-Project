import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLoginDialogComponent } from './error-dialog.component';

describe('ErrorDialogComponent', () => {
  let component: ErrorLoginDialogComponent;
  let fixture: ComponentFixture<ErrorLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorLoginDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
