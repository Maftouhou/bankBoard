import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../Services/validate.service';
import {AuthentificationService} from '../../Services/authentification.service';
import {SoldService} from '../../Services/sold/sold.service';
import {TransactionService} from '../../Services/transaction/transaction.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
    selector: 'app-mouvement',
    templateUrl: './mouvement.component.html',
    styleUrls: ['./mouvement.component.css']
})
export class MouvementComponent implements OnInit {
    
    user_id: string;
    account_num: string;
    dateOpperation: Date;
    description: string;
    amount: number;
    user_sold: string;
    
    constructor(private validateService: ValidateService,
        private flashMessages: FlashMessagesService,
        private authentificationService: AuthentificationService,
        private transactionService: TransactionService,
        private router: Router, public soldService: SoldService) {}

    ngOnInit() {
        if(this.authentificationService.loggedIn()){
            this.authentificationService.getTocken();
            this.user_id = this.authentificationService.user._id;
            
            this.soldService.getCurentUserInformations().subscribe(user => {
                this.user_sold = user.sold.amount;
            });
        }
    }
    
    registrerOpperation(){
        
        const transaction = {
            user_id: this.user_id,
            account_num: this.account_num,
            dateOpperation: this.dateOpperation,
            description: this.description,
            amount: this.amount,
            user_sold: this.user_sold
        };
        
        if (!this.validateService.validateTransaction(transaction)){
            this.flashMessages.show('fill in all the field',
                {cssClass: 'alert-info', timeout: 3000}
            );
        }else{
            this.transactionService.CreateTransaction(transaction).subscribe(transaction => {
                    console.log(transaction);
                if(transaction.status){
                    this.flashMessages.show(transaction.message, {cssClass: 'alert-success', timeout: 6000} );
                }else if(transaction._id){
                    this.flashMessages.show('votre transaction du montant de "' + transaction.amount + ' " a été effectué.',
                        {cssClass: 'alert-success', timeout: 6000} );
                    this.router.navigate(['/dashboard']);
                }else{
                    this.flashMessages.show("quelque chose à du mal se passé. raprochez-vous de votre service client pour plus d'information. ",
                        {cssClass: 'alert-danger', timeout: 6000} );
                    this.router.navigate(['/dashboard']);
                }
            });
        }
    }
}
