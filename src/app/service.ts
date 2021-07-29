import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',  // le service partagable dans tt l'app .
  })


  export class Service {


    constructor(private http: HttpClient) { }

     // test route 

     /*
     test(){

      const url_test_route = "http://localhost:8088/api/v1/etudiant2" ;
  
        return this.http.get<any>(url_test_route) ; // observable object
     }

     */


     getListoftables(){
       
      const url_list_of_tables = "http://localhost:8222/api/dashboard/list_tables" ;
  
      return this.http.get<any>(url_list_of_tables) ; 

     }

     // 'x' axis

     getListofColumnsx(nom_table:String){
      const url_column_x = "http://localhost:8222/api/dashboard/list_columns/"+nom_table ;
  
      return this.http.get<any>(url_column_x) ; 
     }


     // 'y' axis  (double type ) .

     getListofColumnsy(nom_table:String){
      const url_column_y = "http://localhost:8222/api/dashboard/list_columns_float/"+nom_table ;
  
      return this.http.get<any>(url_column_y) ; 
     }

     // get full request 

     getFullRequest(nom_table:String,colon_x:String,colon_y:String){
   
      const url_full_request = "http://localhost:8222/api/dashboard/get_full_request/"+nom_table+"/"+colon_x+"/"+colon_y ;
  
      return this.http.get<any>(url_full_request) ; 

     }
     

     //http://localhost:8222/api/dashboard/get_select_detail/product/name/product1/price/100
     getDetail(nom_table:String,colon_x:String,valx:String,colon_y:String,val_y:String){

      const url_detail = "http://localhost:8222/api/dashboard/get_select_detail/"+nom_table+"/"+colon_x+"/"+valx+"/"+colon_y+"/"+val_y;
  
      return this.http.get<any>(url_detail) ; 

     }


     // filter part .

     //equal 
     req_equal(nom_table:String,colon_x:String,colon_y:String,col_equal:String,val_equal:String){

      const url_req_equal = "http://localhost:8222/api/dashboard/get_req_equal/"+nom_table+"/"+colon_x+"/"+colon_y+"/"+col_equal+"/"+val_equal;
  
      return this.http.get<any>(url_req_equal) ; 

     }

     // greater than ...
     
     req_greater(nom_table:String,colon_x:String,colon_y:String,col_greater:String,val_greater){

      const url_req_greater = "http://localhost:8222/api/dashboard/get_req_greater/"+nom_table+"/"+colon_x+"/"+colon_y+"/"+col_greater+"/"+val_greater;
  
      return this.http.get<any>(url_req_greater) ; 

     }

     // less than ....


     req_less(nom_table:String,colon_x:String,colon_y:String,col_less:String,val_less){

      const url_req_less = "http://localhost:8222/api/dashboard/get_req_less/"+nom_table+"/"+colon_x+"/"+colon_y+"/"+col_less+"/"+val_less;
  
      return this.http.get<any>(url_req_less) ; 

     }
     
     // between ....

     req_between(nom_table:String,colon_x:String,colon_y:String,col_between:String,val_1,val_2){

      const url_req_between = "http://localhost:8222/api/dashboard/get_req_between/"+nom_table+"/"+colon_x+"/"+colon_y+"/"+col_between+"/"+val_1+"/"+val_2;
  
      return this.http.get<any>(url_req_between) ; 

     }
    


        }


  

