
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from '../app/shared/interfaces';

declare var io : {
  connect(url: string): Socket;
};

@Injectable()
export class SocketService {

  socket: Socket;
  observer: Observer<any>;
   
  getQuotes() : Observable<any> {
    this.socket = socketIo('http://share-it-server.herokuapp.com');
    this.socket.on('data', (res) => {
      console.log("get data")
      this.observer.next(res.data);
    });

    return this.createObservable();
  }

 sendserver (to,from,pic, name,deletefriend, status) {

  let obj={
    'from' : from,
    'to' : to,
    'pic': pic,
    'name' : name,
    'delete' : deletefriend ? deletefriend : false,
    'confirm' : status === 'true' ? true :false,
    'sent' : status === 'sent' ? true : false,
    'status' : status
  }
    this.socket.emit('storeClientInfo', { friendRequest : obj });
}

connectToSocket(email){
  this.socket.emit('connectWithEmail' , {email:email
  });
}



  createObservable() : Observable<any> {
      return new Observable(observer => {
        this.observer = observer;
      });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}