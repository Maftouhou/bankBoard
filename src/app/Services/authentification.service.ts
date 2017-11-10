import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthentificationService {
    authToken: any;
    user: any;
    
    constructor(private http: Http) { 
    }
    
    registerUser(user: any) {
        let header = new Headers();
        header.append('Content-Type', 'Application/json');
        return this.http.post('http://localhost:3000/users/', user, {headers: header}).map(res => res.json());
    }
}
