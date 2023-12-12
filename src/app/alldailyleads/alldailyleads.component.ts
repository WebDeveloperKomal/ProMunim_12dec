import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllDailyLeadsModel } from './alldailyleads.component.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { BranchModel } from '../branch/branch.component.model';

@Component({
  selector: 'app-alldailyleads',
  templateUrl: './alldailyleads.component.html',
  styleUrls: ['./alldailyleads.component.css']
})
export class AlldailyleadsComponent {
  SearchText : any ;
 
  page = 1;
  pageSize = 10 ;
  dataarray: AllDailyLeadsModel[] = [];
  currentPage: number = 1;
  countries: AllDailyLeadsModel[] | undefined;
  collectionSize =100;

  leadsList:AllDailyLeadsModel[] = [];

  dailyleadform !: FormGroup;
  branches:BranchModel[]=[];
  

  constructor( private service: ApiService , private router:Router,private formBuilder: FormBuilder) {
    this.dailyleadform = this.formBuilder.group({
      branch: ['', Validators.required], 
    
     
    });
}

ngOnInit(){
  this.service.alldailyLead().subscribe(
    ( data: any) => {
      this.leadsList=data.data;
      console.log('Response successful!', data.data);
      this.collectionSize = data.data.length;
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

edit(id:any){
  this.router.navigate(['/set/view-add-dailyLeads/'+id]);
}


applyFilter(): void {
  const searchString = this.SearchText.toLowerCase();
  const filteredData = [...this.leadsList];
  this.leadsList = filteredData.filter((data) =>
    data.company_name.toLowerCase().includes(searchString) ||
    data.cust_name.toLowerCase().includes(searchString) ||
    data.branch.toLowerCase().includes(searchString) ||
    data.attendedByLN.toLowerCase().includes(searchString) ||
    (data.contact_no !== null && !isNaN(data.contact_no) && data.contact_no.toString().includes(searchString)) ||
    (data.customer_id !== null && !isNaN(data.customer_id) && data.customer_id.toString().includes(searchString)) 

  );
}
refreshCountries() {
  // this.countries = this.dataarray
  //   .map((country, i) => ({id: i + 1, ...country}))
  //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}

onSubmit(){
  console.log("DATA :::::: " ,this.dailyleadform.value);
  
  this.service.Searchleaddetails(this.dailyleadform.value).subscribe(
    (responce:any)=>{
      this.leadsList=responce.data;
      console.log('val',responce.data);
    },
    (error:any)=>{
      console.error(error);        
    }
  )
}
}
