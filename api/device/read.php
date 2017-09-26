<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/device.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$device = new Device($db);
 
// query products
$result = $device->read();

// number of rows
$nrows = 0;
$result->reset();
while ($result->fetchArray())
    $nrows++;
$result->reset();
$num = $nrows;


// check if more than 0 record found
if($num>=0){
 
    // products array
    $device_arr=array();
    $device_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = $result->fetchArray()){
        //insert row into array
        array_push($device_arr["records"], $row);
    }
    echo json_encode($device_arr);
}
 
else{
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>