import { Component, OnInit } from '@angular/core';
import { BrowserMediaDevice } from "./web.component";
let browserMediaDevices = new BrowserMediaDevice();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  currentQuestion: any;
  audio: any;
  thankyou = false;
  questions =
    {
      'q1': {
        id: 1,
        message: 'I ve been asked to make sure your system is ready for a diagnostic. Shall we get started?',
        answer: ['yes'],
        type: 'bot'
      },
      'q2': {
        id: 2,
        message: "Alrighty, let's start by testing your speakers. Click Play!",
        answer: ['Play'],
        type: 'bot'
      },
      'q3': {
        id: 3,
        message: "Do you hear the sound I'm playing?",
        answer: ['Yes', 'No'],
        type: 'bot'
      },
      'q4': {
        id: 4,
        message: "Okay, now let's check your microphone and webcam.",
        type: 'bot',
        answer: ['Okay']
      },
      'q5': {
        id: 5,
        message: "I'll need your permission to use your microphone and webcam. When prompted, click Allow. 🙏",
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

  checkvideo () {
    return new Promise(resolve => {
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
            audio: true
          },
          function(localMediaStream) {
            resolve('Ok great, it looks like we can now access your microphone and camera!');
          },
          function(err) {
            resolve('The following error occurred when trying to use webcam and microphone: ' + err)
          }
        );
      } 
      else {
        resolve('Sorry, your browser does not support webcam')
      }
    });
  }

  playAudio() {
    this.audio = new Audio();
    this.audio.src = "/static/sound.mp3";
    this.audio.load();
    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
  }

  check(ans) {
    console.log('checkeing', ans)
    switch (this.currentQuestion.id) {
      case 1: {
        this.chat.push({ message: ans, type: 'user' });
        this.currentQuestion = this.questions['q2']
        this.chat.push(this.currentQuestion);
        break;
      }
      case 2: {
        this.playAudio();
        this.chat.push({ message: ans, type: 'user' });
        this.currentQuestion = this.questions['q3']
        this.chat.push(this.currentQuestion);
        break;
      }
      case 3: {
        this.stopAudio();
        this.chat.push({ message: ans, type: 'user' });
        if (ans == 'Yes') {
          this.chat.push({ message: 'Super 😊! That means you will hear your provider.', type: 'bot', answer: [] });
          this.currentQuestion = this.questions['q4']
          this.chat.push(this.currentQuestion);
        } else {
          this.currentQuestion ={ message: 'Unfortunately, a call is not possible unless your speakers are working 😩 Please get some speakers and try again', type: 'bot', answer: ['Quit'] }
          this.chat.push(this.currentQuestion);
        }
        break;
      }
      case 4: {
        this.chat.push({ message: ans, type: 'user' });
        this.currentQuestion = this.questions['q5']
        this.chat.push(this.currentQuestion);
        break;
      }
      case 5: {
        this.checkvideo().then((value) => {
          console.log('value',value)
          let question = { id:6, message: value, type: 'bot', answer: ['Quit'] }
          this.currentQuestion = question
          this.chat.push(question);
        });
        break;
      }
      default: {
        console.log('thank you')
        this.thankyou= true;
        break;
      }
    }
  }

}
