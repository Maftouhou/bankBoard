import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class MessagingService {
    env: any;
    // private url: string = 'http://localhost:4000';
    // private url: string = 'http://35.176.233.209';
    // private url: string = 'http://35.177.117.225:4000/';
    // private url: string = 'http://localhost:4000/';
    private socket: any;
    
    constructor() {
        this.env = environment;
    }
    sendMessage(message: any) {
        this.socket.emit('add-message', message);
    }

    getMessages() {
        console.log(this.env.SERVER_ADDR + ':' + this.env.SERVER_PORT);
        let observable = new Observable(observer => {
            // this.socket = io(this.url);
            this.socket = io(this.env.SERVER_ADDR + ':' + this.env.SERVER_PORT);
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
