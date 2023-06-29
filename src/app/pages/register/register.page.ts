import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
    private as: AuthService,
    private r: Router,
    private ac: AlertController) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() {
  }

  async createUser(event: Event): Promise<void> {
    this.formSubmitted = true;
    event.preventDefault();

    if (this.registerForm?.valid) {
      const user = this.registerForm.value;
      this.as.createUser(user.email, user.password).then(
        () => {
          this.r.navigateByUrl('login');
        },
        async (error) => {
          const alert = await this.ac.create({
            header: 'Error de registro',
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await alert.present();
        }
      )
    }
  }
}
