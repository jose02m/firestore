import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { RecordingService } from 'src/app/services/data/recording.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  public updateRecordingForm: FormGroup;
  recording: any = {};
  recordingId: any;

  constructor(public lc: LoadingController,
    public ac: AlertController,
    public fs: RecordingService,
    public r: Router,
    public fb: FormBuilder,
    public tc: ToastController,
    public activatedR: ActivatedRoute) {
    this.updateRecordingForm = fb.group({
      nameRedording: ['', Validators.required],
      type_of_melody: ['', Validators.required],
      number_of_cabins: ['', Validators.required],
      owner: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.recordingId = this.activatedR.snapshot.paramMap.get('id');
    this.recordingInfo();
  }

  async recordingInfo() {
    this.recording = (await this.fs.getRecordingDetail(this.recordingId)).data();

    this.updateRecordingForm.patchValue({
      nameRedording: this.recording.nameRedording,
      type_of_melody: this.recording.type_of_melody,
      number_of_cabins: this.recording.number_of_cabins,
      owner: this.recording.owner,
    });
  }

  async updateRecording() {
    const loading = await this.lc.create();
    this.fs.updateRecording(this.recordingId, this.updateRecordingForm.value).then(
      () => {
        loading.dismiss().then(() => {
          this.r.navigateByUrl(`/recording/list/`);
        })
      }, 
      (error) => { console.error(error) }
    );
    return await loading.present();
  }

}
