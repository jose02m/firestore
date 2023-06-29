import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
    private as: AuthService,
    private r: Router,
    private ac: AlertController) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() {
  }

  async loginUser(event: Event): Promise<void> {
    this.formSubmitted = true;
    event.preventDefault();

    if (this.loginForm?.valid) {
      const user = this.loginForm.value;
      this.as.loginUser(user.email, user.password).then(
        () => {
          this.r.navigateByUrl('home');
        },
        async (error) => {
          const alert = await this.ac.create({
            header: 'Error de inicio de sesión',
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await alert.present();
        }
      )
    }
  }

}
