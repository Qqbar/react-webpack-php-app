<?php
class Device{
 
    // database connection and table name
    private $conn;
    private $table_name = "devices";
 
    // object properties
    public $device_id;
    public $device_model;
    public $device_name;
    public $mac_address;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read devices
    // ***********
    function read(){
        // select all query
        $query = "SELECT
                        p.device_name, p.device_id, p.device_model, p.mac_address
                        FROM
                        " . $this->table_name . " p
                        ORDER BY
                        p.device_id ASC";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        $result = $stmt->execute();

        return $result;
    }

    // create devices
    // ************
    function create(){
 
        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "
                (device_model, device_name, mac_address)
                VALUES
                (:device_model, :device_name, :mac_address)";
 
        // prepare query
        $stmt = $this->conn->prepare($query);
 
        // sanitize
        $this->device_model=htmlspecialchars(strip_tags($this->device_model));
        $this->device_name=htmlspecialchars(strip_tags($this->device_name));
        $this->mac_address=htmlspecialchars(strip_tags($this->mac_address));

        // bind values
        $stmt->bindParam(":device_model", $this->device_model);
        $stmt->bindParam(":device_name", $this->device_name);
        $stmt->bindParam(":mac_address", $this->mac_address);
 
        // execute query
        if($this->device_model!='' && $this->device_name !='' && $this->mac_address !=''){
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
        
    }

    // remove the device
    // ****************
    function delete(){
 
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE device_id = ?";
 
        // prepare query
        $stmt = $this->conn->prepare($query);
 
        // sanitize
        $this->device_id=htmlspecialchars(strip_tags($this->device_id));
 
        // bind id of record to delete
        $stmt->bindParam(1, $this->device_id);
 
        // execute query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}
?>