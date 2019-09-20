import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Message } from '../../models/message/message.interface';
import { UserService } from '../../app/services/user.service';
import { MessageService } from '../../app/services/message.service';
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

  constructor(public navCtrl: NavController,public navParams: NavParams, public userSer:UserService,public messageSer:MessageService ){
                
              }
  ngOnInit()
  {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatBoxPage');
  }

}
