import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthentificationService} from '../authentification.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SoldService {
    env: any;
    
    constructor(public authentification: AuthentificationService,
                public http: Http) {
        this.env = environment;
    }
    
    getCurentUserInformations(){
        if (this.authentification.loggedIn()){
            this.authentification.getTocken();
            
            let headers = new Headers();
            headers.append('Authorization', this.authentification.authToken);
            headers.append('Content-Type', 'Application/json');
            
            return this.http.get('http://' + this.env.SERVER_ADDR + ':' + this.env.SERVER_PORT + '/users/' + this.authentification.user._id, {headers: headers})
                .map(res => res.json());
        }
    }
}
