import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class MessagingService {

    // private url: string = 'http://localhost:4000';
    // private url: string = 'http://35.176.233.209';
    // private url: string = 'http://35.177.117.225:4000/';
    private url: string = 'http://localhost:4000/';
    private socket: any;

    sendMessage(message: any) {
        this.socket.emit('add-message', message);
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', (data: any) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

}
