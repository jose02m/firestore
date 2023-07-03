import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEventPage } from './list-event.page';

describe('ListEventPage', () => {
  let component: ListEventPage;
  let fixture: ComponentFixture<ListEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
