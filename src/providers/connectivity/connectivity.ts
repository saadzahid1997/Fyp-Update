import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Network, Connection } from '@ionic-native/network';
declare var connection:any;
/*
  Generated class for the ConnectivityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectivityProvider {

  onDevice: boolean;
  connection:any;
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }

  // isOnline(): boolean {
  //   if(this.onDevice && Network.connection){
  //     return Network.Connection !== Connection.NONE;
  //   } else {
  //     return navigator.onLine; 
  //   }
  // }

  // isOffline(): boolean {
  //   if(this.onDevice && Network.connection){
  //     return Network.connection === Connection.NONE;
  //   } else {
   //     return !navigator.onLine;   
  //   }
  // }}
}