import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateEmployeeComponent } from './admin-create-employee.component';

describe('AdminCreateEmployeeComponent', () => {
  let component: AdminCreateEmployeeComponent;
  let fixture: ComponentFixture<AdminCreateEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
