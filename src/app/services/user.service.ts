import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators/map';

import { auth, firestore } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}

@Injectable()
export class UserService {
  user$: Observable<User>;
  currentUser: any;

  userName: any;

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.currentUser = user;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }
  getHotels() {
    return this.afs
      .collection('users')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.data, data: data.payload.doc.data() };
          });
        })
      );
  }

  getUsers(userName, password) {
    return this.afs
      .collection('users', ref =>
        ref.where('email', '==', userName).where('userPass', '==', password)
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { data: data.payload.doc.data() };
          });
        })
      );
  }

  signInWithEmailAndPassword(email, password) {
    console.log(email, password);

    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmailAndPassword(email, password) {
    console.log(email, password);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  registerUserData(user) {
    console.log(user);

    return this.afs
      .collection('users')
      .doc(user.uid)
      .set(user);
  }

  setUserData(userName) {
    this.userName = userName;
  }
  getUserData() {
    return this.userName;
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  updateUserHotel(hotelId) {
    return this.afs
      .collection('users')
      .doc(this.currentUser.uid)
      .update({ hotelIds: firestore.FieldValue.arrayUnion(hotelId) });
  }

  updateUserProfile(user) {
    console.log(user);
    user.displayName = user.userFName + ' ' + user.userLName;
    return this.afs
      .collection('users')
      .doc(this.currentUser.uid)
      .update(user);
  }

  updateUserRestaurant(restaurantId) {
    return this.afs
      .collection('users')
      .doc(this.currentUser.uid)
      .update({ restaurantIds: firestore.FieldValue.arrayUnion(restaurantId) });
  }

  public updateUserData(user) {
    console.log(user);

    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    return await this.afAuth.auth.signOut();
  }
}
