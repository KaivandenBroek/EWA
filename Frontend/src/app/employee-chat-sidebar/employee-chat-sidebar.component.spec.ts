import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChatSidebarComponent } from './employee-chat-sidebar.component';

describe('EmployeeChatSidebarComponent', () => {
  let component: EmployeeChatSidebarComponent;
  let fixture: ComponentFixture<EmployeeChatSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeChatSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeChatSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
