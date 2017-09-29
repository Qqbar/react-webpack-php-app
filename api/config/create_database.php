<?php

    /* Script to create a new sqlite database and 
        pre-populate it with a few entries in a 'Devices' table
        
        usage:
        php create_database.php
        
        Author: Adam Burton
        Date: September 21, 2017
        References: http://henryranch.net/software/ease-into-sqlite-3-with-php-and-pdo/
    */

    $database = new SQLite3('api_db.sqlite') or die('Unable to open database');

    try
    {
    //open the database
    $db = new PDO('sqlite:api_db.sqlite');

    //create devices table
    $db->exec("CREATE TABLE devices (
                    device_id INTEGER PRIMARY KEY, 
                    device_name TEXT NOT NULL, 
                    device_model TEXT NOT NULL, 
                    mac_address TEXT UNIQUE NOT NULL)");  

    //populate devices db
    $db->exec("INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('temp_sense_1', 'RTD', '00-14-22-01-23-45');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('temp_sense_2', 'RTD', '00-14-23-04-24-45');".
                     "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('temp_sense_3', 'RTD', '00-12-33-14-24-49');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('keyboard_1', 'Dell', '04-14-63-34-24-40');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('ir_sense_1', 'Honeywell', '00-32-25-94-21-73');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('ir_sense_2', 'Honeywell', '00-54-82-64-24-42');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('light_sense_1', 'Sensiron', '00-15-43-14-26-65');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('light_sense_2', 'Sensiron', '00-15-46-11-72-67');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('light_sense_3', 'Honeywell', '00-62-34-14-76-61');".
                    "INSERT INTO devices (device_name, device_model, mac_address) 
                    VALUES ('o2_sense', 'TI', '00-11-42-13-76-25');"
                    );
    //close db
    $db = NULL;

    }

    catch(PDOException $e)
    {
    print 'Exception : '.$e->getMessage();
    }

?>