import { Component } from '@angular/core';
import { ProductFeesModel } from './productfees.component.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productfees',
  templateUrl: './productfees.component.html',
  styleUrls: ['./productfees.component.css']
})
export class ProductfeesComponent {
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  dataarray: ProductFeesModel [] = [];
  currentPage: number = 1;
  countries: ProductFeesModel [] | undefined;
  collectionSize =100;

  ProductFeeList:ProductFeesModel[]=[];
  
  constructor(private apiService:ApiService, private router:Router) {}

ngOnInit(){
  this.apiService.allProductfees().subscribe(
  (response:any)=>{
    this.ProductFeeList = response.data;
    this.collectionSize = response.data.length
  },
  (error:any)=>{
    console.error(error);
  }
  )
}


edit(id:any){
  this.router.navigate(['/set/view-product-fees/'+id]);
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
      this.apiService.deleteProductfees(id).subscribe(
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




applyFilter(): void {
  // const searchString = this.SearchText.toLowerCase();
  // const filteredData = [...this.dataarray];
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


}
