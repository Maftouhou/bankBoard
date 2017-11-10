import { Injectable } from '@angular/core';
import {User} from '../models/userModel';

@Injectable()
export class ValidateService {
    
    constructor() { }
    
    validateRegister(user: any) {
        if (user.firstName === undefined || user.lastName === undefined 
            || user.phone === undefined || user.email === undefined || user.password === undefined){
            console.log(user);
            return false;
        }else{ return true; }
    }
    
    validateEmail(email: string){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(email)
    }
}
