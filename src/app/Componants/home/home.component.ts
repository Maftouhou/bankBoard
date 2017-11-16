import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private authentification: AuthentificationService,
            private router: Router,
            private flashMessagesService: FlashMessagesService
            ) { }

    ngOnInit() {
        
    }

}
