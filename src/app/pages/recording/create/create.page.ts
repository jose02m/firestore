import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { RecordingService } from 'src/app/services/data/recording.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createRecordingForm: FormGroup;

  constructor(public lc: LoadingController, 
    public ac: AlertController, 
    public fs: RecordingService, 
    public r: Router, 
    public fb: FormBuilder,
    public tc: ToastController) 
    {
    this.createRecordingForm = fb.group({
      nameRedording: ['', Validators.required],
      type_of_melody: ['', Validators.required],
      number_of_cabins: ['', Validators.required],
      owner: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  async createRecording() {
    const loading = await this.lc.create();
    this.fs.createRecording(this.createRecordingForm.value).then(
      () => {
        loading.dismiss().then(() => {
          this.r.navigateByUrl('/recording/list');
          this.mostrarToast();
        })
      },
      (error) => { console.error(error) }
    )
    return await loading.present();
  }

  async mostrarToast() {
    const toast = this.tc.create({
      message: "¡Recording añadida!",
      duration: 2000,
      icon: 'happy',
    });
    (await toast).present();
  }
}
