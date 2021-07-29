package com.dashboard ;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


@Repository
public class Dashboard {
	
	   @Autowired
	    JdbcTemplate jt;
    
    public Dashboard() {
	
    
    }
    
    
    
    // mysql test functions 
    
    // test mysql 
    
    
	
    public List<String> getNames_from_db() {
    	List<String> list = new ArrayList<String>();
    	list.addAll( jt.queryForList("select name from product ;",String.class) ) ;
    	return list ;
    }

    

    // methode 2 : jdbctemplate . execute 
    
    
    
    public void test_jdbc2() {
    	jt.execute("CREATE TABLE amine111(" +
                "id11 SERIAL, name22 VARCHAR(255), price33 NUMERIC(15, 2))");

    }
    
    /*
    
    // methode 3 : with parmeters 
    
    
    public void test_jdbc3(String nom_table) {
    	jt.execute("CREATE TABLE "+nom_table+"(" +
                "id11 SERIAL, name22 VARCHAR(255), price33 NUMERIC(15, 2))");

    }
    
    

       */
    
    	public void create_table(String nom_table) {
    
    		String sql_create_table =" CREATE TABLE "+nom_table+ "( id INT PRIMARY KEY NOT NULL ) " ;
    		jt.execute(sql_create_table);
    	}
    	
    	
    	public void add_colonnes(String nom_colonne , String nom_table) {
    		
    		String sql_add_colonne = "ALTER TABLE "+nom_table+" ADD "+nom_colonne+" VARCHAR(255)" ;
    		
    		jt.execute(sql_add_colonne) ;
    		
    	}

     
  
    	
    	// real work 
    	// list of tables 
    	
    	 public List<String> list_of_tables( ) {
    		 	List<String> list_tables = new ArrayList<String>() ;
    		 	list_tables.addAll( jt.queryForList("show tables ;", String.class) ) ;
    	    	return list_tables ;
    	    }
    	 
    	 
    	 // list of conumns in table x  ( x )
    	 
    	 public List<String> list_of_columns(String nom_table){
    		 
    		 String sql = "SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '"+nom_table+"' AND table_schema = 'dashboards' ; " ;
    		 
    		 List<String> list_cols = new ArrayList<String>();
    		 list_cols.addAll( jt.queryForList(sql, String.class) ) ;
    		 return list_cols ;
    	 }
    	
    	 
    	 // list of columns type = 'float'   ( y )
    	 
    	 // SELECT if (column_type='float',column_name,"") FROM INFORMATION_SCHEMA.COLUMNS
    	// WHERE TABLE_NAME = 'client' AND table_schema = 'dashboards' 
    	 
    	 	public List<String> list_of_columns_double(String nom_table){
    		 
    		 String sql = "SELECT if (column_type='double',column_name,'') FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '"+nom_table+"' AND table_schema = 'dashboards' ; " ;
    		 System.out.println("query float => " + sql);
    		 List<String> list_cols_float = new ArrayList<String>();
    		 list_cols_float.addAll( jt.queryForList(sql, String.class) ) ;
    		 return list_cols_float ;
    	 }
    	
    	 
    	 
    	 	public List<Object> getfull_request(String nom_table, String colon_x , String colon_y) {
    	    	List<Object> list = new ArrayList<Object>();
    	    	list.addAll( jt.queryForList("select "+colon_x+","+colon_y+" from "+nom_table+" ;") ) ;
    	    	return list ;
    	    }
    	 	
    	 	
    	 	public List<Object> select_req_detail(String nom_table, String colon_x , String val_x , String colon_y , String val_y) {
    	    	List<Object> list = new ArrayList<Object>();
    	    	list.addAll( jt.queryForList("select * from "+nom_table+" where " + colon_x + " = '" + val_x + "' and " + colon_y + " = " +  val_y ) ) ;
    	    	
    	    	System.out.println("req detail == " + "select * from "+nom_table+" where " + colon_x + " = '" + val_x + "' and " + colon_y + "=" +  val_y );
    	    	return list ;
    	    }
    	 	
    	 	
       	
    	 	// filter part 
    	 	
    	 	// equal
    	 	public List<Object> req_equal(String nom_table, String colon_x , String colon_y,String col_equal , String val_equal) {
    	    	List<Object> list = new ArrayList<Object>();
    	    	list.addAll( jt.queryForList("select "+colon_x+","+colon_y+" from "+nom_table+" where "+col_equal+" = '"+val_equal+"' ") ) ;
    	    	
    	    	return list ;
    	    }
    	 	
    	 	// greater than 
    	 	public List<Object> req_greater(String nom_table, String colon_x , String colon_y,String col_greater , double val_greater) {
    	    	List<Object> list = new ArrayList<Object>();
    	    	list.addAll( jt.queryForList("select "+colon_x+","+colon_y+" from "+nom_table+" where "+col_greater+" > "+val_greater) ) ;
    	    	return list ;
    	    }
    	 	
    	 	// less than 
    	 	public List<Object> req_less(String nom_table, String colon_x , String colon_y,String col_less , double val_less) {
    	    	List<Object> list = new ArrayList<Object>();
    	    	list.addAll( jt.queryForList("select "+colon_x+","+colon_y+" from "+nom_table+" where "+col_less+" < "+val_less) ) ;
    	    	return list ;
    	    }
    	 
    
    	 	// between 
    	 	public List<Object> req_between(String nom_table, String colon_x , String colon_y,String col_between , double val_1,double val_2) {
    	    	List<Object> list = new ArrayList<Object>();
    	    	list.addAll( jt.queryForList("select "+colon_x+","+colon_y+" from "+nom_table+" where "+col_between+" between "+val_1+" and "+val_2) ) ;
    	    	return list ;
    	    }
    	 	
   
}
