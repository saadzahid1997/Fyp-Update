import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { firestore } from 'firebase';

@Injectable()
export class tripMembersService {


    memberCollection: AngularFirestoreCollection<any>;
    //review: Observable<any>;
    constructor(public afs: AngularFirestore) 
    {
        console.log("Members service instantiated...");
    }
    
    getMembersDetails(tripId) 
    {
        this.memberCollection = this.afs.collection('trip-Members', ref =>
        ref.where('tripId', '==', tripId)
      );
      return this.memberCollection.snapshotChanges().pipe(map(res => {
          return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
      }))

    }

}