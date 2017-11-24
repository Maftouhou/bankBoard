import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../Services/authentification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {AuthGuard} from '../../guard/auth.guard';
import {ValidateService} from '../../Services/validate.service';


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
                private flashMessagesService: FlashMessagesService,
                private validateService: ValidateService
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
        
        if (!this.validateService.validateConnexion(user)){
            // Validating all the field
            this.flashMessagesService.show('Veillez remplir tout les champs', {
                cssClass: 'errorInfo', timeout: 6000 
            });
        }else if (!this.validateService.validateEmail(user.email)) {
            // Required correct email
            this.flashMessagesService.show('Veiller entrer un email valide',
                {cssClass: 'errorInfo', timeout: 3000}
            );
        }else{
            this.authentification.authenticateUser(user).subscribe(data => {
                console.log(data);
                if (data.success) {
                    this.authentification.storeUserData(data.token, data.user);
                    this.router.navigate(['/']);
                } else {
                    this.flashMessagesService.show(data.message, {
                        cssClass: 'errorInfo',
                        timeout: 6000
                    });

                    this.router.navigate(['connexion']);
                }
            });
        }
    }
}
