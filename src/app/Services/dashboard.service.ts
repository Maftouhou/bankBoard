import {Injectable} from '@angular/core';
import {AuthentificationService} from './authentification.service';
import {Http, Headers} from '@angular/http';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class DashboardService {

    constructor(public authentificationService: AuthentificationService, 
                public router: Router, public http: Http) {}
    
    getAllTransaction(user_id: string){
        if(this.authentificationService.loggedIn()){
            let header = new Headers();
            header.append('Authorization', this.authentificationService.authToken);
            header.append('Content-Type', 'Application/json');
            return this.http.post('http://localhost:3000/instant_opp/', {headers: header}).map(res => res.json());
        }else{
            this.router.navigate(['/connexion']);
        }
    }

}
