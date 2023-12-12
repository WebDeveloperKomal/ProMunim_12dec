import { Component } from '@angular/core';
import { BranchModel } from './branch.component.model';
import { ApiService } from '../api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  dataarray: BranchModel[] = [];
  currentPage: number = 1;
  countries: BranchModel[] | undefined;
  collectionSize =100;

  branchList:BranchModel[] = [];
  branch: BranchModel = new BranchModel();

  constructor(private service:ApiService, private router:Router) {}

  ngOnInit(){
    this.service.allBranches().subscribe(
      ( data: any) => {
        this.branchList=data.data;
        this.collectionSize = this.branchList.length;
        console.log('Response successful!');
      },
      (error:any) => {
        console.error('API Error:', error);
      }
    );
  }

  delete(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
      }).then((result) => {
      if (result.isConfirmed) 
      {
        this.service.deleteBranch(id).subscribe(
        (response:any)=>{
          console.log(response.data);
          Swal.fire({
            title: "Record Deleted!",
            icon: "success"
          });
        },
        (error:any)=>{
          console.error(error);
          Swal.fire({
            title: "Error!",
            icon: "error"
          });
        }
        );
        setInterval(()=>{window.location.reload()},1000);
      }
    });
    
  }

  edit(id:any){
    this.router.navigate([`/set/view-branch/`+id])
  }


// applyFilter(): void {
//   const searchString = this.SearchText.toLowerCase();
//   const filteredData = [...this.dataarray];
//   this.dataarray = filteredData.filter((data) =>
//   console.log("fndfngn")
//      data.branchname.toLowerCase().includes(searchString) ||
//      data.branchcode.toLowerCase().includes(searchString) ||
//      data.branchcity.toLowerCase().includes(searchString) ||
//      data.branchaddress.toLowerCase().includes(searchString)
//   );
// }



applyFilter(): void {
  if (!this.SearchText) {
    
    this.branchList = [...this.branchList];
    return;
  }
  const searchString = this.SearchText.toLowerCase();
  this.branchList = this.branchList.filter((data) =>
    data.branchName.toLowerCase().includes(searchString) ||
    data.branchCode.toLowerCase().includes(searchString) ||
    data.branchCity.toLowerCase().includes(searchString) ||
    // data.branchclsId.toLowerCase().includes(searchString) ||
    // data.branchClassification.toLowerCase().includes(searchString) ||
    // data.branchArea.toLowerCase().includes(searchString) ||
    data.branchAddress.toLowerCase().includes(searchString) 
    // data.latitude.toLowerCase().includes(searchString) ||
    // data.longitude.toLowerCase().includes(searchString) 
  );

  
  // if (!this.SearchText) {
    
  //   this.complianceList = [...this.complianceList];
  //   return;
  // }
  // const searchString = this.SearchText.toLowerCase();
  // this.complianceList = this.complianceList.filter((data) =>
  //   data.complianceName.toLowerCase().includes(searchString) ||
  //   data.taxLink.toLowerCase().includes(searchString) ||
  //   data.complianceDueDate.toLowerCase().includes(searchString)
  // );

}
refreshCountries() {
  this.countries = this.dataarray
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}


}

