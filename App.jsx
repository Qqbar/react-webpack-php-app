//IMPORTS
//React
import React from 'react';
//React-Bootsrap-Table
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//Muicss (Material)
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Panel from 'muicss/lib/react/panel';

//Fetch (AJAX API Calls)
import 'whatwg-fetch'

//React-Bootsrap
import {
    Button, 
    ButtonToolbar,
    Modal, 
    Checkbox
} from 'react-bootstrap'

//React-Bootstrap CSS
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//Materials UI CSS
import 'muicss/dist/css/mui.min.css';

//AddForm Class
//React component that contains the Add Form
class AddForm extends React.Component {
    constructor() {  
        super();

        //API URL string for creating an entry
        this.createApiUrl = 'http://localhost:8010/api/device/create.php';

        //Set initial state of form vars
        this.state = {
            deviceName: '',
            deviceModel: '',
            macAddress: ''
        };

        //Bind functions
        this.addEntry = this.addEntry.bind(this);
        this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
        this.handleDeviceModelChange = this.handleDeviceModelChange.bind(this);
        this.handleMacAddressChange = this.handleMacAddressChange.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    //Ensure user doesn't miss the form 
    scrollToBottom() {
        this.el.scrollIntoView({ behaviour: 'smooth' });
    }

    //Handle device name change
    handleDeviceNameChange(e) {
        this.setState({ deviceName: e.target.value });
    }

    //Handle device model change
    handleDeviceModelChange(e) {
        this.setState({ deviceModel: e.target.value });
    }

    //Handle MAC address change
    handleMacAddressChange(e) {
        this.setState({ macAddress: e.target.value });
    }

    //Add entry to DB
    addEntry(e){
        
        var that = this;

        fetch(that.createApiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            device_name: that.state.deviceName,
            device_model: that.state.deviceModel,
            mac_address: that.state.macAddress
            })
        })
    }

    //Form values are bound to state variables
    render() {
        return (
          <Panel>
            <Form onSubmit={ this.addEntry }>
              <legend>Add a Device</legend>
              <Input 
                hint='Name' 
                value={this.state.deviceName}
                onChange={this.handleDeviceNameChange} 
              />
              <Input 
                hint='Model'
                value={this.state.deviceModel}
                onChange={this.handleDeviceModelChange} 
              />
              <Input
                hint='MAC Address' 
                value={this.state.macAddress}
                onChange={this.handleMacAddressChange} 
              />
              <Button bsStyle='info' type='submit'>Submit</Button>
            </Form>
            <div ref={el => { this.el = el; }} />
          </Panel>
      );
    }
}

//App Class
//Main application class that is rendered from main.js
//ToDo: App class should be parent container
//All other components then rendered to App Class
class App extends React.Component {

    constructor() {
        super();
        
        //API URLs for AJAX calls
        this.readApiUrl = 'http://localhost:8010/api/device/read.php';
        this.deleteApiUrl = 'http://localhost:8010/api/device/delete.php';
        
        //State
        this.state = {
            data: [{
                'device_name': '',
                'device_model': '',
                'mac_address': ''
            }],
            hiddenColumns: {
            'delete_column' : true
            },
            childVisible: false
        };
        
        //Bind Functions
        this.changeColumn = this.changeColumn.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.fetchDb = this.fetchDb.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    componentDidMount() {
        this.fetchDb();
    }

    //Toggles the state of the hidden delete
    //column true/false.
    changeColumn(e) {
        const p = 'delete_column';
        this.setState({
            hiddenColumns: Object.assign(this.state.hiddenColumns,
            {[p]: !this.state.hiddenColumns[p]}
            ) 
        });
    }
  
    //Changes the state of the AddForm
    //true/false
    showAddForm(e) {
        this.setState({childVisible: !this.state.childVisible})
    }
  
    //Fetch data from DB
    fetchDb(e){
        var that = this;
        fetch(that.readApiUrl)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json.records);
            that.setState({data: json.records});
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    }

    //Handle delete from DB
    deleteEntry(r){

        var rowDelete = r.device_id;
        var that = this;

        fetch(that.deleteApiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            device_id: rowDelete
            })
        })
        .then(this.fetchDb());
        //THIS GOES IN SUCCESS FUNCTIONthis.fetchDb();
    }

    //Custom Delete button inside of table cell
    buttonFormatter(cell, row){
        return (
            <Button 
                bsSize='xsmall' 
                bsStyle='danger' 
                block 
                onClick={()=>this.deleteEntry(row)}>Delete</Button>
        )}

    //React Render Function
    render() {
        const { data } = this.state;
        return (
        <div>
        <Panel>
        <ButtonToolbar>
            <Button bsStyle='info' onClick={ this.showAddForm }>+</Button>
            <Button bsStyle='danger' onClick={ this.changeColumn }>-</Button>
        </ButtonToolbar>
        <br/>
        <BootstrapTable data={ data } pagination striped hover condensed search>
          <TableHeaderColumn dataField='device_id' dataSort={ true } isKey>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='device_name' dataSort={ true } >Name</TableHeaderColumn>
          <TableHeaderColumn dataField='device_model' dataSort={ true } >Model</TableHeaderColumn>
          <TableHeaderColumn dataField='mac_address' dataSort={ true }>MAC</TableHeaderColumn>
          <TableHeaderColumn hidden={this.state.hiddenColumns.delete_column} dataFormat={this.buttonFormatter} >Delete</TableHeaderColumn>
        </BootstrapTable>
        </Panel>
        {this.state.childVisible ? <AddForm /> : null}
        </div>
        );
    }
}

export default App;