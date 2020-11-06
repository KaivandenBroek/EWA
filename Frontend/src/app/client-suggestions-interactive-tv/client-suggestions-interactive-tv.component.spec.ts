import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInteractiveTvComponent } from './client-suggestions-interactive-tv.component';

describe('ClientSuggestionsInteractiveTvComponent', () => {
  let component: ClientSuggestionsInteractiveTvComponent;
  let fixture: ComponentFixture<ClientSuggestionsInteractiveTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInteractiveTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInteractiveTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
