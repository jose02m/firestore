import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestsEventsPage } from './guests-events.page';

describe('GuestsEventsPage', () => {
  let component: GuestsEventsPage;
  let fixture: ComponentFixture<GuestsEventsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuestsEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
