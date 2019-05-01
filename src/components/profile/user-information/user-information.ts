import { Component } from '@angular/core';
//import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreModule,AngularFirestoreDocument}from '@angular/fire/firestore';

@Component({
  selector: 'user-information',
  templateUrl: 'user-information.html'
})
export class UserInformationComponent {

  public updateProfile = false;

  constructor() { }

  profileUpdate() {
    this.updateProfile = true;
  }
}

  