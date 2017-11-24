import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../Services/validate.service';
import {AuthentificationService} from '../../Services/authentification.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;

    passwordMach: boolean;
    passwordClass: string;

    constructor(private validateService: ValidateService,
        private flashMessages: FlashMessagesService,
        private authentificationService: AuthentificationService,
        private router: Router) {}

    ngOnInit() {}

    userPassWord(ev: any) {
        if (ev.target.value === this.password) {
            this.passwordMach = true;
            this.passwordClass = 'password_mach';
        } else {
            this.passwordMach = false;
            this.passwordClass = 'password_not_mach';
        }
    }

    onRegisterSubmit() {

        const user = {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            password: this.password
        };

        // Required Field
        if (!this.validateService.validateRegister(user)) {
            console.log(user);
            this.flashMessages.show('Merci de remplir tout les champs',
                {cssClass: 'errorInfo', timeout: 3000}
            );
        }else if (!this.validateService.validateEmail(user.email)) {
        // Required correct email
            console.log(user);
            this.flashMessages.show('Veiller entrer un email valide',
                {cssClass: 'errorInfo', timeout: 3000}
            );
        }else if (!this.passwordMach){
        // validate user password
            this.flashMessages.show('Votre mot de passe ne correspond pas',
                {cssClass: 'errorInfo', timeout: 6000}
            );
        }else{
            this.authentificationService.registerUser(user).subscribe(data => {
                // Register user
                console.log(data.status);

                if (data.status === undefined) {
                    this.flashMessages.show('L\'utilisateur ' + data.firstName + ' est créé.',
                        {cssClass: 'successInfo', timeout: 6000});
                    this.router.navigate(['/connexion']);
                } else if (data.status !== undefined) {
                    this.flashMessages.show(data.status + " : " + data.message,
                        {cssClass: 'errorInfo', timeout: 6000});
                    this.router.navigate(['/inscription']);
                } else {
                    this.flashMessages.show('Quelque chose a du mal se passé... merci de refaire l\'opperation.',
                        {cssClass: 'errorInfo', timeout: 6000});
                    this.router.navigate(['/inscription']);
                }
            });
        }
    }
}
