import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {
  guestName = '';
  currentEvent: any = {};
  eventId: any;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventInfo();
  }

  async eventInfo() {
    this.currentEvent = await (
      await this.eventService.getEventDetail(this.eventId)
    ).data();
  }
  
  addGuest(guestName: string) {
    this.eventService
      .addGuest(guestName, this.eventId, this.currentEvent.price)
      .then(() => {
        this.guestName = '';
        this.eventInfo();
      })
  }
}
