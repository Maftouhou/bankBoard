import {Component, OnInit} from '@angular/core';
import {MessagingService} from '../../Services/messaging/messaging.service';

@Component({
    selector: 'app-messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

    messages: any = [];
    connection: any;
    message: any;

    constructor(private messagingService: MessagingService) {}

    sendMessage() {
        this.messagingService.sendMessage(this.message);
        this.message = '';
    }

    ngOnInit() {
        this.connection = this.messagingService.getMessages().subscribe(message => {
            this.messages.push(message);
        })
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }


}
