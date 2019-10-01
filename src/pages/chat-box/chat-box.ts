import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Message } from '../../models/message/message.interface';
import { UserService } from '../../app/services/user.service';
import { MessageService } from '../../app/services/message.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { convertUrlToSegments } from 'ionic-angular/umd/navigation/url-serializer';
/**
 * Generated class for the ChatBoxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-box',
  templateUrl: 'chat-box.html',
})
export class ChatBoxPage implements OnInit{
  snederId:any;
  uId:any;
  uName:any;
  chatCollection:any;
  replyCollection:any;
  peopleCollection:any =[];
  x:any;
  messageRef$:AngularFirestoreCollection<any>;  
  messageInterface = {} as Message;
  receiver: any;
  receiverId: any;
  nullify :any;
  sent: boolean;
  reply: boolean;
  uData:any;
  sentCollection:any;
  //replyCollection:any;
  constructor(public navCtrl: NavController,public navParams: NavParams, public userSer:UserService,public messageSer:MessageService, public database:AngularFirestore ){
                this.messageRef$ = this.database.collection('message');
              }
              
  ngOnInit()
  {
    //this.chatCollection = this.nullify ;
    console.log(this.chatCollection);
    console.log('ionViewDidLoad ChatBoxPage');
    this.x=0;
    this.receiverId = this.navParams.data.snederId;
    console.log(this.snederId);
    console.log(this.receiverId);
      this.userSer.getChatUser(this.receiverId).subscribe(item =>{
        this.uData = item;
        console.log(this.uData);
      })
      this.userSer.user$.subscribe(user =>{
      this.uId = user.uid;
      this.uName = user.displayName;
      
    this.messageSer.getMessage().subscribe(item =>{
      
      console.log(item);
      //this.chatCollection = [];
      console.log(this.chatCollection);
      this.chatCollection = item;
      this.x = 0;
      for(let i = 0; i < this.chatCollection.length; i++)
        {
          if(this.chatCollection[i].data.receiverId == this.receiverId && this.chatCollection[i].data.senderId == this.uId || this.chatCollection[i].data.receiverId == this.uId && this.chatCollection[i].data.senderId == this.receiverId )
            {
              console.log(this.chatCollection[i].data.receiverId);
              console.log(this.receiverId);
              console.log(this.chatCollection[i].data.senderId);
              console.log(this.uId)
              console.log(this.chatCollection[i]);
              console.log('In the Segment');
              this.peopleCollection[this.x] = this.chatCollection[i];
              
              if(this.chatCollection[i].data.receiverId == this.receiverId && this.chatCollection[i].data.senderId == this.uId)
                {
                  console.log(this.chatCollection[i]);
                   this.reply = true;
                   this.sent = false;
                  console.log(this.reply);
                  //return this.reply;
                  //this.replyCollection[i] = this.chatCollection[i]
                  console.log(this.replyCollection);

                }
              else
                {
                  console.log(this.chatCollection[i]);
                   this.sent = true;
                  console.log(this.sent);
                  this.reply = false;
                  //return this.sent;
                  //this.sentCollection[i] = this.chatCollection[i];
                  console.log(this.sentCollection);
                }  
                console.log(this.peopleCollection);
                this.x++;
            }
            
            //this.x = this.x + 1;
        }
      console.log(this.peopleCollection);
      this.chatCollection = this.peopleCollection;
      console.log(this.chatCollection);
      
    });
    // this.messageSer.getReply(this.receiverId, this.uId).subscribe(item =>{
    //   this.replyCollection = item;
    //   console.log(this.replyCollection);
    // });  
    });
  }
  ionViewDidLoad() {
    
  }

  sendMessage()
  {
    
    this.messageRef$.add({
      senderId: this.messageInterface.senderID = this.uId ,
      receiverId : this.messageInterface.receiverID = this.receiverId,
      messageBody : this.messageInterface.message,
      time: firebase.database.ServerValue.TIMESTAMP
    });
    
  }

  dismiss()
  {
    this.navCtrl.setRoot('MessagePage');
  }
}
