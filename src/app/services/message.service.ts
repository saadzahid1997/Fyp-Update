import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { firestore } from 'firebase';

@Injectable()
export class MessageService {


    messageCollection: AngularFirestoreCollection<any>;
    //trips: Observable<any>;
    constructor(public afs: AngularFirestore) 
    {
        console.log("Message service instantiated...");
    }

    getPeople(receiverId)
    {
        this.messageCollection = this.afs.collection('message', ref =>
        ref.where('receiverId', '==',receiverId)
        );
         return this.messageCollection.snapshotChanges().pipe(map(res => {
          return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
      }))
    }

    getMessage(receiverId ,senderId )
    {
        console.log(senderId);
        this.messageCollection = this.afs.collection('message', ref =>
        ref.where('senderId', '==',senderId) && ref.where('receiverId', '==', receiverId)
        
        );
         return this.messageCollection.snapshotChanges().pipe(map(res => {
          return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
      }))

    }
         
}