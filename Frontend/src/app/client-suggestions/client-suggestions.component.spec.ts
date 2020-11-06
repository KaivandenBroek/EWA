import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsComponent } from './client-suggestions.component';

describe('ClientSuggestionsComponent', () => {
  let component: ClientSuggestionsComponent;
  let fixture: ComponentFixture<ClientSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
