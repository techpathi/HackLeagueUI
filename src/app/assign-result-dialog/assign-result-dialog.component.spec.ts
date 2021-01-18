import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignResultDialogComponent } from './assign-result-dialog.component';

describe('AssignResultDialogComponent', () => {
  let component: AssignResultDialogComponent;
  let fixture: ComponentFixture<AssignResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignResultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
