import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthentificationService} from '../Services/authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authentification: AuthentificationService,
        private router: Router) {}

    canActivate() {
        if (this.authentification.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/connexion']);
            return false;
        }
    }

    isLoggedIn() {
        if (this.authentification.loggedIn()) {
            if (this.router.url === '/connexion') {
                return true;
            }else{
                return false;
            }
        }
    }
}
