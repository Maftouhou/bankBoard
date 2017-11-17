export class SoldModel {
    user_id: string;
    account_num: string;
    amount: number;
    
    public getUser_id() {
        return this.user_id;
    }
    public getAcount_num() {
        return this.account_num;
    }
    public getAmount() {
        return this.amount;
    }

    public setUser_id(user_id: any) {
        this.user_id = user_id;
    }
    public setAccount_num(account_num: any) {
        this.account_num = account_num;
    }
    public setAmount(amount: any) {
        this.amount = amount;
    }
}

