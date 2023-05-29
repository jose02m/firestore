import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordingService } from 'src/app/services/data/recording.service';
import RecordingStudios from 'src/app/interfaces/recording-studios';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  recording: any = {};
  recordingId: any;

  constructor(private rs: RecordingService,
    private acRoute: ActivatedRoute,
    public ac: AlertController,
    public router: Router,
    public tc: ToastController) { }

  ngOnInit() {
    this.recordingId = this.acRoute.snapshot.paramMap.get('id');
    this.recordingInfo()
  }

  async recordingInfo() {
    this.recording = (await this.rs.getRecordingDetail(this.recordingId)).data();
    this.recording.id = this.recordingId;
  }

  async deleteRecording(recording: RecordingStudios) {
    const alert = await this.ac.create({
      header: 'Confirmar eliminación',
      message: "¿Desea eliminar esta grabación?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.rs.deleteRecording(recording);
            this.router.navigateByUrl('/recording/list');
            this.mostrarToast()
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast() {
    const toast = this.tc.create({
      message: "Recording eliminada!",
      duration: 2000,
      icon: 'thumbs-up',
    });
    (await toast).present();
  }
}
