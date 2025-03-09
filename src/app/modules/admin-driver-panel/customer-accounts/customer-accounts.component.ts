import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.scss']
})
export class CustomerAccountsComponent {
  customers: any[];

  first = 0;

  rows = 10;

  constructor() {}

  ngOnInit(): void {
    this.customers = [
      { fname: 'John', lname: 'Doe', mobile: '123-456-7890', address: '123 Main St', dob: '1999-06-22' },
      { fname: 'Jane', lname: 'Smith', mobile: '987-654-3210', address: '456 Elm St', dob: '1959-02-12' },
      { fname: 'Alice', lname: 'Johnson', mobile: '555-678-1234', address: '789 Oak St', dob: '2002-12-04' },
      { fname: 'Bob', lname: 'Williams', mobile: '444-567-8901', address: '321 Pine St', dob: '1997-04-21' },
      { fname: 'Charlie', lname: 'Brown', mobile: '333-456-7890', address: '987 Maple St', dob: '2005-04-18' },
      { fname: 'David', lname: 'Miller', mobile: '222-345-6789', address: '654 Cedar St', dob: '1986-08-27' },
      { fname: 'Ella', lname: 'Davis', mobile: '111-234-5678', address: '741 Birch St', dob: '1999-05-02' },
      { fname: 'Frank', lname: 'Moore', mobile: '999-123-4567', address: '852 Spruce St', dob: '1994-06-05' },
      { fname: 'Grace', lname: 'Taylor', mobile: '888-987-6543', address: '963 Chestnut St', dob: '1991-03-25' },
      { fname: 'Henry', lname: 'Anderson', mobile: '777-876-5432', address: '159 Redwood St', dob: '2004-12-26' },
      { fname: 'Ivy', lname: 'Thomas', mobile: '666-765-4321', address: '357 Palm St', dob: '2000-02-11' },
      { fname: 'Jack', lname: 'Harris', mobile: '555-654-3210', address: '258 Magnolia St', dob: '1989-01-11' }
    ];
    
        
   }

   clickOnViewDetails(roeData:any){

   }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.customers ? this.first + this.rows >= this.customers.length : true;
    }

    isFirstPage(): boolean {
        return this.customers ? this.first === 0 : true;
    }
}
