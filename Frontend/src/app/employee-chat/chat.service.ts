import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string, public dateNow: string) {}
}

@Injectable()
export class ChatService {

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {}

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const displayDate = new Date().toLocaleTimeString('nl-NL');
    const userMessage = new Message(msg, 'user', displayDate);
    this.update(userMessage);
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }
}
