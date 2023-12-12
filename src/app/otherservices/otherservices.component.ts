import { Component } from '@angular/core';
import { OtherServicesModel } from './otherservices.component.model';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otherservices',
  templateUrl: './otherservices.component.html',
  styleUrls: ['./otherservices.component.css']
})
export class OtherservicesComponent {
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  dataarray: OtherServicesModel[] = [];
  currentPage: number = 1;
  countries: OtherServicesModel [] | undefined;
  collectionSize : any;
  collectionSize1 = 100;

  servicesList:OtherServicesModel[]=[];

  constructor(private apiService:ApiService, private router:Router) {}

  ngOnInit(){
    this.apiService.allOtherServices().subscribe(
      (response:any)=>{
        this.servicesList = response.data;
        this.collectionSize = response.data.length ;
      },
      (error:any)=>{
        console.error(error);
      }
    )
  }


  edit(id:number){
    this.router.navigate(['/set/view-other-services/'+id]);
  }

  delete(id:number){
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
        this.apiService.deleteService(id).subscribe(
          (response:any)=>{
            console.log(response); 
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



applyFilter(): void {
  const searchString = this.SearchText.toLowerCase();
  const filteredData = [...this.servicesList];
  this.servicesList = filteredData.filter((data) =>
    data.serviceName.toLowerCase().includes(searchString) ||
    data.description.toLowerCase().includes(searchString) ||
    (data.fees !== null && !isNaN(data.fees) && data.fees.toString().includes(searchString)) ||
    (data.serviceId !== null && !isNaN(data.serviceId) && data.serviceId.toString().includes(searchString)) 
    // data.fees.toLowerCase().includes(searchString) ||
    // data.serviceId.toLowerCase().includes(searchString)


    
  );
}
refreshCountries() {
  this.countries = this.dataarray
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}



}
