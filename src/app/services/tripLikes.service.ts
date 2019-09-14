import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { firestore } from 'firebase';

@Injectable()
export class TripLikeService {


    tripCollection: AngularFirestoreCollection<any>;
    trips: Observable<any>;
    constructor(public afs: AngularFirestore) 
    {
        console.log("Trip Likes service instantiated...");
    }
    getTripLikeDetails() 
    {
            return this.afs.collection('trip-Likes').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    }

    
}