import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  AlertController
} from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../../app/services/user.service';
import { MyApp } from '../../../app/app.component';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  @ViewChild('username') user;
  @ViewChild('userpass') pass;
  userList: any = [];
  userSessionList: any = [];
  signInForm: any;
  userSessionName: any;
  uFName: any;

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  x: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private fire: AngularFireAuth,
    public alertCtrl: AlertController,
    public _user: UserService,
    public afs: AngularFirestore,
    public app: MyApp
  ) {
    this.menuCtrl.enable(false); // Disable SideMenu
  }

  ngOnInit() {
    this.formValidation();
    this._user.user$.subscribe(user => {
      console.log(user);

      if (user) this.navCtrl.setRoot('HomePage');
    });
  }

  formValidation() {
    this.signInForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.pattern(this.emailPattern),
          Validators.required
        ])
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  alert(message: string) {
    this.alertCtrl
      .create({
        title: 'Alert',
        subTitle: message,
        buttons: ['OK']
      })
      .present();
  }

  doLogin() {
    this._user
      .signInWithEmailAndPassword(
        this.signInForm.email,
        this.signInForm.password
      )
      .then(user => {
        console.log(user);
        this.navCtrl.setRoot('HomePage');
      });
    // this._user
    //   .getUsers(this.signInForm.email, this.signInForm.password)
    //   .subscribe(
    //     item => {
    //       this.userList = item;
    //       if (this.userList.length > 0) {
    //         let userData = this.userList[0].data;
    //         this.app.user = userData;
    //         this.navCtrl.setRoot('HomePage', { userData });
    //       } else {
    //         this.alert('Username or password incorrect!');
    //       }
    //     },
    //     error => {
    //       console.log(error.statusText);
    //     }
    //   );
    // this.fire.auth
    //   .signInWithEmailAndPassword(this.user.value, this.pass.value)
    //   .then(() => {

    //       this.navCtrl.setRoot('HomePage');

    //     })

    //   .catch(error => {
    //     this.alert(error.message);
    //   });
    // console.log(this.user.value);
    // console.log(this.pass.value);
    //userName = this.user.value

    //this.navCtrl.push('MyApp',{userName})
    // console.log('In the sign in page');
    // console.log(userName);
  }

  goToForgetPasswordPage() {
    this.navCtrl.setRoot('ForgetPasswordPage');
  }

  goToSignUpPage() {
    this.navCtrl.setRoot('SignUpPage');
  }

  logInWithFacebook() {
    this._user.facebookSignIn().then(() => {
      this.navCtrl.setRoot('HomePage');
    });
    //this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }

  logInWithGoogle() {
    this._user.googleSignin().then(() => {
      this.navCtrl.setRoot('HomePage');
    });
    //this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logInWithTwitter() {}
}
