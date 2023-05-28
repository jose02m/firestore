import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createSongForm: FormGroup;

  constructor(public lc: LoadingController, public ac: AlertController, public fs: FirestoreService, public r: Router, public fb: FormBuilder) {
    this.createSongForm = fb.group({
      songName: ['', Validators.required],
      artistName: ['', Validators.required],
      albumName: ['', Validators.required],
      songDescription: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  async createSong() {
    const loading = await this.lc.create();
    this.fs.createSong(this.createSongForm.value).then(
      () => {
        loading.dismiss().then(() => {
          this.r.navigateByUrl('/song/list');
        })
      },
      (error) => { console.error(error) }
    )
    return await loading.present();
  }
}
