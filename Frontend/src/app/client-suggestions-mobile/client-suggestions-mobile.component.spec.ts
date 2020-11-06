import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsMobileComponent } from './client-suggestions-mobile.component';

describe('ClientSuggestionsMobileComponent', () => {
  let component: ClientSuggestionsMobileComponent;
  let fixture: ComponentFixture<ClientSuggestionsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
