import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.page.html',
  styleUrls: ['./list-event.page.scss'],
})
export class ListEventPage implements OnInit {
  eventList: any = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    console.log(typeof this.eventList);
    this.eventService.getEventList().subscribe((events) => {
      this.eventList = events;
    });
  }
}
