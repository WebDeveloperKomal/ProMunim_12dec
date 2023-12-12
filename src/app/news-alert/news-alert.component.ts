import { Component } from '@angular/core';
import { NewsalertModel } from './news-alert.component.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-alert',
  templateUrl: './news-alert.component.html',
  styleUrls: ['./news-alert.component.css']
})
export class NewsAlertComponent {
  SearchText: any;

  page = 1;
  pageSize = 10;
  dataarray: NewsalertModel[] = [];
  currentPage: number = 1;
  countries: NewsalertModel[] | undefined;
  collectionSize = 100;

  NewsAlertList: NewsalertModel[] = [];

  constructor(private api: ApiService , private router: Router) {

  }

  ngOnInit() {
    this.api.allNewsAlert().subscribe(
      (data: any) => {
        this.NewsAlertList = data.data;
        console.log('Response successful!',data.data);
        this.collectionSize = data.data.length;
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    )
  }

  // delete(newsAlertId: number) {
  //   console.log('ID :::::', newsAlertId);
  //   this.api.deleteNewsAlert(newsAlertId).subscribe(
  //     (response: any) => {
  //       console.log(response.data);
  //       window.location.reload();
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   )
  // }

  delete(newsAlertId: number){
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
        this.api.deleteNewsAlert(newsAlertId).subscribe(
              (response: any) => {
                console.log(response.data);
                window.location.reload();
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
    const filteredData = [...this.NewsAlertList];
    this.NewsAlertList = filteredData.filter((data) =>
      // (data.date !== null && !isNaN(data.date) && data.date.toString().includes(searchString)) ||
      data.subject.toLowerCase().includes(searchString) ||
      data.description.toLowerCase().includes(searchString) 
      
    );
  }
  refreshCountries() {
    this.countries = this.dataarray
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  // delete(){
  //   confirm("Are you sure to delete this record")
  // }
}
