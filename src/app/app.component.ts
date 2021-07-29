
import { Component, OnInit } from '@angular/core';

import {Service} from './service' ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  title = 'DynamicDashboardTool';

  result = [];

  list_of_tables ;
  colons_x ;
  colons_y;

  books = []

  // rq :
  // (select)="func($event)" --> click
  // (activate)="func($event)" --> mouse enter .
  // (deactivate)="func($event)" --> mouse quit .

  ngOnInit(){

    // tables 
    this.service.getListoftables().subscribe( (list_tables)=>{
      //  console.log(list_tables);
        this.list_of_tables = list_tables ; 
    });


  }

  


   onSelectVertical_chart(event){

     var sql_req = "select * from "+this.table_selected+" where " +this.colon_x_selected+" = " + event.name 
     +" and " + this.colon_y_selected + " = " + event.value ;

    // alert(sql_req) ;
     var nom_table = this.table_selected ;
     var colonne_x = this.colon_x_selected;
     var value_x = event.name ; 
     var colonne_y = this.colon_y_selected;
     var value_y = event.value ;

     this.service.getDetail(nom_table,colonne_x,value_x,colonne_y,value_y).subscribe((res)=>{
         // console.log(res);
          this.service.getListofColumnsx(nom_table).subscribe( (cols)=>{
            
            // loop the columns 

            for(let j=0;j<cols.length;j++){
              alert( cols[j] +" = " + ( res[0][cols[j]] ) );
            } 

            
          }); 
     });

     

   }


   onSelectHorizontal_chart(event){
    var sql_req = "select * from "+this.table_selected+" where " +this.colon_x_selected+" = " + event.name 
     +" and " + this.colon_y_selected + " = " + event.value ;

    // alert(sql_req) ;

     var nom_table = this.table_selected ;
     var colonne_x = this.colon_x_selected;
     var value_x = event.name ; 
     var colonne_y = this.colon_y_selected;
     var value_y = event.value ;

     this.service.getDetail(nom_table,colonne_x,value_x,colonne_y,value_y).subscribe((res)=>{
          console.log(res);
          this.service.getListofColumnsx(nom_table).subscribe( (cols)=>{
            
            // loop the columns 

            for(let j=0;j<cols.length;j++){
              alert( cols[j] +" = " + ( res[0][cols[j]] ) );
            } 
            
          }); 
     });
    
   }


   table_selected ;
   select_table(value){
     this.table_selected = value ;
    // alert("table selected = " + this.table_selected);

     // after we selected table -> display all colons (x+y)

    // colons x  .

    this.service.getListofColumnsx(this.table_selected).subscribe( (colon_x)=>{
      this.colons_x = colon_x ;
  });

  // colons y .

  this.service.getListofColumnsy(this.table_selected).subscribe( (colon_y)=>{
    this.colons_y = colon_y ;
});

   }



   colon_x_selected ;
   select_colone_x(value){


    this.result = [] ;

     // alert("colonne x selected = " + value);
     this.colon_x_selected = value ;
   }

   colon_y_selected ;

   select_colone_y(value){

    console.log(this.books);

   // alert("colonne y selected = " + value);
    this.colon_y_selected = value ;

    // after we choose the y " the last colon" -->get full request

      this.service.getFullRequest(this.table_selected,this.colon_x_selected,
        this.colon_y_selected).subscribe( (data)=>{
            console.log(data);

            for(var i = 0; i < data.length; i++) {
              
             // alert( data[i][this.colon_x_selected] + " / " +data[i][this.colon_y_selected]  );
              
              this.result.push(  {"name":data[i][this.colon_x_selected],"value":data[i][this.colon_y_selected] } );

            }

        });


        console.log("-------- books --------");
        console.log(this.books);
   }

getResult(){
  this.books = [] ;
  console.log(this.result);
 // document.getElementById("bar_chart_vertical").style.display = "block" ;

 this.books = [...this.result];
}


onSelectpie_chart(event){
  var sql_req = "select * from "+this.table_selected+" where " +this.colon_x_selected+" = " + event.name 
  +" and " + this.colon_y_selected + " = " + event.value ;

 // alert(sql_req) ;

  var nom_table = this.table_selected ;
  var colonne_x = this.colon_x_selected;
  var value_x = event.name ; 
  var colonne_y = this.colon_y_selected;
  var value_y = event.value ;

  this.service.getDetail(nom_table,colonne_x,value_x,colonne_y,value_y).subscribe((res)=>{
       console.log(res);
       this.service.getListofColumnsx(nom_table).subscribe( (cols)=>{
         
         // loop the columns 

         for(let j=0;j<cols.length;j++){
           alert( cols[j] +" = " + ( res[0][cols[j]] ) );
         } 
         
       }); 
  });
  
}

onSelect_advanced_pie_chart(event){
  var sql_req = "select * from "+this.table_selected+" where " +this.colon_x_selected+" = " + event.name 
  +" and " + this.colon_y_selected + " = " + event.value ;

 // alert(sql_req) ;

  var nom_table = this.table_selected ;
  var colonne_x = this.colon_x_selected;
  var value_x = event.name ; 
  var colonne_y = this.colon_y_selected;
  var value_y = event.value ;

  this.service.getDetail(nom_table,colonne_x,value_x,colonne_y,value_y).subscribe((res)=>{
       console.log(res);
       this.service.getListofColumnsx(nom_table).subscribe( (cols)=>{
         
         // loop the columns 

         for(let j=0;j<cols.length;j++){
           alert( cols[j] +" = " + ( res[0][cols[j]] ) );
         } 
         
       }); 
  });
}


onSelect_pie_grid(event){
  var sql_req = "select * from "+this.table_selected+" where " +this.colon_x_selected+" = " + event.name 
     +" and " + this.colon_y_selected + " = " + event.value ;

    // alert(sql_req) ;

     var nom_table = this.table_selected ;
     var colonne_x = this.colon_x_selected;
     var value_x = event.name ; 
     var colonne_y = this.colon_y_selected;
     var value_y = event.value ;

     this.service.getDetail(nom_table,colonne_x,value_x,colonne_y,value_y).subscribe((res)=>{
          console.log(res);
          this.service.getListofColumnsx(nom_table).subscribe( (cols)=>{
            
            // loop the columns 

            for(let j=0;j<cols.length;j++){
              alert( cols[j] +" = " + ( res[0][cols[j]] ) );
            } 
            
          }); 
     });
}




select_chart(value){
 // alert(value);
  //alert(value);
  //bar_chart_vertical
  //bar_chart_horizontal
  //pie_chart
  //advanced_pie_chart
  //grid_pie_chart

  if(value == "vertical_bar_chart"){
  //  alert( value + " // " + "vertical_bar_chart" );
    document.getElementById("vertical_bar_chart").style.display="block";
    document.getElementById("horinzontal_bar_chart").style.display="none";
    document.getElementById("pie_chart").style.display="none";
    document.getElementById("advanced_pie_chart").style.display="none";
    document.getElementById("grid_pie_chart").style.display="none";
  }
  else if( value == "horinzontal_bar_chart" ){
   // alert(value + " // " +"horinzontal_bar_chart");
    document.getElementById("vertical_bar_chart").style.display="none";
    document.getElementById("horinzontal_bar_chart").style.display="block";
    document.getElementById("pie_chart").style.display="none";
    document.getElementById("advanced_pie_chart").style.display="none";
    document.getElementById("grid_pie_chart").style.display="none";
  }
  else if(value == "pie_chart"){
    document.getElementById("vertical_bar_chart").style.display="none";
    document.getElementById("horinzontal_bar_chart").style.display="none";
    document.getElementById("pie_chart").style.display="block";
    document.getElementById("advanced_pie_chart").style.display="none";
    document.getElementById("grid_pie_chart").style.display="none";
  }
  else if (value == "advanced_pie_chart"){
    document.getElementById("vertical_bar_chart").style.display="none";
    document.getElementById("horinzontal_bar_chart").style.display="none";
    document.getElementById("pie_chart").style.display="none";
    document.getElementById("advanced_pie_chart").style.display="block";
    document.getElementById("grid_pie_chart").style.display="none";
  }
  else if (value == "grid_pie_chart"){
    document.getElementById("vertical_bar_chart").style.display="none";
    document.getElementById("horinzontal_bar_chart").style.display="none";
    document.getElementById("pie_chart").style.display="none";
    document.getElementById("advanced_pie_chart").style.display="none";
    document.getElementById("grid_pie_chart").style.display="block";
  }

}

// select filter column 

sql_filter ;
colonne_where ;
select_filter(value){

  this.colonne_where = value ;
  var colon_where_clause = value ; 
  var nom_table = this.table_selected ;
  var colonne_x = this.colon_x_selected;
  var colonne_y = this.colon_y_selected;

  if(value){
   // alert(value);
    document.getElementById("ab").style.display = "block" ;
    var sql = "select "+colonne_x+","+colonne_y+" from "+nom_table+" where "+colon_where_clause;
   // alert(sql);
    this.sql_filter = sql ;
  }
  else{
    document.getElementById("ab").style.display = "none" ;
  }
  
}

value_equal_input = "";
value_greater_input = "";
value_less_input = "";

filter_result = [];

key_event(input){

  this.filter_result = [] ;

  var input_value = input.value ;

  var colon_where_clause = this.colonne_where ; 
  var nom_table = this.table_selected ;
  var colonne_x = this.colon_x_selected;
  var colonne_y = this.colon_y_selected;

  if(input.id=="equal"){
    this.value_equal_input= input.value ;
    var equal_sql = this.sql_filter + " = " + input_value ;
    // alert(this.value_equal_input + "/" +this.value_greater_input+"/"+this.value_less_input );
    // alert(equal_sql);

  // console.log("wa1");
 this.service.req_equal(nom_table,colonne_x,colonne_y,colon_where_clause,this.value_equal_input).subscribe( (data)=>{
    // console.log(data);

    for(var i = 0; i < data.length; i++) {
       // alert( data[i][this.colon_x_selected] + " / " +data[i][this.colon_y_selected]  );
       this.filter_result.push(  {"name":data[i][colonne_x],"value":data[i][colonne_y] } );
     }

     console.log(this.filter_result);

     this.books = [...this.filter_result];
 });



  }



  else if (input.id=="greater"){
    // alert(this.value_equal_input + "/" +this.value_greater_input+"/"+this.value_less_input );
    this.value_greater_input = input.value ;
    var greater_sql = this.sql_filter + " > " + input_value ;
    
    if(this.value_less_input){

       greater_sql = this.sql_filter + " between ("+this.value_greater_input+","+this.value_less_input+") " ;
       // alert(greater_sql);

        console.log("wa2");

       this.service.req_between(nom_table,colonne_x,colonne_y,this.colonne_where,this.value_greater_input,this.value_less_input).subscribe((data)=>{
          //  console.log(data);

            for(var i = 0; i < data.length; i++) {
              // alert( data[i][this.colon_x_selected] + " / " +data[i][this.colon_y_selected]  );
              this.filter_result.push(  {"name":data[i][colonne_x],"value":data[i][colonne_y] } );
            }
       
            console.log(this.filter_result);
       
            this.books = [...this.filter_result];
       });


    }
    else{
      // alert(greater_sql);
      // alert(this.value_less_input);

      console.log("wa3");

      this.service.req_greater(nom_table,colonne_x,colonne_y,colon_where_clause,this.value_greater_input).subscribe( (data)=>{
            console.log(data);

            for(var i = 0; i < data.length; i++) {
              // alert( data[i][this.colon_x_selected] + " / " +data[i][this.colon_y_selected]  );
              this.filter_result.push(  {"name":data[i][colonne_x],"value":data[i][colonne_y] } );
            }
       
            console.log(this.filter_result);
       
            this.books = [...this.filter_result];
      });


    }
  }
  else if(input.id=="less"){
   // alert(this.value_equal_input + "/" +this.value_greater_input+"/"+this.value_less_input );
    this.value_less_input = input.value ; 
    var less_sql = this.sql_filter + " < " + input_value ;
    if(this.value_greater_input){
      less_sql = this.sql_filter + " between ("+this.value_greater_input+","+this.value_less_input+") " ;
      // alert(less_sql);

      console.log("wa3");
      
      this.service.req_between(nom_table,colonne_x,colonne_y,this.colonne_where,this.value_greater_input,this.value_less_input).subscribe((data)=>{
        console.log(data);

        for(var i = 0; i < data.length; i++) {
          // alert( data[i][this.colon_x_selected] + " / " +data[i][this.colon_y_selected]  );
          this.filter_result.push(  {"name":data[i][colonne_x],"value":data[i][colonne_y] } );
        }
   
        console.log(this.filter_result);
   
        this.books = [...this.filter_result];
   });



   }
   else{
    //  alert(less_sql);


     console.log("wa4");

     this.service.req_less(nom_table,colonne_x,colonne_y,this.colonne_where,this.value_less_input).subscribe( (data)=>{
        console.log(data);

        for(var i = 0; i < data.length; i++) {
          // alert( data[i][this.colon_x_selected] + " / " +data[i][this.colon_y_selected]  );
          this.filter_result.push(  {"name":data[i][colonne_x],"value":data[i][colonne_y] } );
        }
   
        console.log(this.filter_result);
   
        this.books = [...this.filter_result];
     });

   }


  }
}

constructor( private service:Service) {

//  Object.assign(this,this.result)

 }



  
}

