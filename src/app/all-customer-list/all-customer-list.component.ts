import { Component } from '@angular/core';
import { AllCustomerListModel } from './all-customer-list.component.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { BranchModel } from '../branch/branch.component.model';

@Component({
  selector: 'app-all-customer-list',
  templateUrl: './all-customer-list.component.html',
  styleUrls: ['./all-customer-list.component.css']
})
export class AllCustomerListComponent {
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  dataarray: AllCustomerListModel[] = [];
  currentPage: number = 1;
  countries: AllCustomerListModel[] | undefined;
  collectionSize =100;
  CustomerForm !: FormGroup;
  branches:BranchModel[]=[];
  allCust:AllCustomerListModel[]=[];

  constructor(private formBuilder: FormBuilder , private service:ApiService) {
    this.CustomerForm = this.formBuilder.group({
      branch: ['', Validators.required], // Add validation if needed
      fromDate: ['', Validators.required], // Add validation if needed
      toDate: ['', Validators.required] // Add validation if needed
     
    });
  
}

ngOnInit(){
  this.service.allCustomer().subscribe(
    ( data: any) => {

      this.allCust=data.data;
      console.log('Response successful!');
    },
    (error:any) => {
      console.error('API Error:', error);
    }
  );

  this.service.allBranches().subscribe(
    (responce:any)=>{
      this.branches=responce.data;
    },
    (error:any)=>{
      console.error(error);        
    }
  )
}

applyFilter(): void {
  const searchString = this.SearchText.toLowerCase();
  const filteredData = [...this.allCust];
  this.allCust = filteredData.filter((data) =>
    data.customerFullName.toLowerCase().includes(searchString) ||
    data.companyName.toLowerCase().includes(searchString) ||
    data.branch.toLowerCase().includes(searchString) ||
    (data.tId !== null && !isNaN(data.tId) && data.tId.toString().includes(searchString)) ||
    (data.customerId !== null && !isNaN(data.customerId) && data.customerId.toString().includes(searchString)) ||
    (data.accountNo !== null && !isNaN(data.accountNo) && data.accountNo.toString().includes(searchString)) ||
    (data.branchId !== null && !isNaN(data.branchId) && data.branchId.toString().includes(searchString))
  );

  
}
refreshCountries() {
  // this.countries = this.dataarray
  //   .map((country, i) => ({id: i + 1, ...country}))
  //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}
}
