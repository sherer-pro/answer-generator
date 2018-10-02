import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {SocialSharing} from '@ionic-native/social-sharing';
import {FileOpener} from '@ionic-native/file-opener';
import {GoogleAnalytics} from '@ionic-native/google-analytics';

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

    getData() {
        const $this = this;

        function randInt(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }

        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad('0' + str, max) : str;
        }

        if (this.toggleComment) {
            const loader = this.loadingCtrl.create({
                content: 'Жди, мы выбираем лучший черный...'
            });

            const toastText = this.toastCtrl.create({
                message: 'Не могу получить файл. Сорян :(',
                duration: 3000
            });

            loader.present();


            let result = {};

            let xhr = new XMLHttpRequest();
            let params = '&&number=1';
            xhr.open('GET', 'https://fish-text.ru/get?' + params, true);


            xhr.onload = function () {
                let resultObj = JSON.parse(this.responseText);
                if (resultObj.status === 'success') {
                    result = {
                        status: 'success',
                        text: resultObj.text
                    };
                    $this.messageData.comment = result;
                    loader.dismiss();
                    $this.readyGenerator = true;
                    $this.messageDataText = true;
                } else {
                    toastText.present();
                    loader.dismiss();
                    $this.messageDataText = false;
                }
            };

            xhr.onerror = function () {
                result = {
                    status: 'error',
                    text: this.status
                };
                toastText.present();
                loader.dismiss();
                $this.messageDataText = false;

            };

            xhr.send();

        } else {
            $this.messageData.comment = {};
            $this.messageDataText = false;
        }

        if (this.toggleSquare) {

            const toastDir = this.toastCtrl.create({
                message: 'Не могу достучаться до папки. Сорян :(',
                duration: 3000
            });
            const toastDirCreate = this.toastCtrl.create({
                message: 'Не могу создать временную папку. Сорян :(',
                duration: 3000
            });
            const toastFile = this.toastCtrl.create({
                message: 'Не могу достучаться до файла. Сорян :(',
                duration: 3000
            });

            const getImage = function () {

                let filename = pad(randInt(1, 15), 2) + '.png';
                const ROOT_DIRECTORY = $this.file.cacheDirectory;
                const downloadFolderName = 'tempDownload';

                $this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
                    .then((entries) => {
                        $this.file.copyFile($this.file.applicationDirectory + 'www/assets/squares/', filename, ROOT_DIRECTORY + downloadFolderName + '//', filename)
                            .then((entries) => {
                                $this.messageData.image = ROOT_DIRECTORY + downloadFolderName + '/' + filename;

                                $this.file.readAsDataURL(ROOT_DIRECTORY + downloadFolderName + '/', filename).then(dataURL => {
                                    $this.imageURL = dataURL
                                });

                                $this.readyGenerator = true;
                                $this.messageDataImage = true;
                            })
                            .catch((error) => {
                                toastFile.present();
                                $this.messageDataImage = false;
                            });
                    })
                    .catch((error) => {
                        toastDirCreate.present();
                        $this.messageDataImage = false;
                    });
            };

            this.file.checkDir(this.file.applicationDirectory, './squares/')
                .then((entries) => getImage())
                .catch((error) => {
                    toastDir.present();
                    $this.messageDataImage = false;
                });
        } else {
            $this.messageData.image = '';
            $this.imageURL = '';
            $this.messageDataImage = false;
        }
    }

    shareMessage() {
        this.ga.startTrackerWithId('UA-126805248-1')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackEvent('engagement','share');
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));

        const toastShare = this.toastCtrl.create({
            message: 'Не получается расшарить. Сорян :(',
            duration: 3000
        });

        if (this.messageData.comment.status === 'success' || this.messageData.image !== '') {
            this.socialSharing.share(this.messageData.comment.text, '', this.messageData.image, '#alikimovichsblacksquares')
                .then((entries) => {
                })
                .catch((error) => toastShare.present());
        }
    }
}
