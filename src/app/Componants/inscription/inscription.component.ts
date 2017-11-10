import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../Services/validate.service';
import {AuthentificationService} from '../../Services/authentification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    
    constructor(private validateService: ValidateService,
                private flashMessages: FlashMessagesService,
                private authentificationService: AuthentificationService,
                private router: Router) { }

    ngOnInit() { }

    onRegisterSubmit() {
        
        const user = {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            password: this.password
        };
        
        // Required Field
        if (!this.validateService.validateRegister(user)){
            this.flashMessages.show('fill in all the field',
            {cssClass: 'alert-info', timeout: 3000}
            );
        }
        
        // Required correct email
        if (!this.validateService.validateEmail(user.email)){
            this.flashMessages.show('use a valide email',
            {cssClass: 'alert-info', timeout: 3000}
            );
        }
        
        // Register user
        this.authentificationService.registerUser(user).subscribe(data =>{
            console.log(data.status);
            
            if(data.status === undefined){
                this.flashMessages.show('User ' + data.firstName + ' is created',
                    {cssClass: 'alert-success', timeout: 6000} );
                this.router.navigate(['/connexion']);
            }else if(data.status !== undefined){
                this.flashMessages.show(data.status + " : " + data.message,
                    {cssClass: 'alert-danger', timeout: 6000} );
                this.router.navigate(['/inscription']);
            }else{
                this.flashMessages.show("Something went wrong !!!",
                    {cssClass: 'alert-danger', timeout: 6000} );
                this.router.navigate(['/inscription']);
            }
        });
    }
}
