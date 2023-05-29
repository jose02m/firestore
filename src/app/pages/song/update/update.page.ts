import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { FirestoreService } from 'src/app/services/data/firestore.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  public updateSongForm: FormGroup;
  song: any = {};
  songId: any;

  constructor(
    public lc: LoadingController,
    public ac: AlertController,
    public fs: FirestoreService,
    public r: Router,
    public fb: FormBuilder,
    private ar: ActivatedRoute,) {
    this.updateSongForm = fb.group({
      songName: ['', Validators.required],
      artistName: ['', Validators.required],
      albumName: ['', Validators.required],
      songDescription: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.songId = this.ar.snapshot.paramMap.get('id');
    this.songInfo();
  }
  
  async songInfo() {
    this.song = (await this.fs.getSongDetail(this.songId)).data();

    this.updateSongForm.patchValue({
      songName: this.song.songName,
      artistName: this.song.artistName,
      albumName: this.song.albumName,
      songDescription: this.song.songDescription,
    });
  }

  async updateSong() {
    const loading = await this.lc.create();

    this.fs.updateSong(this.songId, this.updateSongForm.value).then(
      () => {
        loading.dismiss().then(() => {
          this.r.navigateByUrl('/song/list');
        })
      }, 
      (error) => { console.error(error) }
    );
    return await loading.present();
  }
}
