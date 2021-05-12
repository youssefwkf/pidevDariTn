import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import {MyMessage} from '../../model/MyMessage';
const SERVER_URL = 'http://localhost:8088';


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

  constructor() { }

  ngOnInit(): void {

  }

  entername() {
    this.socket = socketIo(SERVER_URL);
    this.socket.emit('user_connected', this.mymessage.from);
    this.socket.on('user_connected', (data: string[]) => this.listusersconnected = data);
    this.socket.on('new',(so : any , msg: MyMessage)=>{
      console.log(so);
      this.messages.push(msg);
    });
    this.sender=this.mymessage.from;
  }

  userSelected(cell) {
    this.mymessage.to = cell;
    this.socket.emit('selectedto',cell);
    console.log(cell);
    this.receiver=cell;
  }

  sendMessage() {
    this.socket.emit('send_message', this.mymessage);
    this.messages.push(this.mymessage);
    let mymessage1 : MyMessage=new MyMessage();
    this.mymessage=mymessage1;
    this.mymessage.to=this.receiver;
    this.mymessage.from=this.sender;
  }

}
