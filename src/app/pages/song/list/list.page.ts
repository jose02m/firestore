import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/data/firestore.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  songList: any = [];

  constructor(public fs: FirestoreService, public r: Router) { }

  ngOnInit(){
    this.fs.getSongs().subscribe((songs) => this.songList = songs)
  }
}
