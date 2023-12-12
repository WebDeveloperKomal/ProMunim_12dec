import { Component } from '@angular/core';
import { DocumentCategoryModel } from '../documentcategory/documentcategory.component.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-document-category',
  templateUrl: './edit-document-category.component.html',
  styleUrls: ['./edit-document-category.component.css']
})
export class EditDocumentCategoryComponent {
  complianceForm !: FormGroup;
  SearchText : any ;

  page = 1;
  pageSize = 10 ;
  dataarray: DocumentCategoryModel [] = [];
  currentPage: number = 1;
  countries: DocumentCategoryModel [] | undefined;
  collectionSize =100;
  id!:number;
  cname:any;
  types:any;
  tnames:string[]=[];

  constructor( private formBuilder: FormBuilder, private apiService:ApiService, private route:ActivatedRoute) {
    this.complianceForm = this.formBuilder.group({
      id: ['', Validators.required], // Add validation if needed
      name: ['', Validators.required], // Add validation if needed
      tname: ['', Validators.required], // Add validation if needed
    });
  }


  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.apiService.DocCategoryTypesById(this.id).subscribe(
      (res:any)=>{
        this.types = res.docType
        this.cname = res.docType[0].categoryName;
      },
      (err:any)=>{console.error(err);}
    )
  }

  addType(){
    const type = {
      cid: this.id,
      name:this.tnames
    }
    console.log('data ready to send :::: ',type);
    
    this.apiService.addType(type).subscribe(
      (res:any)=>{console.log(res);
        // window.location.reload();
      },
      (err:any)=>{console.error(err);}
    )
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
  this.countries = this.dataarray
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}
}
