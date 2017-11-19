import {Component, OnInit} from '@angular/core';
import {MessagingService} from '../../Services/messaging/messaging.service';
import {AuthentificationService} from '../../Services/authentification.service';

@Component({
    selector: 'app-messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

    messages: any = [];
    connection: any;
    message: any;
    user: any;

    constructor(private messagingService: MessagingService,
                private authentification: AuthentificationService) {}

    sendMessage() {
        let chatMessage = {
            user: this.user,
            content: this.message
        };
        
        this.messagingService.sendMessage(chatMessage);
        chatMessage = null;
    }

    ngOnInit() {
        this.connection = this.messagingService.getMessages().subscribe(message => {
            this.messages.push(message);
        })
        
        if (this.authentification.loggedIn()){
            this.authentification.getTocken();
            this.user = this.authentification.user;
        }
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }


}
