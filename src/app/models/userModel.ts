export class User {
    private firstName: string;
    private lastName: string;
    private phone: string;
    private email: string;
    private password: string;
    
    public getFirstName(): string {
        return this.firstName;
    }
    
    public getLastName(): string {
        return this.lastName;
    }
    
    public getPhone(): string {
        return this.phone;
    }
    
    public getEmail(): string {
        return this.email;
    }
    
    public getPassword(): string {
        return this.password;
    }
}
