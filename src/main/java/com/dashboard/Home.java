package com.dashboard ;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.util.JSONPObject;

//it's the main 'rest controller' .

// @CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value="/api/dashboard")
public class Home {

	
	@Autowired 
	Dashboard dashboard ;
	
	/*

	@Autowired
	private TodoService todoService ;
	
	*/

	// route test 2
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping(value={"/test"} )
	public ArrayList<String> test2() {
		ArrayList<String> a = new ArrayList<String>();
		String nom ="test_amineee";
		a.add(nom);
		return a ; 
		
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping(value={"/products_names"} )
	public List<String> getProdsNames() {
		
		return this.dashboard.getNames_from_db();
		
	}
	
	
	// get liste of table in 'dashboard ' database .
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping(value={"/list_tables"} )
	public List<String> list_of_tables() {
		
		return this.dashboard.list_of_tables();
		
	}
	
	
	// get liste of columns in 'dashboard ' 'table x' .
	
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/list_columns/{nom_table}"} )
		public List<String> getColumns(@PathVariable String nom_table) {
			
			return this.dashboard.list_of_columns(nom_table);
			
		}
		
		
	// get only columns wich type = 'double'
		
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/list_columns_float/{nom_table}"} )
		public List<String> getColumns_float(@PathVariable String nom_table) {
			
			
			List<String> colonnes = new ArrayList<String>() ;
			
			for( int j = 0 ; j < this.dashboard.list_of_columns_double(nom_table).size() ; j++ ) {
				if(! this.dashboard.list_of_columns_double(nom_table).get(j).isEmpty() ) {
					colonnes.add( this.dashboard.list_of_columns_double(nom_table).get(j) );
				}
				else {
					System.out.println("no");
				}
			}
			
			return colonnes ;
			
		}
		
		
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/get_full_request/{nom_table}/{colon_x}/{colon_y}"} )
		public List<Object> get_full_request(@PathVariable String nom_table , @PathVariable String colon_x
				,@PathVariable String colon_y ) {
			
			return this.dashboard.getfull_request(nom_table , colon_x , colon_y);
			
		}
		
	
	
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/get_select_detail/{nom_table}/{colon_x}/{val_x}/{colon_y}/{val_y}"} )
		public List<Object> get_detail(@PathVariable String nom_table , @PathVariable String colon_x
				,@PathVariable String val_x ,@PathVariable String colon_y , @PathVariable String val_y  ) {
			
			System.out.println("select * from "+nom_table+" where " + colon_x + " = " + val_x + " and " + colon_y + "=" +  val_y);
			
			return this.dashboard.select_req_detail(nom_table, colon_x, val_x, colon_y, val_y) ;
			
		}
		
		
		// filter part 
	
		
		//equal
		
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/get_req_equal/{nom_table}/{colon_x}/{col_y}/{col_equal}/{val_equal}"} )
		public List<Object> get_req_equal(@PathVariable String nom_table , @PathVariable String colon_x
				 ,@PathVariable String col_y , @PathVariable String col_equal , @PathVariable String val_equal ) {
			
			System.out.println("select "+colon_x+","+col_y+" from "+nom_table+" where " + col_equal + " = " + val_equal);
			
			return this.dashboard.req_equal(nom_table, colon_x, col_y, col_equal, val_equal);
			
		}
	
		// greater than 
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/get_req_greater/{nom_table}/{colon_x}/{col_y}/{col_greater}/{val_greater}"} )
		public List<Object> get_req_gt(@PathVariable String nom_table , @PathVariable String colon_x
				 ,@PathVariable String col_y , @PathVariable String col_greater , @PathVariable double val_greater ) {
	
			System.out.println("select "+colon_x+","+col_y+" from "+nom_table+" where " + col_greater + " > " + val_greater);
			return this.dashboard.req_greater(nom_table, colon_x, col_y, col_greater, val_greater);
		}
		
		//less than 
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/get_req_less/{nom_table}/{colon_x}/{col_y}/{col_less}/{val_less}"} )
		public List<Object> get_req_less(@PathVariable String nom_table , @PathVariable String colon_x
				 ,@PathVariable String col_y , @PathVariable String col_less , @PathVariable double val_less ) {
	
			System.out.println("select "+colon_x+","+col_y+" from "+nom_table+" where " + col_less + " < " + val_less);
			return this.dashboard.req_less(nom_table, colon_x, col_y, col_less, val_less) ;
		}
			
		// between 
		@CrossOrigin(origins="http://localhost:4200")
		@GetMapping(value={"/get_req_between/{nom_table}/{colon_x}/{col_y}/{col_between}/{val_1}/{val_2}"} )
		public List<Object> get_req_lt(@PathVariable String nom_table , @PathVariable String colon_x
				 ,@PathVariable String col_y , @PathVariable String col_between , @PathVariable double val_1 , @PathVariable double val_2 ) {
	
			System.out.println("select "+colon_x+","+col_y+" from "+nom_table+" where " + col_between + " between " + val_1+" and "+val_2);
			return this.dashboard.req_between(nom_table, colon_x, col_y, col_between, val_1, val_2) ;
		}
		
		
		
		
		
		
		
		
		
	
	
	
}
