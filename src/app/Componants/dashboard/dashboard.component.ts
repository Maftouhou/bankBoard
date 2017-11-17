import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../Services/dashboard.service';
import {AuthentificationService} from '../../Services/authentification.service';
import {SoldService} from '../../Services/sold/sold.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    userData: any;
    transactionsData: any;
    soldData: any;
    
    constructor(public dashboardService: DashboardService,
                public authentification: AuthentificationService,
                public soldService: SoldService) {}

    ngOnInit() {
        this.loadDashboardData();
    }
    
    loadDashboardData(){
        this.dashboardService.getAllTransaction().transaction.subscribe(transaction => {
            this.transactionsData = transaction;
        }, err => { console.log(err); });
        
        this.soldService.getCurentUserInformations().subscribe(user => {
            this.userData = user.userInfo;
            this.soldData = user.sold;
        }, err => { console.log(err); });        
    }
}
