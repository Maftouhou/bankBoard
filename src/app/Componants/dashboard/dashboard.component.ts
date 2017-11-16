import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../Services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    transactions: any;
    user_informations: any;
    
    constructor(public dashboardService: DashboardService) {}

    ngOnInit() {
        this.loadDashboardData();
    }
    
    loadDashboardData(){
        this.dashboardService.getCurentUserFullInfo().subscribe(user => {
            this.user_informations = user;
            
        }, err => { console.log(err); });
        
        this.dashboardService.getAllTransaction().transaction.subscribe(transaction => {
            this.transactions = transaction;
            
        }, err => { console.log(err); });
    }
}
