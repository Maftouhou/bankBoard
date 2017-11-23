import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {SoldService} from '../../Services/sold/sold.service';
import {TransactionService} from '../../Services/transaction/transaction.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-historique-mouvement',
    templateUrl: './historique-mouvement.component.html',
    styleUrls: ['./historique-mouvement.component.css']
})
export class HistoriqueMouvementComponent implements OnInit {

    scheduledOpperations: any;
    
    constructor(public authentification: AuthentificationService,
                public soldService: SoldService, public router: Router,
                public transactionService: TransactionService) {}

    ngOnInit() {
        console.log(this.authentification.user._id);
        this.loadScheduledOpperations(this.authentification.user._id);
    }
    
    @Output() onUpdate = new EventEmitter();
    
    loadScheduledOpperations(user_id: string){
        this.transactionService.getSchedulledOpperations(user_id).subscribe(schedulledOpp => {
            this.scheduledOpperations = schedulledOpp;
        }, err => { console.log(err); });       
    }
    
    /**
     * Cancel opperation that still undone
     */
    cancelOpperation(opperationId: any){
        
        this.transactionService.removeOneScheduledOpperation(opperationId.target.className).subscribe(data => { 
            location.reload();
        });
    }

}
