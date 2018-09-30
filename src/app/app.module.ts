import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {GeneratorPage} from '../pages/generator/generator';
import {AboutPage} from '../pages/about/about';
import {AuthorsPage} from '../pages/authors/authors';


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        GeneratorPage,
        AboutPage,
        AuthorsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {mode: 'md'})
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        GeneratorPage,
        AboutPage,
        AuthorsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
