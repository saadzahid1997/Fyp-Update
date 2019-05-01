import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class PlacesService {


    resturantCollection: AngularFirestoreCollection<any>;
    place: Observable<any>;
    placeDetailId : any;
    placeDetail: any;
    constructor(public afs: AngularFirestore) {
        console.log("Places service instantiated...");

    }
    
    getPlaces() {
        return this.afs.collection('places').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    }
    showPlacesDetails(placeDetailId) {
        return this.afs.collection('places').doc(placeDetailId).snapshotChanges().pipe(map(data => {
            return {
                id: data.payload.id, data: data.payload.data()
            }
        }))
    }

    setPlaceDetails(placeDetail)
    {
        this.placeDetail = placeDetail;
    }

    getPlaceDetails()
    {
        return this.placeDetail;
    }
}