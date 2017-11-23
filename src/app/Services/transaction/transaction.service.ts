import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthentificationService} from '../authentification.service';
import {Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TransactionService {

    updateTransactionDataSvr: any;
    
    constructor(public authentification: AuthentificationService,
                public http: Http, public router: Router) {}

    // Observable string sources
    private emitChangeSource = new Subject<any>();
    
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
    
    /**
     * Create an instant opperation
     * 
     * @param {Object} transaction 
     */
    CreateTransaction(transaction: any){
        let header = new Headers();
        this.authentification.getTocken();
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
    
    /**
     * Get all scheduled opperations
     */
    getSchedulledOpperations(user_id: string){
        let header = new Headers();
        this.authentification.getTocken();
        header.append('Authorization', this.authentification.authToken);
        header.append('Content-Type', 'Application/json');
        return this.http.get('http://localhost:3000/scheduled_opp/?user_id='+user_id, {headers: header}).map(res => res.json());
    }
    
    /**
     * Find an opperation by Id
     */
    findOneScheduledOpperation(opperationId: string){
        let header = new Headers();
        this.authentification.getTocken();
        header.append('Authorization', this.authentification.authToken);
        header.append('Content-Type', 'Application/json');
        
        return this.http.get('http://localhost:3000/scheduled_opp/' + opperationId, {headers: header}).map(data => {data.json()});
    }
    
    /**
     * Find the account number for a user
     */
    getCoUserAccountNum(coUserId: string){
        let header = new Headers();
        this.authentification.getTocken();
        header.append('Authorization', this.authentification.authToken);
        header.append('Content-Type', 'Application/json');
        
        return this.http.get('http://localhost:3000/users/' + coUserId, {headers: header}).map(userData => {userData.json()});
    }
        
    /**
     * Remove an opperation by Id
     */
    removeOneScheduledOpperation(opperationId: any){
        let header = new Headers();
        this.authentification.getTocken();
        header.append('Authorization', this.authentification.authToken);
        header.append('Content-Type', 'Application/json');
        
        return this.http.delete('http://localhost:3000/scheduled_opp/' + opperationId, {headers: header}).map(data => {data.json()});
    }
}
