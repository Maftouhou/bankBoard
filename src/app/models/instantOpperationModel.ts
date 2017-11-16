export class InstantOpperationModel {
    user_id: string;
    dateOpperation: string;
    co_author_id: string;
    amount: number;
    description: string;

    public getUser_id() {
        return this.user_id;
    }
    public getDateOpperation() {
        return this.dateOpperation;
    }
    public getCo_author_id() {
        return this.co_author_id;
    }
    public getAmount() {
        return this.amount;
    }
    public getDescription() {
        return this.description;
    }

    public setUser_id(user_id: any) {
        this.user_id = user_id;
    }
    public setDateOpperation(dateOpperation: any) {
        this.dateOpperation = dateOpperation;
    }
    public setCo_author_id(co_author_id: any) {
        this.co_author_id = co_author_id;
    }
    public setAmount(amount: any) {
        this.amount = amount;
    }
    public setDescription(description: any) {
        this.description = description;
    }
}

