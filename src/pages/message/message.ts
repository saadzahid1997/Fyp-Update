import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Message  } from '../../models/message/message.interface';
import { UserService }  from '../../app/services/user.service';
import { MessageService } from '../../app/services/message.service';
import { convertUrlToSegments } from 'ionic-angular/umd/navigation/url-serializer';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage implements OnInit{
  userCollection:any =[];
  receiverId:any;
  messageRef$:AngularFirestoreCollection<any>
  messageInterface = {} as Message;
  userName:any;
  userId:any;
  messageCollection:any;
  peopleCollection:any
  chat:any=[];
  users:any=[];
  chatCollection:any = [];
  subItem:any=[];
  i:any;
  x: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database : AngularFirestore, 
              public userSer:UserService, public messageSer:MessageService, public modalCtrl:ModalController)
    {
       this.messageRef$ = this.database.collection('message');

    }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad MessagePage');
  }
  ngOnInit()
  {
    this.receiverId = this.navParams.data.userId;
    this.userSer.user$.subscribe(user =>{
      this.userId = user.uid;
      this.userName = user.displayName;
    
    this.messageSer.getPeople(this.userId).subscribe(items =>{
      console.log(items);
      this.peopleCollection = items;
      this.messageCollection = items;
      console.log(this.peopleCollection);
      console.log(this.peopleCollection.senderId);
      console.log(this.users);
      console.log(this.peopleCollection.length);
      this.x = 0;
      for(let i = 0; i < this.peopleCollection.length; i++)
        {
          
          this.userSer.getChatUser(this.peopleCollection[i].data.senderId).subscribe(user =>{
            //console.log(user[i].data.uid)
             
            console.log(this.peopleCollection[i].data.senderId);  
            console.log(user)
              this.chatCollection[i] = user;
            
          
            console.log(this.chatCollection[i]);
                 this.userCollection[this.x] = this.chatCollection[i][0];
                this.x++;
                console.log(this.userCollection[this.x]);
            
            
            
            
            // while(this.peopleCollection[i].uid != this.peopleCollection[i].uid); 
          });
          
        }
              this.chatCollection = this.userCollection;
              //this.peopleCollection = this.chatCollection;  
              console.log(this.chatCollection);
              //this.chatCollection = this.peopleCollection;
              console.log(this.peopleCollection);
        
       
    });

    });
  }
    // this.userSer.getHotels().subscribe(items =>{
    //   this.users = items;
    
    // for(let i = 0; i<items.length; i++)
    // {  
      
    //   console.log(this.i);
    //   this.userSer.getChatUser(this.peopleCollection[this.i].data.senderId).subscribe(items =>{
    //   this.chat[this.i] = items;
    
    //   // console.log(this.chat);
    //   // this.chatCollection[this.i] = this.chat;
    //    console.log(this.chatCollection);  
    // })
    //  console.log(this.peopleCollection[this.i].data.senderId);
    //  console.log(i);
    //  console.log(this.users[i].data.uid);
    //  console.log(this.peopleCollection[1].data.senderId);   
    
    // console.log(i);
    // console.log(this.users);
    //  if(this.peopleCollection[i].data.senderId == this.users[i].data.uid)
    //   {
    //     this.chat[i] = this.peopleCollection[i];
    //     console.log(this.chat[i]);
    //   }
    // }     
    // });
     
    
    //   console.log(this.chat); 
    //   this.peopleCollection = this.chat;
    //   console.log(this.peopleCollection);
       
  
    // this.messageSer.getMessage(this.receiverId, this.userId).subscribe(items =>{
    //   this.messageCollection = items;
    //   console.log(this.messageCollection);
    // })
  // });
  // }
  // sendMessage()
  // {
  //   console.log(this.messageInterface.message);
  //   this.messageRef$.add({
  //     senderId: this.messageInterface.senderID = this.userId ,
  //     receiverId : this.messageInterface.receiverID = this.receiverId,
  //     messageBody : this.messageInterface.message,
  //   });
  // }
  
  chatBox(snederId)
  {
    this.modalCtrl.create('ChatBoxPage',{snederId}).present();
  }

  searchUser()
  {
    this.modalCtrl.create('SearchPeoplePage').present();
  }

  dismiss() 
  {
    this.navCtrl.setRoot('HomePage');
  }
}
