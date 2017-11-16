import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../Services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    transaction: any;
    constructor(public dashboardService: DashboardService) {}

    ngOnInit() {
        this.dashboardService.getAllTransaction('id').subscribe(transaction => {
            this.transaction = transaction;
            console.log(this.transaction);
        });
        console.log("this.transaction");
    }
    
    

}
