import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SingerService } from 'src/app/services/data/singer.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  artists: Observable<any>;

  constructor(private singerService: SingerService) {
    this.artists = this.singerService.getSingers();
  }

  ngOnInit() {
  }
}
