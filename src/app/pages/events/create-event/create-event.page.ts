import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  eventName: string = '';
  eventPrice: number = 0;
  eventCost: number = 0;
  eventDate: string = '';

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
  }

  createEvent(
    eventName: string,
    eventPrice: number,
    eventCost: number,
    eventDate: string
  ) {
    if (
      eventName === undefined ||
      eventPrice === undefined ||
      eventCost === undefined ||
      eventDate === undefined
    ) {
      return;
    }
    this.eventService
      .createEvent(eventName, eventPrice, eventCost, eventDate)
      .then(() => {
        this.router.navigateByUrl('/list-event');
      });
  }
}
