import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-guests-events',
  templateUrl: './guests-events.page.html',
  styleUrls: ['./guests-events.page.scss'],
})
export class GuestsEventsPage implements OnInit {
  eventId: any;
  guestList: any = [];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    console.log(this.eventId)
    this.eventService.getEventGuests(this.eventId).subscribe((guests) => {
      this.guestList = guests;
    });
    console.log(this.guestList)
  }
}
