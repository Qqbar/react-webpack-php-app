<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate device object
include_once '../objects/device.php';
 
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$device = new Device($db);
 
// get posted data
$json_out = file_get_contents("php://input");
// decode
$data = json_decode($json_out);

// set device property values
$device->device_name = $data->device_name;
$device->device_model = $data->device_model;
$device->mac_address = $data->mac_address;

// create the device
if($device->create()){
    echo '{';
        echo '"message": "A device was created."';
    echo '}';
}
// if unable to create the device, tell the user
else{
    echo '{';
        echo '"message": "Unable to create a device."';
    echo '}';
}
?>