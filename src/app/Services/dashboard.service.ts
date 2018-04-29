import {Injectable} from '@angular/core';
import {AuthentificationService} from './authentification.service';
import {Http, Headers} from '@angular/http';
import {Router, CanActivate} from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
    env: any;
    
    constructor(public authentificationService: AuthentificationService,
                public router: Router, public http: Http) {
        this.env = environment;
    }

    getAllTransaction() {
        if (this.authentificationService.loggedIn()) {
            this.authentificationService.getTocken();
            let header = new Headers();
            header.append('Authorization', this.authentificationService.authToken);
            header.append('Content-Type', 'Application/json');

            return {
                transaction: this.http.get('http://' + this.env.SERVER_ADDR + ':' + this.env.SERVER_PORT + '/instant_opp/?userId='+this.authentificationService.user._id, {headers: header}).map(res => res.json()),
                user_infos: this.authentificationService.user
            };
        } else {
            this.router.navigate(['/connexion']);
        }
    }

    getCurentUserFullInfo() {
        if (this.authentificationService.loggedIn()) {
            this.authentificationService.getTocken();
            let header = new Headers();
            header.append('Authorization', this.authentificationService.authToken);
            header.append('Content-Type', 'Application/json');

            return this.http.get('http://' + this.env.SERVER_ADDR + ':' + this.env.SERVER_PORT + '/users/' + this.authentificationService.user._id, {headers: header}).map(res => res.json());
        } else {
            this.router.navigate(['/connexion']);
        }
    }
}

