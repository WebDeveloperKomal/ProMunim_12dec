import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCustomerModel } from './new-customers.component.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  styleUrls: ['./new-customers.component.css']
})
export class NewCustomersComponent {
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  dataarray: NewCustomerModel[] = [];
  currentPage: number = 1;
  countries: NewCustomerModel[] | undefined;
  collectionSize =100;
  employeeForm !: FormGroup;
  employeeForm1 !: FormGroup;
  temCustomerList:NewCustomerModel[]=[];
  selecteddata : any ;
  constructor(private formBuilder: FormBuilder, private apiService:ApiService) {
    this.employeeForm = this.formBuilder.group({
      branch: ['', Validators.required], // Add validation if needed
      fromdate: ['', Validators.required], // Add validation if needed
      todate: ['', Validators.required] // Add validation if needed
     
    });

    this.employeeForm1 = this.formBuilder.group({
      companyname: ['', Validators.required], // Add validation if needed
      fullname: ['', Validators.required], // Add validation if needed
      email: ['', Validators.required], // Add validation if needed
      constno: ['', Validators.required],
      altconstno: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      
      constofcompany: ['', Validators.required],
      segment: ['', Validators.required],
      natofbuss: ['', Validators.required],
      mainitr: ['', Validators.required],
      leadtype: ['', Validators.required],
      leadstatus: ['', Validators.required],
      product: ['', Validators.required],
      // natofbuss: ['', Validators.required],
      // natofbuss: ['', Validators.required],
      

    });
  }

  ngOnInit(){
    this.apiService.allTempCustomers().subscribe(
      (responce:any)=>{
        this.temCustomerList=responce.data;
      },
      (error:any)=>{
        console.error(error);        
      }
    )
  }

ShowDetails(data : any){
  this.selecteddata = data
}
applyFilter(): void {
  const searchString = this.SearchText.toLowerCase();
  const filteredData = [...this.dataarray];
  // this.dataarray = filteredData.filter((data) =>
  //   data.branchname.toLowerCase().includes(searchString) ||
  //   data.branchcode.toLowerCase().includes(searchString) ||
  //   data.branchcity.toLowerCase().includes(searchString) ||
  //   data.branchaddress.toLowerCase().includes(searchString)
  // );
}
refreshCountries() {
  this.countries = this.dataarray
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}

delete(){
  confirm("Are you sure to delete this record")
}
}
