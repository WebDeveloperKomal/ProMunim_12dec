import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllDailyVisitModel } from './all-daily-visit.component.model';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchModel } from '../branch/branch.component.model';

@Component({
  selector: 'app-all-daily-visit',
  templateUrl: './all-daily-visit.component.html',
  styleUrls: ['./all-daily-visit.component.css']
})
export class AllDailyVisitComponent {
  SearchText: any;

  page = 1;
  pageSize = 10;
  dataarray: AllDailyVisitModel[] = [];
  currentPage: number = 1;
  // countries: AllDailyVisitModel[] | undefined;
  collectionSize = 100;
  dailyvisitssearch !: FormGroup;

  visitList:AllDailyVisitModel[] = [];
  branches:BranchModel[]=[];
  // constructor(private service: ApiService , private router:Router) { }
  constructor(private formBuilder: FormBuilder, private service:ApiService,private router:Router) {
    this.dailyvisitssearch = this.formBuilder.group({
      branch: ['', Validators.required], // Add validation if needed
    
    });
}
  ngOnInit(){
    this.service.alldailyVisits().subscribe(
      ( data: any) => {
        this.visitList=data.data;
        console.log('Response successful!',data.data);
        this.collectionSize= data.data.length ;
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
    this.router.navigate(['/set/view-add-dailyvisits/'+id]);
  }

  applyFilter(): void {
    const searchString = this.SearchText.toLowerCase();
    const filteredData = [...this.visitList];
    this.visitList = filteredData.filter((data) =>
      data.company_name.toLowerCase().includes(searchString) ||
      data.cust_name.toLowerCase().includes(searchString) ||
      data.branch.toLowerCase().includes(searchString) ||
      data.attendedByFN.toLowerCase().includes(searchString)
    );
  }
  refreshCountries() {
    // this.countries = this.dataarray
    //   .map((country, i) => ({id: i + 1, ...country}))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  onSubmit(){
    console.log("DATA :::::: " ,this.dailyvisitssearch.value);
    
    this.service.SearchVisitdetails(this.dailyvisitssearch.value).subscribe(
      (responce:any)=>{
        this.visitList=responce.data;
        console.log('val',responce.data);
      },
      (error:any)=>{
        console.error(error);        
      }
    )
  }
  // 
}
