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
    Checkbox,
    Row,
    Col,
    Grid,
    Jumbotron
} from 'react-bootstrap'

//React-Bootstrap CSS
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//Materials UI CSS
import 'muicss/dist/css/mui.min.css';



// CHILD BUTTON MENU CLASS
class AddButtonMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <ButtonToolbar>
            <Button bsStyle='info' onClick={ this.props.toggleAddForm }>+</Button>
            <Button bsStyle='danger' onClick={ this.props.toggleDelete }>-</Button>
        </ButtonToolbar>
        );
    }
}

// CHILD TABLE CLASS
class AddTable extends React.Component {
    constructor(props) {
        super(props);
    
    //BIND FUNCTIONS
    this.buttonFormatter = this.buttonFormatter.bind(this);
    this.handleDeleteClick= this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(row) {
      console.log(row.device_id);
    };
    
    //Custom Delete button inside of table cell
    buttonFormatter(cell, row){
        return (
            <Button 
                bsSize='xsmall' 
                bsStyle='danger' 
                block 
                onClick={() => this.props.deleteRow(row.device_id)}>Delete</Button>
        )}

    render(props) {
        return (
        <div>
        <BootstrapTable data={ this.props.tableData } 
                                    pagination 
                                    hover 
                                    search 
                                    >
          <TableHeaderColumn dataField='device_id' dataSort={ true } isKey>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='device_name' dataSort={ true } >Name</TableHeaderColumn>
          <TableHeaderColumn dataField='device_model' dataSort={ true } >Model</TableHeaderColumn>
          <TableHeaderColumn dataField='mac_address' dataSort={ true }>MAC</TableHeaderColumn>
          <TableHeaderColumn hidden={!this.props.deleteColumn} dataFormat={this.buttonFormatter} >Delete</TableHeaderColumn>
        </BootstrapTable>
        </div>
        )
    }
}

// CHILD FORM CLASS
class AddForm extends React.Component {
    constructor(props) {  
        super(props);

        //Set initial state of form vars
        this.state = {
            deviceName: '',
            deviceModel: '',
            macAddress: ''
        };

        //BIND FUNCTIONS
        this.addEntry = this.addEntry.bind(this);
        this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
        this.handleDeviceModelChange = this.handleDeviceModelChange.bind(this);
        this.handleMacAddressChange = this.handleMacAddressChange.bind(this);
    }

    //Add entry to DB
    addEntry(){
        var that = this;

        fetch(that.props.createApiUrl, {
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
    

// PARENT APP CLASS
class App extends React.Component {

    constructor() {
        super();
        
        this.state = {
                data: [{
                    'device_name': '',
                    'device_model': '',
                    'mac_address': ''
                }],
                deleteColumn : false,
                addForm: false
                }

        //API URLs for AJAX calls
        this.readApiUrl = 'http://localhost:8010/api/device/read.php';
        this.deleteApiUrl = 'http://localhost:8010/api/device/delete.php';
        this.createApiUrl = 'http://localhost:8010/api/device/create.php';

        //BIND FUNCTIONS
        this.handleFetchDb = this.handleFetchDb.bind(this);
        this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
        this.handleToggleDelete = this.handleToggleDelete.bind(this);
        this.handleShowAddForm = this.handleShowAddForm.bind(this);
    }

    //Before rendering the DOM
    componentWillMount() {
        this.handleFetchDb();
    }
    
    //Fetch data from DB
    //--------------------------
    handleFetchDb(e){
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

    //Delete from DB
    //-----------------------
    handleDeleteEntry(r){
        var rowDelete = r;
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
        .then(this.handleFetchDb());
    }
    
    //Toggle the deleteColumn state
    //-----------------------------------------
    handleToggleDelete() {
        this.setState({deleteColumn: !this.state.deleteColumn})
    }
    
    //Show/Hide the AddForm
    //--------------------------------
    handleShowAddForm() {
        this.setState({addForm: !this.state.addForm})
    }

    //React Render Function
    render() {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                        <br/>
                        <Jumbotron>
                            <p>A simple web application built with React.js for managing network devices.</p>
                        </Jumbotron>
                        <Panel>
                        <AddButtonMenu 
                            fetchDb={ this.handleFetchDb }
                            toggleDelete={this.handleToggleDelete}
                            toggleAddForm={this.handleShowAddForm}
                            />
                        <AddTable
                            deleteColumn = { this.state.deleteColumn }
                            tableData={ this.state.data } 
                            deleteRow={ this.handleDeleteEntry }/>
                        </Panel>
                        {this.state.addForm? <AddForm createApiUrl = { this.createApiUrl } /> : null}
                        </Col>
                    </Row>
                </Grid>
            );
        }
}
        
export default App;

        