import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {GeneratorPage} from '../pages/generator/generator';
import {AboutPage} from '../pages/about/about';
import {AuthorsPage} from '../pages/authors/authors';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any = GeneratorPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    goToGenerator(params) {
        if (!params) params = {};
        this.navCtrl.setRoot(GeneratorPage);
    }

    goToAbout(params) {
        if (!params) params = {};
        this.navCtrl.setRoot(AboutPage);
    }

    goToAuthors(params) {
        if (!params) params = {};
        this.navCtrl.setRoot(AuthorsPage);
    }
}
