import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAudios(){
    return this.firestore.collection('audios').snapshotChanges();
  }

  getCommand(){
    return this.firestore.doc('commands/G0Pp7WvMHzA5RWzpwv76').valueChanges();
  }

  playAudio(){
    return this.firestore.doc('commands/G0Pp7WvMHzA5RWzpwv76')
    .update({
      playing: true
    })
  }

  pauseAudio(){
    return this.firestore.doc('commands/G0Pp7WvMHzA5RWzpwv76')
    .update({
      playing: false
    })
  }
}
