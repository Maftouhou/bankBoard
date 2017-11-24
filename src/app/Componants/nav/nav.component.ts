import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    
    constructor(private authentification: AuthentificationService,
        private router: Router,
        private flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
    }

    onLogoutClick() {
        this.authentification.logout();
        this.flashMessagesService.show('Logout successful', {
            cssClass: 'alert-success',
            timeout: 6000
        });

        this.router.navigate(['connexion']);
        return false;
    }

    getAllUser() {
        this.authentification.getProfile();
    }

}
