import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
let SocketService = class SocketService {
    getQuotes() {
        this.socket = socketIo('http://share-it-server.herokuapp.com');
        this.socket.on('data', (res) => {
            this.observer.next(res.data);
        });
        return this.createObservable();
    }
    sendserver(to, from, pic, name, deletefriend, status) {
        let obj = {
            'from': from,
            'to': to,
            'pic': pic,
            'name': name,
            'delete': deletefriend ? deletefriend : false,
            'confirm': status === 'true' ? true : false,
            'sent': status === 'sent' ? true : false,
            'status': status
        };
        this.socket.emit('storeClientInfo', { friendRequest: obj });
    }
    connectToSocket(email) {
        console.log(email);
        this.socket.emit('connectWithEmail', { email: email
        });
    }
    disconectFromSocket(email) {
        this.socket.emit('logout', { email });
    }
    createObservable() {
        return new Observable(observer => {
            this.observer = observer;
        });
    }
    handleError(error) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Socket.io server error');
    }
};
SocketService = tslib_1.__decorate([
    Injectable()
], SocketService);
export { SocketService };
//# sourceMappingURL=socket.service.js.map