import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;
    env: any;
    
    constructor(private http: Http) { 
        this.env = environment;
    }
    
    registerUser(user: any) {
        let header = new Headers();
        header.append('Content-Type', 'Application/json');
        console.log('http://' + this.env.SERVER_ADDR + ':' + this.env.SERVER_PORT);
//        return this.http.post('http://localhost:4000/inscription', user, {headers: header}).map(res => res.json());
        return this.http.post('http://' + this.env.SERVER_ADDR + ':' + this.env.SERVER_PORT + '/inscription', user, {headers: header}).map(res => res.json());
    }
}
