import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {GeneratorPage} from '../pages/generator/generator';


@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any = GeneratorPage;
    activePage: any = 'Generator';

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
            splashScreen.hide();

            statusBar.hide();
        });

    }
}
