import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from "firebase/storage";
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConnectorService {
  private firebaseApp?: FirebaseApp = undefined;

  constructor(private authService: AuthService) {}

  getInitializeApp() {
    if (!this.firebaseApp) {
      let loginStatus = this.authService.getLoginStatus();
      if (loginStatus.isLoggedIn) {
        this.firebaseApp = initializeApp(loginStatus.token!);
      }
    }
  }

  getFirestoreInstance(): Firestore {
    this.getInitializeApp();
    return getFirestore(this.firebaseApp!);
  }

  getStorageInstance(): FirebaseStorage {
    this.getInitializeApp();
    return getStorage(this.firebaseApp!);
  }
}
