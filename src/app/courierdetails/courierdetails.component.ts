import { Component } from '@angular/core';
import { courierdetailsModel } from './courierdetails.component.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courierdetails',
  templateUrl: './courierdetails.component.html',
  styleUrls: ['./courierdetails.component.css']
})
export class CourierdetailsComponent {
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  // dataarray: courierdetailsModel [] = [];
  currentPage: number = 1;
  // countries: courierdetailsModel [] | undefined;
  collectionSize =100;

  couriorList:courierdetailsModel[]=[];

  constructor(private apiService:ApiService, private router:Router) {}

  ngOnInit(){
    this.apiService.allCouriors().subscribe(
      (response:any)=>{
        this.couriorList=response.data;
        this.collectionSize = response.data.length;
      },
      (error:any)=>{
        console.error(error);        
      }
    )
  }

  edit(id:any){
    this.router.navigate(['/set/view-courier/'+id]);
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
        this.apiService.deleteCourior(id).subscribe(
        (res:any)=>{
          console.log(res.data);
          Swal.fire({
            title: "Record Deleted!",
            icon: "success"
          });        
        },
        (err:any)=>{
          console.error(err);
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


applyFilter(): void {
  const searchString = this.SearchText.toLowerCase();
  const filteredData = [...this.couriorList];
  this.couriorList = filteredData.filter((data) =>
    data.name.toLowerCase().includes(searchString) ||
    data.address.toLowerCase().includes(searchString) ||
    data.phoneNo.toLowerCase().includes(searchString) ||
    data.fax.toLowerCase().includes(searchString) ||
    data.emailId.toLowerCase().includes(searchString)

    
  );
}
refreshCountries() {
  this.couriorList = this.couriorList
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}



}
