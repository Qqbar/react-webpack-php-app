# react-webpack-php-app
A small web app built using PHP, React, and Webpack
## usage
Working within the install directory...
1. Serve the api on port 8010
```php -S localhost:8010```
2. Install node modules
```npm install```
3. Compile and serve web app
```npm start```
4. Navigate to http://localhost:8020
## Web Application
1. The webapp after the initial AJAX call to the api_db.sqlite database. To add an entry, click on the blue add button.

![awp_app1](https://github.com/Qqbar/react-webpack-php-app/blob/master/img/rwp_app_ss1.png "awp_app1")

2. Then fill out the form and click submit. 

![awp_app4](https://github.com/Qqbar/react-webpack-php-app/blob/master/img/rwp_app_ss4.png "awp_app4")

3. To delete an entry, click the red delete button.

![awp_app2](https://github.com/Qqbar/react-webpack-php-app/blob/master/img/rwp_app_ss3.png "awp_app2")

4. Then click on the delete button that corresponds to the row that you would like to delete.

![awp_app3](https://github.com/Qqbar/react-webpack-php-app/blob/master/img/rwp_app_ss2.png "awp_app3")

## API
The API is built using a set of php scripts, all contained in the `api/` directory.

```http://localhost:8010/api/device/read.php```

GET request that returns a JSON object of all rows in the api_db.device table

```http://localhost:8010/api/device/create.php```

POST request that adds an entry into the api_db.device table

```http://localhost:8010/api/device/delete.php```

POST request that deletes an entry from the api_db.device table
