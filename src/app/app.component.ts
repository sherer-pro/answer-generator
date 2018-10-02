import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GoogleAnalytics} from '@ionic-native/google-analytics';

import {GeneratorPage} from '../pages/generator/generator';
import {AboutPage} from '../pages/about/about';
import {AuthorsPage} from '../pages/authors/authors';


@Component({
    templateUrl: 'app.html',
    providers: [GoogleAnalytics],
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any = GeneratorPage;
    activePage: any = 'Generator';

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private ga: GoogleAnalytics) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
            splashScreen.hide();

            statusBar.hide();
        });

    }

    MenuItems = [
        {title: 'КвадратоГенератор', name: 'Generator', component: GeneratorPage, icon: 'ios-flame'},
        {title: 'Что это такое?', name: 'About', component: AboutPage, icon: 'ios-bonfire'},
        {title: 'Кто это придумал?', name: 'Authors', component: AuthorsPage, icon: 'ios-nutrition'}
    ];

    openPage(p) {
        if (!p) p = {};
        this.navCtrl.setRoot(p.component);
        this.activePage = p.name;
        this.ga.startTrackerWithId('UA-126805248-1')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackView(p.name);
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));
    }


    public checkActivePage(page): boolean {
        return page.name === this.activePage;
    }
}
