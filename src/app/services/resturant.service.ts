import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ResturantService {


    resturantCollection: AngularFirestoreCollection<any>;
    resturant: Observable<any>;
    resturantDetailId : any;
    resturantDetail:any;
    constructor(public afs: AngularFirestore) {
        console.log("Resturant service instantiated...");

    }
    
    getUserResturants(resId)
    {
        return this.afs.collection('resturants').doc(resId).snapshotChanges().pipe(map(data => {
            return {    
                id: data.payload.id, ...data.payload.data()
            }
        }))

    }


    getResturant() {
        return this.afs.collection('resturants').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    }
    showResDetails(resDetailId) {
        return this.afs.collection('resturants').doc(resDetailId).snapshotChanges().pipe(map(data => {
            return {
                id: data.payload.id, data: data.payload.data()
            }
        }))
    }
    setResDetails(resDetail)
    {
        this.resturantDetail = resDetail;
    }

    getResDetails()
    {
        return this.resturantDetail;
    }

    userResturants(userId)
    {
        this.resturantCollection = this.afs.collection('resturants', ref =>
        ref.where('userId', '==', userId)
         );
         return this.resturantCollection.snapshotChanges().pipe(map(res => {
          return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
      }))

    }

}