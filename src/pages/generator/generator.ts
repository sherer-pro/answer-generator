import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {SocialSharing} from '@ionic-native/social-sharing';
import {FileOpener} from '@ionic-native/file-opener';
import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {ResultPage} from "../result/result";
import {AboutPage} from "../about/about";

@Component({
    selector: 'page-generator',
    templateUrl: 'generator.html',
    providers: [File, SocialSharing, FileOpener, GoogleAnalytics],
})
export class GeneratorPage {

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public file: File,
        public toastCtrl: ToastController,
        public socialSharing: SocialSharing,
        public fileOpener: FileOpener,
        public modalCtrl: ModalController,
        private ga: GoogleAnalytics
    ) {
    }

    messageData: any = {
        comment: {},
        image: '',
        imageURL: ''
    };
    public toggleSquare: boolean = true;
    public toggleComment: boolean = true;
    public toggleButton: boolean = true;
    public readyGenerator: boolean = false;
    public messageDataText: boolean = false;
    public messageDataImage: boolean = false;
    public imageURL: any;

    checkButton() {
        this.toggleButton = this.toggleSquare || this.toggleComment;
    }

   goToResult(){
       this.navCtrl.setRoot(ResultPage);
       this.ga.startTrackerWithId('UA-126805248-1')
           .then(() => {
               console.log('Google analytics is ready now');
               this.ga.trackView('Result');
           })
           .catch(e => console.log('Error starting GoogleAnalytics', e));

   }

   goToAbout(){
       this.navCtrl.setRoot(AboutPage);
       this.ga.startTrackerWithId('UA-126805248-1')
           .then(() => {
               console.log('Google analytics is ready now');
               this.ga.trackView('About');
           })
           .catch(e => console.log('Error starting GoogleAnalytics', e));

   }
}
