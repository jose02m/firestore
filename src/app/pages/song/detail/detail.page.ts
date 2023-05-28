import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import Song from 'src/app/song';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  song: any = {};
  songId: any;

  constructor(private fs: FirestoreService,
    private acRoute: ActivatedRoute,
    public ac: AlertController,
    public router: Router,
    public tc: ToastController) { }

  async ngOnInit() {
    this.songId = this.acRoute.snapshot.paramMap.get('id');
    await this.songInfo();
  }

  async songInfo() {
    this.song = (await this.fs.getSongDetail(this.songId)).data();
    this.song.id = this.songId;
  }

  async deleteSong(song: Song) {
    const alert = await this.ac.create({
      header: 'Confirmar eliminación',
      message: "¿Desea eliminar esta canción?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
            console.log("delete",this.song)
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.fs.deleteSong(song);
            this.router.navigateByUrl('/song/list');
            this.mostrarToast()
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast() {
    const toast = this.tc.create({
      message: "¡Canción eliminada!",
      duration: 2000,
      icon: 'thumbs-up',
    });
    (await toast).present();
  }
}
