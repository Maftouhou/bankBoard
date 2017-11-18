import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthentificationService} from '../authentification.service';

@Injectable()
export class TransactionService {

    constructor(public authentification: AuthentificationService,
                public http: Http) {}

    CreateTransaction(transaction: any){
        this.authentification.getTocken();
        let header = new Headers();
        header.append('Authorization', this.authentification.authToken);
        header.append('Content-Type', 'Application/json');
        
        if(transaction.schedulled_opperation === false){
           
            delete transaction.dateOpperation;
            delete transaction.schedulled_opperation;
            return this.http.post('http://localhost:3000/instant_opp/', transaction, {headers: header}).map(res => res.json());
        }else{
            
            delete transaction.schedulled_opperation;
            return this.http.post('http://localhost:3000/scheduled_opp/', transaction, {headers: header}).map(res => res.json());
        }

        
    }
}
