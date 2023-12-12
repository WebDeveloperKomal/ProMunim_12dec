import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accountopening-form',
  templateUrl: './accountopening-form.component.html',
  styleUrls: ['./accountopening-form.component.css']
})
export class AccountopeningFormComponent {
  step1 !: FormGroup ;
  activeTab: string = 'tab1';
individual : boolean =true;
nonindividual : boolean =false;
selfemployee : boolean =false;

  constructor(private formBuilder: FormBuilder) {

    
    this.step1 = this.formBuilder.group({
      branchnamecode: ['', Validators.required],
      AOF: ['', Validators.required],
      nameofapplicant: ['', Validators.required], 
      dateofincorporation: ['', Validators.required], 
      panno: ['', Validators.required], 
      adharno: ['', Validators.required], 
      tanno: ['', Validators.required], 
      ptno: ['', Validators.required], 

      gstno: ['', Validators.required], 
      uinno: ['', Validators.required], 
      tascno: ['', Validators.required], 
      registedaddress: ['', Validators.required], 

      city: ['', Validators.required], 
      pin: ['', Validators.required], 
      mobileno: ['', Validators.required], 
      telephoneno: ['', Validators.required], 
      mailid: ['', Validators.required], 
      mailingaddress: ['', Validators.required], 




      city1: ['', Validators.required], 
      pin1: ['', Validators.required], 
      mobileno1: ['', Validators.required],
      telephoneno1 :  ['', Validators.required]
    });
  }


  changeTab(tabId: string) {
    this.activeTab = tabId;
  }

  show1(){
    this.individual = true;
    this.nonindividual = false;
    this.selfemployee = false;
  }
  show2(){
    this.individual = false;
    this.nonindividual = true;
    this.selfemployee = false;
  }
  show3(){
    this.individual = false;
    this.nonindividual = false;
    this.selfemployee = true;
  }


}
