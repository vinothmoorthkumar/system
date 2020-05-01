import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  currentQuestion: any;
  audio:any;
  questions =
    {
      'q1': {
        id:1,
        message: 'I ve been asked to make sure your system is ready for a Doxy.me call. Shall we get started?',
        answer: ['yes'],
        type: 'bot'
      },
      'q2': {
        id:2,
        message: "Alrighty, let's start by testing your speakers. Click Play!",
        answer: ['Play'],
        type: 'bot'
      },
      'q3': {
        id:3,
        message: "Do you hear the sound I'm playing?",
        answer: ['Yes', 'No'],
        type: 'bot'
      },
      'q4': {
        id:4,
        message:"Okay, now let's check your microphone and webcam.", 
        type: 'bot',
        answer: ['Okay']
      }
    };
  chat = []
  constructor() {
  }
  ngOnInit() {
    this.currentQuestion = this.questions['q1']
    this.chat.push(this.currentQuestion);
  }

  playAudio(){
    this.audio = new Audio();
    this.audio.src = "/static/sound.mp3";
    this.audio.load();
    this.audio.play();
  }

  stopAudio(){
    this.audio.pause();
  }

  check(ans) {
    console.log('checkeing', ans)
    switch (this.currentQuestion.id) {
      case 1: {
        this.chat.push({message:ans, type:'user'});
        this.currentQuestion = this.questions['q2']
        this.chat.push(this.currentQuestion);
        this.playAudio();
        break;
      }
      case 2: {
        this.chat.push({message:ans, type:'user'});
        this.currentQuestion = this.questions['q3']
        this.chat.push(this.currentQuestion);
        break;
      }
      case 3: {
        this.stopAudio();
        this.chat.push({message:ans, type:'user'});
        if(ans=='Yes'){
          this.chat.push({message:'Super 😊! That means you will hear your provider.', type: 'bot',answer: []});
          this.currentQuestion = this.questions['q4']
          this.chat.push(this.currentQuestion);
        }else{
          this.chat.push({message:'Unfortunately, a call is not possible unless your speakers are working 😩 Please get some speakers and try again', type:'bot', answer: 'Quit'});
        }

        break;
      }
      default: {
        console.log('default', this.currentQuestion.id) 
        break;
      }
    }
  }

}
