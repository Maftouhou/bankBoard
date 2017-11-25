import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthentificationService {
    authToken: any;
    user: any;
    
    constructor(private http: Http) { 
    }
    
    registerUser(user: any) {
        let header = new Headers();
        header.append('Content-Type', 'Application/json');
        return this.http.post('http://35.176.233.209/users/', user, {headers: header}).map(res => res.json());
    }
    
    authenticateUser(user: any){
        let header = new Headers();
        header.append('Content-Type', 'Application/json');
        return this.http.post('http://35.176.233.209/auth/', user, {headers: header}).map(res => res.json());
    }
    
    getProfile(){
        this.getTocken();
        let header = new Headers();
        header.append('Authorization', this.authToken);
        header.append('Content-Type', 'Application/json');
        return this.http.get('http://35.176.233.209/users/'+this.user._id, {headers: header}).map(res => res.json());
    }
    
    getTocken(){
        if (localStorage.getItem('id_token')){
            this.authToken = localStorage.getItem('id_token');
        }
        
        if (localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }
    
    loggedIn(){
        return tokenNotExpired('id_token');
    }
    
    storeUserData(token: any, user: any){
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    
    logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
}
