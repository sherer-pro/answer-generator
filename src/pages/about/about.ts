import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {GeneratorPage} from "../generator/generator";

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    providers: [GoogleAnalytics],
})
export class AboutPage {

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public modalCtrl: ModalController,
        private ga: GoogleAnalytics
    ) {
    }

    goToGenerator() {
        this.navCtrl.setRoot(GeneratorPage);
        this.ga.startTrackerWithId('UA-126805248-1')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackView('Generator');
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));

    }
}
