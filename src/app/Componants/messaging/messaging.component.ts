import {Component, OnInit} from '@angular/core';
import {MessagingService} from '../../Services/messaging/messaging.service';
import {AuthentificationService} from '../../Services/authentification.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

    messages: any = [];
    connection: any;
    inputMessage: string;
    user: any;

    constructor(private messagingService: MessagingService,
                private authentification: AuthentificationService, 
                private flashMessages: FlashMessagesService) {}

    sendMessage() {
        if (this.inputMessage === '' || this.inputMessage === null || this.inputMessage === undefined){
            this.flashMessages.show('veillez saisir un message sur le champs', 
                {cssClass: 'successInfo', timeout: 3000});
        }else {
            let chatMessage = {
                user: this.user,
                content: this.inputMessage
            };

            this.messagingService.sendMessage(chatMessage);
            chatMessage = null;
            this.inputMessage = '';
        }
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
