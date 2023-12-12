import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  allEmployees() {
    throw new Error('Method not implemented.');
  }





  
  baseUrl="http://localhost:8181/auth";
  
  
  constructor(private http : HttpClient) { }



  /************************************** FOR SETTINGS COMPONENT ***************************************/


  /************************************** BRANCHES ***************************************/
    allBranches():any
    {
      return this.http.get(`${this.baseUrl}/branch`);
    }
    addBranch(branch:any):any
    {
      return this.http.post(`${this.baseUrl}/add-branch`,branch);
    }
    BranchById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/get-branch-by-id/`+id);
    }
    updateBranch(branch:any):any
    {
      return this.http.put(`${this.baseUrl}/branch`,branch);
    }
    deleteBranch(id:number):any
    {
      return this.http.delete(`${this.baseUrl}/branch/`+id);
    }


    /************************************** COMPLIANCES ***************************************/
    allCompliances():any
    {
      return this.http.get(`${this.baseUrl}/all-compliance`);
    }

    addCompliance(compliance:any):any
    {
      return this.http.post(`${this.baseUrl}/add-compliance`,compliance);
    }

    complianceById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/get-compliance-by-id/`+id);
    }

    updateCompliance(compliance:any):any
    {
      return this.http.put(`${this.baseUrl}/compliance`,compliance);
    }

    deleteCompliance(id:number):any
    {
      return this.http.delete(`${this.baseUrl}/compliance/`+id);
    }


    /************************************** DEPARTMENTS ***************************************/
    allDepartments():any
    {
      return this.http.get(`${this.baseUrl}/department`);
    }

    addDepartment(department:any):any
    {
      return this.http.post(`${this.baseUrl}/department`,department);
    }

    DepartmentById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/getdep/`+id);
    }

    updateDepartment(department:any):any
    {
      return this.http.put(`${this.baseUrl}/department`,department);
    }

    deleteDepartment(id:number):any
    {
      return this.http.delete(`${this.baseUrl}/department/`+id);
    }


    /************************************** PRODUCTS ***************************************/
    allProducts():any
    {
      return this.http.get(`${this.baseUrl}/all-product`);
    }

    addProduct(product:any):any
    {
      return this.http.post(`${this.baseUrl}/save-product`,product);
    }

    ProductById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/get-product-by-id/`+id);
    }

    updateProduct(product:any):any
    {
      return this.http.put(`${this.baseUrl}/update-product`,product);
    }

    deleteProduct(id:number):any
    {
      return this.http.delete(`${this.baseUrl}/delete/`+id);
    }

  
    /************************************** PRODUCT FEES ***************************************/
    allProductfees():any
    {
      return this.http.get(`${this.baseUrl}/product-fees`);
    }

    addProductfees(fees:any):any
    {
      return this.http.post(`${this.baseUrl}/product-fees`,fees);
    }

    ProductfeesById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/get-product-fees/`+id);
    }

    updateProductfees(fees:any):any
    {
      return this.http.put(`${this.baseUrl}/product-fees-update`,fees);
    }

    deleteProductfees(id:any):any
    {
      return this.http.delete(`${this.baseUrl}/product-fees/`+id);
    }


    /************************************** OTHER SERVICES ***************************************/
    allOtherServices():any
    {
      return this.http.get(`${this.baseUrl}/all-services`);
    }

    addOtherServices(services:any):any
    {
      return this.http.post(`${this.baseUrl}/add-services`,services);
    }

    OtherServiceById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/service-info/`+id);
    }

    updateService(services:any):any
    {
      return this.http.put(`${this.baseUrl}/update-service`,services );
    }
    
    deleteService(id:number):any
    {
      return this.http.delete(`${this.baseUrl}/service/`+id );
    }


    /************************************** COURIOR DETAILS ***************************************/
    allCouriors():any
    {
      return this.http.get(`${this.baseUrl}/courier`);
    }

    addCourior(courior:any):any
    {
      return this.http.post(`${this.baseUrl}/add-courier`,courior);
    }

    couriorById(id:any):any
    {
      return this.http.get(`${this.baseUrl}/courier-by-id/`+id);
    }

    updateCourior(courior:any):any
    {
      return this.http.put(`${this.baseUrl}/update-courier`,courior);
    }

    deleteCourior(id:number):any
    {
      return this.http.delete(`${this.baseUrl}/courier/`+id);
    }

    /************************************** DOCUMENT CATEGORY ***************************************/
    allDocumentCategories():any
    {
      return this.http.get(`${this.baseUrl}/get-doc-category`);
    }

    DocumentCategoryById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/get-doc-category`);
    }

    DocCategoryTypesById(id:number):any
    {
      return this.http.get(`${this.baseUrl}/get-doc-type/`+id);
    }

    addType(type:any):any
    {
      return this.http.post(`${this.baseUrl}/add-document-category-types`,type);
    }







    /************************************** FOR ALL NEW CUSTOMERS COMPONENT ***************************************/

    allTempCustomers():any
    {
      return this.http.get(`${this.baseUrl}/allTempCustomer`);
    }

    addNewCustomer(cust:any):any
    {
      return this.http.post(`${this.baseUrl}/saveTempCustomer`,cust);
    }




//khush





  /************************************** Daily Visits ***************************************/
  
  alldailyVisits(): any { // running
    return this.http.get(`${this.baseUrl}/all-temp-customer-daily-visit`);
  }

  allvisitsOfCust(id : number) : any{ //running
    return this.http.get(`${this.baseUrl}/temp-customer-lead/` + id);
  }

  addVisitdetails(visit: any): any { //Not running create API
    return this.http.post(`${this.baseUrl}/save-daily-visit`, visit);
  }

  SearchVisitdetails(data: any): any { //Not running create API
    return this.http.get(`${this.baseUrl}/branch-temp-customer-daily-visit`, data);
  }
 

  /************************************** Daily Lead ***************************************/

  alldailyLead(): any {// running
    return this.http.get(`${this.baseUrl}/all-temp-customer-daily-lead`);
  }

  allleads(id : number) : any{ //running
    return this.http.get(`${this.baseUrl}/temp-customer-lead/` + id);
  }

  addleadsdetails(lead: any): any { //running
    return this.http.post(`${this.baseUrl}/save-daily-lead`, lead);
  }
  Searchleaddetails(data: any): any { //Not running create API
    return this.http.get(`${this.baseUrl}/branch-temp-customer-daily-lead`, data);
  }

  /************************************** All TID ***************************************/

  allTID(): any { // running
    return this.http.get(`${this.baseUrl}/all-tid`);
  }

  deleteTID(id: number): any { //running
    return this.http.delete(`${this.baseUrl}/tid-generation/${id}`);
  }
  
  addtid(tid: any): any { //running AOF NUMBER
    return this.http.post(`${this.baseUrl}/tid-generation`, tid);
  }

  updatestatus(status: any): any { //running
    return this.http.post(`${this.baseUrl}/tid-status`, status);
  }

  updatecourier(courier: any): any { //running
    return this.http.put(`${this.baseUrl}/tid-courier`, courier);
  }
  SearchTiddetails(data: any): any { //Not running create API
    return this.http.post(`${this.baseUrl}/all-branch-tid`, data);
  }

   /************************************** Customer Services ***************************************/
    
   /**************** AOF Form  *************/
    aof1Form(aof1 : any): any{
      return this.http.post(`${this.baseUrl}/organization-individual-details`, aof1)
    }

    TidDetails(tid:any): any{
      return this.http.get(`${this.baseUrl}/get-tid-details/`+tid)
    }
    /******** Authorised Signatory Details  Form *********/
    aof2Form(aof2 : any): any{
      return this.http.post(`${this.baseUrl}/auth_signatory_1`, aof2)
    }

     /******** Authorised Signatory Details  Form *********/
     aof3Form(aof3 : any): any{
      return this.http.post(`${this.baseUrl}/occupation_income_details`, aof3)
    }

    /**************** All Customer List *************/
    allCustomer(): any { //running
      return this.http.get(`${this.baseUrl}/all-customers`);
    }
  

  /************************************** All Customer Complaint ***************************************/

  allCustomerComplaint(): any { //running
    return this.http.get(`${this.baseUrl}/all-customer-complaint`);
  }

   alltempCustomer():any{ //running
    return this.http.get(`${this.baseUrl}/all-customers`);
  }
   // ********* first test the api ***********
  addComplaints(Complaints : any) : any{ //Not running
    return this.http.post(`${this.baseUrl}/save-complaint`,Complaints);
  }

  changestatus(changestatus: any): any { //Not running
    return this.http.put(`${this.baseUrl}/change-status`, changestatus);
  }


    /************************************** Reports ***************************************/
      
    // ********* Reports ***********
   

    allInvoiceReport( data:any): any { 
    
      return this.http.post(`${this.baseUrl}/get-all-invoice-report`,data);
     
    }
    allTransactionReport( data:any): any { 
    
      return this.http.post(`${this.baseUrl}/getAllTransReport`,data);
     
    }
    allInteractionReport( data:any): any { 
    
      return this.http.post(`${this.baseUrl}/get-all-followup-report`,data);
     
    }
    allComplaintsReport( data:any): any { 
    
      return this.http.post(`${this.baseUrl}/all-customer-complaints-report`,data);
     
    }

    allrmwisereport(): any { // How to set data in model 
      return this.http.get(`${this.baseUrl}/rm-wise-report`);
    }
  

  /************************************** All Tech Support ***************************************/
  allTechSupport(): any { //running
    return this.http.get(`${this.baseUrl}/all-tech-support`);
  }

    // *****************  @RequestParam *************************** //HOLD

  addTickets(ticket: any): any { //Not running  
    return this.http.post(`${this.baseUrl}/tech-support`, ticket);
  }

  // *****************  Multidata how to set model  data ***************************     //HOLD
  allreplayByID(id : number): any { //Not running    
    return this.http.get(`${this.baseUrl}/techSupport-replay/` + id);
  }  

  // *****************  1st get id and sent replay  ***************************
  addreplay(id: any): any { //running
    return this.http.post(`${this.baseUrl}/support-replay`,id);
  }


  /************************************** News Alert***************************************/

  allNewsAlert(): any {//running
    return this.http.get(`${this.baseUrl}/get-news-alert`);
  }

  addNewsAlert(NewsAlert: any): any {//running
    return this.http.post(`${this.baseUrl}/add-news`, NewsAlert);
  }

  updateNewsAlert(NewsAlert: any): any {  //running
    return this.http.put(`${this.baseUrl}/news-alert`, NewsAlert);
  }
  deleteNewsAlert(newsAlertId: number): any {//running
    return this.http.delete(`${this.baseUrl}/delete-news-alert/${newsAlertId}`);
  }







  users(){
    return this.http.get('http://192.168.0.45:8080/auth/get-customer-complaints/88888888');
  }
}
// 192.168.0.45:8080/get-all-customer