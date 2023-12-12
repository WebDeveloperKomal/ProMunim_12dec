import { Component } from '@angular/core';
import { AllCOmplaintsMainModel } from './all-complaints-main.component.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-all-complaints-main',
  templateUrl: './all-complaints-main.component.html',
  styleUrls: ['./all-complaints-main.component.css']
})
export class AllComplaintsMainComponent {
  SearchText : any ;
 
  page = 1;
  pageSize = 10 ;
  dataarray: AllCOmplaintsMainModel[] = [];
  currentPage: number = 1;
  countries: AllCOmplaintsMainModel[] | undefined;
  collectionSize =100;

  complaintList:AllCOmplaintsMainModel[] = [];


  users : any;

  // : AllCOmplaintsMainModel = new AllCOmplaintsMainModel();

  constructor(private formBuilder: FormBuilder , private api : ApiService) {
    // this.employeeForm = this.formBuilder.group({
    //   location: ['', Validators.required], // Add validation if needed
    //   maindepartment: ['', Validators.required], // Add validation if needed
    //   department: ['', Validators.required] // Add validation if needed
     
    // });

}

ngOnInit(){
  this.api.allCustomerComplaint().subscribe(
    ( data: any) => {

      this.complaintList=data.data;
      console.log('Response successful!', data.data);
      this.collectionSize = data.data.length;
    },
    (error:any) => {
      console.error('API Error:', error);
    }
  );
}
applyFilter(): void {
  const searchString = this.SearchText.toLowerCase();
  const filteredData = [...this.complaintList];
  this.complaintList = filteredData.filter((data) =>

  (data.complaintId !== null && !isNaN(data.complaintId) && data.complaintId.toString().includes(searchString)) ||
  (data.ticketId !== null && !isNaN(data.ticketId) && data.ticketId.toString().includes(searchString)) ||
  (data.accountNo !== null && !isNaN(data.accountNo) && data.accountNo.toString().includes(searchString)) ||
    data.subject.toLowerCase().includes(searchString) ||
    (data.date !== null && !isNaN(data.date) && data.date.toString().includes(searchString)) ||
    data.status.toLowerCase().includes(searchString) ||
    // data.insertByUser.toLowerCase().includes(searchString) ||
    data.companyName.toLowerCase().includes(searchString) ||
    data.branch.toLowerCase().includes(searchString)
  );
}
refreshCountries() {
  // this.countries = this.dataarray
  //   .map((country, i) => ({id: i + 1, ...country}))
  //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}

}
