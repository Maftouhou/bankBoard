import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../Services/authentification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {AuthGuard} from '../../guard/auth.guard';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

    email: string;
    password: string;

    constructor(private authentification: AuthentificationService,
                private router: Router, public authGuard: AuthGuard,
                private flashMessagesService: FlashMessagesService
                ) { }

    ngOnInit() {
        if (this.authGuard.isLoggedIn()){
            this.router.navigate(['/']);
        }
    }

    onLoginSubmit(){
        const user = {
            email: this.email,
            password: this.password
        };
        
        this.authentification.authenticateUser(user).subscribe(data => {
            console.log(data);
            if(data.success){
                this.authentification.storeUserData(data.token, data.user);
                this.router.navigate(['/']);
            }else{
                this.flashMessagesService.show(data.message, {
                    cssClass: 'alert-danger',
                    timeout: 6000
                });
                
                this.router.navigate(['connexion']);
            }
        });
    }
}
