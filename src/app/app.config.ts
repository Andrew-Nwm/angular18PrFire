import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-task-19dev',
        appId: '1:853139202383:web:16e6739e7246b6b45a653a',
        storageBucket: 'ng-task-19dev.firebasestorage.app',
        apiKey: 'AIzaSyDt3yBn2b1fpW5mYr76740WRBLCHo3ZI3U',
        authDomain: 'ng-task-19dev.firebaseapp.com',
        messagingSenderId: '853139202383',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
