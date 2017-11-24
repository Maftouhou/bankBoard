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
    schedulled_opperation: boolean;
    updateTransactionData: any;

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
        private router: Router, public soldService: SoldService) {

        }


    ngOnInit() {
        /**
         * Set default status for scheduled opperation
         */
        this.schedulled_opperation = false;
        
        /**
         * Get all user inforamtions from local storage
         */
        if(this.authentificationService.loggedIn()){
            this.authentificationService.getTocken();
            this.user_id = this.authentificationService.user._id;
            
            this.soldService.getCurentUserInformations().subscribe(user => {
                this.user_sold = user.sold.amount;
            });
        }
    }
    
    /**
     * Toogle display transaction form
     */
    instantOpperationForm(evt: any){

        if(evt === "instant_opperation"){
            this.schedulled_opperation = false;
        }else if(evt === "schedulled_opperation"){
            this.schedulled_opperation = true;
        }
    }
    
    registrerOpperation(){
        
        const transaction = {
            user_id: this.user_id,
            account_num: this.account_num,
            dateOpperation: this.dateOpperation,
            description: this.description,
            amount: this.amount,
            user_sold: this.user_sold,
            schedulled_opperation: this.schedulled_opperation
        };
        
        if (!this.validateService.validateTransaction(transaction)){
            this.flashMessages.show('Veillez remplir tout les champs !',
                {cssClass: 'errorInfo', timeout: 3000}
            );
        }else{
            this.transactionService.CreateTransaction(transaction).subscribe(transaction => {
                if(transaction.status){
                    this.flashMessages.show(transaction.message, {cssClass: 'successInfo', timeout: 6000} );
                }else if(transaction._id){
                    let complementNotification: string = (this.schedulled_opperation === true ? ' est enregistré.' : ' a été effectué.');
                    this.flashMessages.show('votre transaction du montant de "' + transaction.amount + '" €' + complementNotification,
                        {cssClass: 'successInfo', timeout: 6000} );
                    this.router.navigate(['/dashboard']);
                }else{
                    this.flashMessages.show("quelque chose à du mal se passé. raprochez-vous de votre service client pour plus d'information. ",
                        {cssClass: 'errorInfo', timeout: 6000} );
                    this.router.navigate(['/dashboard']);
                }
            });
        }
    }
}
