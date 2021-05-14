import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import {MyMessage} from '../../model/MyMessage';
import {ServiceSurveillance} from '../../service/surveillance/service-surveillance';
const SERVER_URL = 'http://localhost:8888';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private socket;
  listusersconnected: string[] = [];
  mymessage: MyMessage = new MyMessage();
  myData: any;
  messages: MyMessage[]=[];
  sender: string;
  receiver: string;
  boolnotif:boolean=false;

  constructor(private ss: ServiceSurveillance) { }

  ngOnInit(): void {
  }

  entername() {
    this.socket = socketIo(SERVER_URL);
    this.socket.emit('user_connected', this.mymessage.from);
    this.socket.on('user_connected', (data: string[]) => this.listusersconnected = data);
    this.socket.on('new',(so : any , msg: MyMessage)=>{
      msg.boolto=false;
      this.messages.push(msg);
    });
    this.sender=this.mymessage.from;

  }

  userSelected(cell) {
    this.mymessage.to = cell;
    this.socket.emit('selectedto',cell);
    this.receiver=this.mymessage.to;
    /*this.ss.getMessages(this.mymessage.from,this.mymessage.to).subscribe(next=>
      console.log(next)
    );*/
  }

  sendMessage() {
    this.socket.emit('send_message', this.mymessage);
    this.mymessage.boolform=true;
   this.messages.push(this.mymessage);
    //this.ss.postMessage(this.mymessage).subscribe();
   // this.socket.on("getallmessage" , (messages : MyMessage[])=> console.log(messages));
    let mymessage1 : MyMessage=new MyMessage();
    this.mymessage=mymessage1;
    this.mymessage.to=this.receiver;
    this.mymessage.from=this.sender;
    this.boolnotif=true;
  }

}
