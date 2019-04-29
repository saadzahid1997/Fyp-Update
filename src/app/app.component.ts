/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 *
 * File path - '../../src/app/app.component'
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, MenuController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { DataProvider } from '../providers/data/data';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { UserService } from './services/user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  userRef: any;
  // Root Page of Application
  rootPage: any = 'LandingPage';

  // Side Menu Pages
  pages: any;

  // Selected Side Menu
  selectedMenu: any;

  user;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public translateService: TranslateService,
    public dataProvider: DataProvider,
    public userSer: UserService
  ) {
    this.initializeApp();

    // Set Default Language
    translateService.setDefaultLang('en');

    // Get List of Side Menu Data
    this.getSideMenuData();
  }

  ngOnInit() {
    
    this.userSer.user$.subscribe(user => {
      this.user = user;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Get Menu Data from Service of `DataProvider`
   * You get `DataProvider` Service at - 'src/providers/data/data';
   */
  getSideMenuData() {
    
    this.pages = this.dataProvider.getSideMenus();
  }

  /**
   * Open Selected Page
   * @param component
   * @param index
   */
  openPage(component, index) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (component) {
      this.nav.setRoot(component);
      this.menuCtrl.close();
    } else {
      if (this.selectedMenu) {
        this.selectedMenu = 0;
      } else {
        this.selectedMenu = index;
      }
    }
  }

  // Logout
  logout() {
    this.userSer.signOut().then(() => {
      this.nav.setRoot('LandingPage');
    });
  }
}
