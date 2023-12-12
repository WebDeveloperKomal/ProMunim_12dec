import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  // constructor() { }
  
  credentials!:{email:string,password:string};

  constructor(private http : HttpClient) { }

  baseUrl="http://localhost:8181/user";

  Login(credentials:{email:string,password:string})
  {
    this.credentials=credentials;
    return this.http.post(`${this.baseUrl}/login`,credentials);
  }

  IsLoggedIn()
  {
    let token = localStorage.getItem("token");
    
    if(token==undefined || token==='' || token==null)
    {
      return false;
    }
    else{
      return true;
    }
  }


  getUserData():any{
    return this.http.get(`${this.baseUrl}/user-profile`);
  }


  updateUserProfile(user:any){
    return this.http.put(`${this.baseUrl}/update-user-profile`,user);
  }

  updateUserPassword(password:any){
    return this.http.put(`${this.baseUrl}/update-employee-password`,password);
  }





    
  /************************************** FOR EMPLOYEE COMPONENT ***************************************/


  allEmployees():any
  {
    return this.http.get(`${this.baseUrl}/employee`);
  }

  addEmployee(emp:any):any
  {
    return this.http.post(`${this.baseUrl}/register-new-employee`,emp);
  }

  updateEmployee(data: string, empPhoto: File | null):any {
    const formData: FormData = new FormData();
    formData.append('data', data);

    if (empPhoto) {
      formData.append('empPhoto', empPhoto, empPhoto.name);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.baseUrl}/update-employee`, formData, { headers });
  }


}
