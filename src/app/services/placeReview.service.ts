
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { firestore } from 'firebase';

@Injectable()
export class placeReviewService {


    // reviewCollection: AngularFirestoreCollection<any>;
    // review: Observable<any>;
    constructor(public afs: AngularFirestore) 
    {
        console.log("Review service instantiated...");
    }
    
    getReviewDetails() 
    {
            return this.afs.collection('place-Review').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    }

    addReviewToPlace(reviewId, placeId) 
    {
        //console.log(`hoteldId: ${hotelId}  |tripId: ${tripId}`);
        return this.afs.collection('places').doc(placeId).set({ 'place-Review': firestore.DocumentReference.bind(reviewId) }, { merge: true });
    }
}   