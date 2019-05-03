/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 *
 * This File Represent Profile Page Component
 * File path - '../../src/pages/profile/profile'
 */

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AngularFireStorage } from '@angular/fire/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  user;
  // Segment Options
  options: any = 'User Info';
  userForm: FormGroup;
  User: boolean = false;
  isUploading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _user: UserService,
    private _formBuilder: FormBuilder,
    public storage: AngularFireStorage
  ) {
    this.userForm = this._formBuilder.group({
      userFName: ['', Validators.required],
      userLName: ['', Validators.required],
      phone: ['', Validators.required],
      userPass: ['', Validators.required],
      fileURL: ['', Validators.required]
    });
    this._user.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.userFName.setValue(this.user.userFName);
      this.userLName.setValue(this.user.userLName);
      this.phone.setValue(this.user.phone);
      this.userPass.setValue(this.user.userPass);
      this.fileURL.setValue(this.user.fileURL);
    });
  }

  handler(e) {
    this.isUploading = true;
    const file = e.target.files[0];
    const filePath = `users/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.isUploading = false;
            this.user.fileURL = url;
            this.fileURL.setValue(url);
          });
        })
      )
      .subscribe();
  }

  updateUserProfile() {
    this._user.updateUserProfile(this.userForm.value).then(res => {
      console.log(res);
      alert('Profile successfully updated!!');
    });
  }

  get userFName() {
    return this.userForm.get('userFName');
  }
  get userLName() {
    return this.userForm.get('userLName');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get userPass() {
    return this.userForm.get('userPass');
  }
  get fileURL() {
    return this.userForm.get('fileURL');
  }
}
