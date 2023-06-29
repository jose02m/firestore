import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth, public router: Router) { }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error.message)
    })
  }

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error.message)
    })
  }

  recoverUserPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email).then(() => {
      window.alert("Mensaje enviado a su correo.")
    }).catch((error) => {
      console.log(error)
    })
  }

  logOutUser() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('')
    })
  }

  getUser() {
    let user = this.auth.currentUser;
    return user;
  }
}

