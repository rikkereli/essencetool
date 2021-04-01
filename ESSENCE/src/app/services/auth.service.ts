import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as messages from '../assets/messages';
import { auth } from 'firebase/app';
import * as routes from '../assets/routes';
import { User } from '../model/user';
import * as ids from '../assets/vars';

@Injectable({
  providedIn: 'root'
})

// Handles sign-in with username and password, sign-up with username and password, reset password, email verification, route protection using canActivate auth guard method
export class AuthService {
  userData: any; // Saved logged in user data
  constructor(
    public firestore: AngularFirestore, // Inject Firestore service
    public firestoreAuth: AngularFireAuth, // Inject Firestore auth service
    public router: Router, // The application router
    public ngZone: NgZone // NgZone service to remove outside scope warning!?!?
  ) { 
    // Saves the user data in local storage when logging in and setting up null when logging out
    this.firestoreAuth.authState.subscribe(user => {
      // If login successful
      if (user) {
        this.userData = user; 
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        // I am just following a tutorial. I should figure out why we use ngZone
        this.ngZone.run(() => {
        // When signed in, navigate to dashboard
        this.router.navigate([routes.dashboard]);
      });
      }
      // When logged out/ login not sucessful
      else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  updateName(name: string) {
    this.firestoreAuth.currentUser.then(user => user.updateProfile({displayName: name}));
  }
  // Sign in with email/password
  SignIn(email, password) {
    return this.firestoreAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.SetUserData(result.user);

    }).catch((error) => {
      window.alert(error.message)
    })
  }

  SignUp(email,password) {
    return this.firestoreAuth.createUserWithEmailAndPassword(email,password)
    .then((result) => {
      this.SendVerificationMail();
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message)})
  }
  // Send an email verification when new user has signed up
  SendVerificationMail() {
    // Get current user. When retrieved, send email verification and navigate to verify page 
    this.firestoreAuth.currentUser
    .then((currentUser) => {
      currentUser.sendEmailVerification()
      .then(() => this.router.navigate([routes.verifyemail]));
    })
  }
  // Reset the password
  ForgotPassword(passwordResetEmail) {
    return this.firestoreAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      window.alert(messages.passwordResetMessage);
    }).catch((error) => {
      window.alert(error)
    })
  }
  // Returns true when a user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false);
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider())
  }
  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider())
  }
  AuthLogin(provider) {
    return this.firestoreAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate([routes.dashboard]);
      })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc('users/${user.uid}');
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL, 
      emailVerified: user.emailVerified
    }
    // Update userEmail in diagramReferencelist so always up to date
    this.firestore.collection(ids.connectedDiagramsCollection).doc(user.uid).set({email:user.email});
    return userRef.set(userData, {merge: true})
  }

  SignOut() {
    return this.firestoreAuth.signOut().then(()=> {
      localStorage.removeItem('user');
      this.router.navigate([routes.signin]);
    })
  }
}
