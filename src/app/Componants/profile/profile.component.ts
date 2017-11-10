import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: Object;
    
    constructor(private authentification: AuthentificationService,
          private router: Router
          ) { }

    ngOnInit() {
        this.authentification.getProfile().subscribe(profile => {
            this.user = profile.userInfo;
        }, 
        err => {
            console.log(err);
        });
    }

}
