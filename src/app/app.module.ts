import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {GeneratorPage} from '../pages/generator/generator';
import {AboutPage} from '../pages/about/about';
import {ResultPage} from '../pages/result/result';


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        GeneratorPage,
        AboutPage,
        ResultPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {mode: 'md', menuType: 'push'})
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        GeneratorPage,
        AboutPage,
        ResultPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
