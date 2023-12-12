import { Component } from '@angular/core';
import { ProductsModel } from './products.component.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  dataarray: ProductsModel[] = [];
  currentPage: number = 1;
  countries: ProductsModel[] | undefined;
  collectionSize =100;
  
  productList:ProductsModel[]=[];

  constructor(private apiservice:ApiService,private router:Router) {}

  ngOnInit(){
    this.apiservice.allProducts().subscribe(
      (response:any)=>{
        this.productList = response.data;
        console.log('val',response.data );
        
        this.collectionSize = response.data.length;
      },
      (error:any)=>{
        console.error(error);
        
      }
    )
  }

  edit(id:number){
    this.router.navigate(['/set/view-product/'+id]);
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
        this.apiservice.deleteProduct(id).subscribe(
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
  if (!this.SearchText) {
    
    this.productList = [...this.productList];
    return;
  }
  const searchString = this.SearchText.toLowerCase();
  this.productList = this.productList.filter((data) =>
    data.productName.toLowerCase().includes(searchString) ||
    (data.productId !== null && !isNaN(data.productId) && data.productId.toString().includes(searchString)) ||
    (data.minValue !== null && !isNaN(data.minValue) && data.minValue.toString().includes(searchString)) ||
    (data.maxValue !== null && !isNaN(data.maxValue) && data.maxValue.toString().includes(searchString))
 
  );
}

// applyFilter(): void {
//   const searchString = this.SearchText.toLowerCase();
//   const filteredData = [...this.productList];
//   this.productList = filteredData.filter((data) =>
//     data.productId.toLowerCase().includes(searchString) ||
//     data.productName.toLowerCase().includes(searchString) ||
//     data.minValue.toLowerCase().includes(searchString) ||
//     data.maxValue.toLowerCase().includes(searchString)


//   );
// }
refreshCountries() {
  this.countries = this.dataarray
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}


}
