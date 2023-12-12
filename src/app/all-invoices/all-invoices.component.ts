import { Component } from '@angular/core';
import { AllInvoicesModel } from './all-invoices.component.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { BranchModel } from '../branch/branch.component.model';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css']
})
export class AllInvoicesComponent {

  SearchText : any ;
  branchid : number | undefined;
  branchname : any;
  branchcode: any;
  branchcity: any;
  branchaddress : any;
  page = 1;
  pageSize = 10 ;
  dataarray: AllInvoicesModel[] = [];
  currentPage: number = 1;
  AllInvicesList: AllInvoicesModel[] | undefined;
  collectionSize =0;
  invoiceSearch !: FormGroup;
  accountno !: number;
  branches:BranchModel[]=[];

  constructor(private formBuilder: FormBuilder, private apiService:ApiService,private route:ActivatedRoute) {
    this.invoiceSearch = this.formBuilder.group({
      branch: ['', Validators.required], // Add validation if needed
      fromDate: ['', Validators.required], // Add validation if needed
      toDate: ['', Validators.required] ,
      status: ['', Validators.required]// Add validation if needed
     
    });
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
  // this.countries = this.dataarray
  //   .map((country, i) => ({id: i + 1, ...country}))
  //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}

ngOnInit(){
  this.apiService.allBranches().subscribe(
    (responce:any)=>{
      this.branches=responce.data;
    },
    (error:any)=>{
      console.error(error);        
    }
  )
}

onSubmit(){
  console.log("DATA :::::: " ,this.invoiceSearch.value);
  
  this.apiService.allInvoiceReport(this.invoiceSearch.value).subscribe(
    (responce:any)=>{
      this.AllInvicesList=responce.data;
      console.log('val',responce.data);
    },
    (error:any)=>{
      console.error(error);        
    }
  )
}


}
