import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';

const CHAT_URL = 'ws://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/CSE';

export interface Message {
  time: string;
  author: string;
  receiver: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  /**
   * In this constructor all the methods of WebsocketService are used to make sure the backend methods are
   * called whenever a new message is sent
   */
  constructor(wsService: WebsocketService) {
    this.messages = wsService.connect(CHAT_URL).map(
      (response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          time: data.time,
          author: data.author,
          receiver: data.receiver,
          message: data.message
        };
      }
    ) as Subject<Message>;
  }
}
