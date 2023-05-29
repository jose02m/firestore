import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecordingService } from 'src/app/services/data/recording.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  recordingList: any = [];

  constructor(public rs: RecordingService, public route: Router) { }

  ngOnInit() {
    this.rs.getRecordings().subscribe(recordings => this.recordingList = recordings)
  }

}
