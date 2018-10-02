import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GoogleAnalytics} from '@ionic-native/google-analytics';

@Component({
    selector: 'page-authors',
    templateUrl: 'authors.html',
    providers: [GoogleAnalytics],
})
export class AuthorsPage {

    constructor(public navCtrl: NavController, private ga: GoogleAnalytics) {

    }

    setAnalytics(type) {
        this.ga.startTrackerWithId('UA-126805248-1')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackEvent('engagement', 'link', type);
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));
    };

}
