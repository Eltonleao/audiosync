import { Component } from '@angular/core';
import { element } from 'protractor';

import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  audios = [];

  audio = {
    playing: false,
    name: "Bell1",
    photoURL: "https://cdn.pixabay.com/photo/2017/07/09/20/48/speaker-2488096_960_720.png",
    path: "assets/audio/bell.mp3",
    text: null
  }

  constructor(
    private firestore: FirestoreService
  ) {
    this.command();
  }


  async load(){
    this.firestore.getAudios().subscribe(data=>{
      var array = [];
      data.forEach(element => {
        var audio = element.payload.doc.data();
        array.push(audio);
      });
      this.audios = array;
    });
  }

  command(){
    this.firestore.getCommand().subscribe(data=>{
      console.log(data);
      this.audio.playing = data['playing'];
      this.audio.text = data['text'];
      let elem:any = document.getElementById('audio');
      
      if(data['playing']){
        elem.play();
      } else{
        elem.pause()
      }
    })
  }

  play(){
    this.firestore.playAudio();
  }

  pause(){
    this.firestore.pauseAudio();
  }

}
