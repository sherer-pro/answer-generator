import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {SocialSharing} from '@ionic-native/social-sharing';
import {FileOpener} from '@ionic-native/file-opener';

@Component({
    selector: 'page-generator',
    templateUrl: 'generator.html',
    providers: [File, SocialSharing, FileOpener],
})
export class GeneratorPage {

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public file: File,
        public toastCtrl: ToastController,
        public socialSharing: SocialSharing,
        public fileOpener: FileOpener
    ) {
    }

    messageData: any = {
        comment: {},
        image: ''
    };
    public toggleSquare: boolean = true;
    public toggleComment: boolean = true;

    getData() {
        const $this = this;

        if (this.toggleComment) {
            const loader = this.loadingCtrl.create({
                content: "Жди, мы выбираем лучший черный..."
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
                } else {
                    result = {
                        status: 'error',
                        text: resultObj.errorCode
                    };
                    $this.messageData.comment = result;
                    loader.dismiss();
                }
            };

            xhr.onerror = function () {
                result = {
                    status: 'error',
                    text: this.status
                };
                $this.messageData.comment = result;
                loader.dismiss();

            };

            xhr.send();

        }

        if (this.toggleSquare) {
            const toastSquare = this.toastCtrl.create({
                message: 'Не могу достучаться до папки. Сорян :(',
                duration: 3000
            });

            const getImage = function () {
                let filename = '01.jpg';
                const ROOT_DIRECTORY = $this.file.cacheDirectory;
                const downloadFolderName = 'tempDownload';

                $this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
                    .then((entries) => {
                        $this.file.copyFile($this.file.applicationDirectory + "www/assets/squares/", filename, ROOT_DIRECTORY + downloadFolderName + '//', filename)
                            .then((entries) => {
                                $this.messageData.image = ROOT_DIRECTORY + downloadFolderName + "/" + filename;
                            })
                            .catch((error) => {
                                //TODO: обработать
                                alert('error ' + JSON.stringify(error));
                            });
                    })
                    .catch((error) => {
                        //TODO: обработать
                        alert('error ' + JSON.stringify(error));
                    });
                // $this.messageData.image = $this.file.readAsDataURL($this.file.applicationDirectory, 'www/assets/squares/01.jpg');
            };

            this.file.checkDir(this.file.applicationDirectory, './squares/')
                .then((entries) => getImage())
                .catch((error) => toastSquare.present());
        }

        this.formatMessage();
    }

    formatMessage() {
        if(this.messageData.comment.status === 'success'){

        }
        // this.socialSharing.share(this.messageData.comment.text, "", this.messageData.image)
        //     .then((entries) => {
        //         console.log('success ' + JSON.stringify(entries));
        //     })
        //     .catch((error) => {
        //         //TODO: обработать
        //         alert('error ' + JSON.stringify(error));
        //     });
    }
}
