import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController,NavParams } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SwingModule } from 'angular2-swing';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { CalendarModule } from "ion2-calendar";
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AgmCoreModule } from '@agm/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from "@angular/fire/storage";
import {HotelService}from'../app/services/hotels.service';
import { FileTransferObject } from '@ionic-native/file-transfer';

import { AngularFireAuth } from '@angular/fire/auth';
import { TripService } from './services/trips.service';
import { ResturantService } from './services/resturant.service';
import { Network } from '@ionic-native/network'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import { hotelReviewService } from './services/hotelReview.service';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';
import { UserService } from './services/user.service';
import {HotelDetailsPage} from '../pages/hotel/hotel-details/hotel-details';
import { roomService } from './services/rooms.service';
import { PlacesService } from './services/places.service';
import { resturantReviewService } from './services/resReview.service';
import { tripMembersService } from './services/tripMembers.service';
import { tripReviewService } from './services/tripReview.service';
import { placeReviewService } from './services/placeReview.service';
//import { NavParams } from 'ionic-angular/navigation/nav-params';

const firebaseAuth = {
  apiKey: "AIzaSyB51DoNQ_es7SyUkIajEjlXFaklFqVR2Ts",
  authDomain: "travel-gb.firebaseapp.com",
  databaseURL: "https://travel-gb.firebaseio.com",
  projectId: "travel-gb",
  storageBucket: "travel-gb.appspot.com",
  messagingSenderId: "108757916007"
};
// By default TranslateLoader will look for translation json files in i18n/
// So change this lool in the src/assets directory.
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SwingModule,
    SuperTabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      menuType: 'overlay'
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE",
      libraries: ["places"]
    }),
    Ionic2RatingModule,
    IonicImageViewerModule,
    CalendarModule,
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClient,
    DataProvider,
    FileTransferObject,
    FormBuilder,
    //AngularFireDatabase,
    AngularFirestore,
     HotelService,
     TripService,
     ResturantService,
     hotelReviewService,
     UserService,
     tripReviewService,
     placeReviewService,
     roomService,
     ReactiveFormsModule,
     FormsModule,
     Geolocation,
     Camera,
    ConnectivityProvider,
    GoogleMapsProvider,
    LocationsProvider,
    PlacesService,
    resturantReviewService ,
    tripMembersService
  ]
})
export class AppModule { }
