<?php
class Database{
     /* Script to connect to sqlite database for the api

        usage:

        
        Author: Adam Burton
        Date: September 21, 2017
        References: https://www.codeofaninja.com/2017/02/create-simple-rest-api-in-php.html */

    // specify database
    private $db_name = "../config/api_db.sqlite";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
        #TODO Try/Catch
        $this->conn = new SQLite3($this->db_name);

        return $this->conn;
    }
}
?>