import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';

@Component({
    selector: 'page-generator',
    templateUrl: 'generator.html'
})
export class GeneratorPage {

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController
    ) {
    }

    presentLoading() {
        const loader = this.loadingCtrl.create({
            content: "Жди, мы выбираем лучший черный...",
            duration: 3000
        });
        loader.present();
   }

}
