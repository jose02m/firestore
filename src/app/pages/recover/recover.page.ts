import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/Auth/auth.service';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  recoverForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
    private as: AuthService,
    private r: Router,
    private ac: AlertController) {

    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit() {
  }

  resetPassword(event: Event): void {
    this.formSubmitted = true;
    event.preventDefault();

    if (this.recoverForm?.valid) {
      const user = this.recoverForm.value;
      this.as.recoverUserPassword(user.email).then(
        async () => {
          const alert = await this.ac.create({
            header: 'Recuperar contraseña',
            message: 'Correo enviado',
            buttons: [{ text: 'Ok', role: 'cancel',
              handler: () => {
              this.r.navigateByUrl('login');
              },
            }],
          });
          await alert.present();
        },
        async (error) => {
          const errorAlert = await this.ac.create({
            header: 'Error al recuperar contraseña',
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await errorAlert.present();
        }
      )
    }
  }
}
