import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthentificationService} from '../authentification.service';

@Injectable()
export class SoldService {

    constructor(public authentification: AuthentificationService,
                public http: Http) {}
    
    getCurentUserInformations(){
        if (this.authentification.loggedIn()){
            this.authentification.getTocken();
            
            let headers = new Headers();
            headers.append('Authorization', this.authentification.authToken);
            headers.append('Content-Type', 'Application/json');
            
            return this.http.get('http://35.176.233.209/users/' + this.authentification.user._id, {headers: headers})
                .map(res => res.json());
        }
    }
}
