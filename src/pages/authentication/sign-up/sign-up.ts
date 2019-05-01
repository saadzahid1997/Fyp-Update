

import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore'
import { MapsAPILoader } from '@agm/core';
import {User} from '../../../models/user/users.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
//import { google } from '@agm/core/services/google-maps-types';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  @ViewChild ('username')user;
  @ViewChild ('userpass')pass;
  google:any;
  registrationForm: any;

  userModel  =  {} as User;
  
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userRef$: AngularFirestoreCollection<any>
  filesURL = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public menuCtrl: MenuController,
              private fire: AngularFireAuth,
              public alertCtrl:AlertController,
              private database:AngularFirestore,
              public MapsApiLoader:MapsAPILoader,
              public storage:AngularFireStorage) 
                          {
                            this.menuCtrl.enable(false); // Disable SideMenu
                            this.userRef$ = this.database.collection('users');  
                          }
  
  
  ngOnInit() {
    this.formValidation();
  }

  alert(message : string)
    {
      this.alertCtrl.create({
        title : 'Alert',
        subTitle : message,
        buttons: ['OK']
      }).present();
    }
  formValidation() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  doRegistration() {  
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.pass.value)
      .then(() =>{
        this.navCtrl.setRoot('SignInPage');   
      })
      .catch(error =>{
        this.alert(error.message);
      })        
    }
       
  // userLocation()
  //   {
  //     this.MapsApiLoader.load().then(() => {
  //       let nativeHomeInputBox = document.getElementById('userAddress').getElementsByTagName('input')[0];
  //       let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
  //         types : ["geocode"]
  //       });
  //       autocomplete.setComponentRestrictions({ 'country': ['pk'] })
  //       autocomplete.addListener("place_changed", () => {
  //           let place =  google.maps.places.PlaceResult = autocomplete.getPlace();
  //           console.log(place);
  //           this.userModel.userLocationLat = place.geometry.location.lat();
  //           this.userModel.userLocationLng = place.geometry.location.lng();
  //           this.userModel.userAddress = place.formatted_address;
  //           console.log(this.user.userAddress);               
  //       });
  //     });
  //   }
    
    handler(e) {
      const file = e.target.files[0];
  
      
      const filePath = `users/${Date.now()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL() 
            .subscribe(url => {
              this.filesURL.push(url);
              console.log(this.filesURL[0]);
              this.userModel.fileURL = this.filesURL[0]
            })
          })
       )
      .subscribe()
    }
  

    addUser()
    {
      this.userRef$.add({
        // userFName:this.userModel.userFName,
        // userLName:this.userModel.userLName,
        email:this.userModel.userMail,
        userPass:this.userModel.userPass,
        photoURL: this.userModel.fileURL,
        displayName: this.userModel.displayName = this.userModel.userFName.concat(' '+this.userModel.userLName)
      });
    }

  goToLoginPage() {
    this.navCtrl.setRoot('SignInPage');
  }
}
