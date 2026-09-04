import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {   // ← Capital "S" matches import
  private client: Client;
  private stockUpdateSubject = new Subject<any>();

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: (msg) => console.log(msg),
    });
  }

  connect() {
    if (!this.client.active) {
      this.client.activate();
      this.client.onConnect = () => {
        console.log('WebSocket connected');
        this.client.subscribe('/topic/stock-updates', (message: Message) => {
          const data = JSON.parse(message.body);
          this.stockUpdateSubject.next(data);
        });
      };
    }
  }

  disconnect() {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  getStockUpdates(): Observable<any> {
    return this.stockUpdateSubject.asObservable();
  }
}

// import { Injectable } from '@angular/core';
// import { Client, Message } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { Observable, Subject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class WebSocketService {   // ← MUST be "WebSocketService" (capital S)
//   private client: Client;
//   private stockUpdateSubject = new Subject<any>();

//   constructor() {
//     this.client = new Client({
//       webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
//       reconnectDelay: 5000,
//       debug: (msg) => console.log(msg),
//     });
//   }

//   connect() {
//     if (!this.client.active) {
//       this.client.activate();
//       this.client.onConnect = () => {
//         console.log('WebSocket connected');
//         this.client.subscribe('/topic/stock-updates', (message: Message) => {
//           const data = JSON.parse(message.body);
//           this.stockUpdateSubject.next(data);
//         });
//       };
//     }
//   }

//   disconnect() {
//     if (this.client.active) {
//       this.client.deactivate();
//     }
//   }

//   getStockUpdates(): Observable<any> {
//     return this.stockUpdateSubject.asObservable();
//   }
// }