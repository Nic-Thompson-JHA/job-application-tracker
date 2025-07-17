import React from 'react';
import axios from 'axios';
import '../JobApplication/CSS/AddJobApplication.css';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withRouter } from '../withRouter';

class AddJobApplication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: 0,
            CompanyName: '',
            Position: '',
            Status: 'Applied',
            DateApplied: '',
            Actions: ''
        };

        this.navigateToList = this.navigateToList.bind(this);
    }

    navigateToList()
    {
        this.props.navigate('/JobApplicationList');
        window.location.reload();
    }

    AddJobApplication = async () => {
        await axios.post('http://localhost/JobApplications/applications/', {
            Id: this.state.Id,
            CompanyName: this.state.CompanyName, 
            Position: this.state.Position, 
            Status: this.state.Status, 
            DateApplied: this.state.DateApplied, 
            Actions: this.state.Actions }
        ).then(json => {
            if (json.data.id > 0) {
                console.log(json.status);
                this.navigateToList();
            } else {
                alert('Data not Saved');
            }
        });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Enter Job Application Information</h4>
                <Form className="form">
                    <Col>
                        <FormGroup row>
                            <Label for="CompanyName" sm={2}>Company Name</Label>
                            <Col sm={5}>
                                <Input type="text" name="CompanyName" onChange={this.handleChange} value={this.state.CompanyName} placeholder="Enter Company Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Position" sm={2}>Position</Label>
                            <Col sm={5}>
                                <Input type="text" name="Position" onChange={this.handleChange} value={this.state.Position} placeholder="Enter Position" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="DateApplied" sm={2}>Date Applied</Label>
                            <Col sm={3}>
                                <Input type="date" name="DateApplied" onChange={this.handleChange} value={this.state.DateApplied} placeholder="Enter Date Applied" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Status" sm={2}>Status</Label>
                            <Col sm={3}>
                                <Input type="select"  name="Status" onChange={this.handleChange} defaultValue="Applied" value={this.state.Status} placeholder="Select Status">
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Actions" sm={2}>Actions</Label>
                            <Col sm={10}>
                                <Input type="textarea" rows="5" name="Actions" onChange={this.handleChange} value={this.state.Actions} placeholder="Enter Actions" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}></Col>
                            <Col sm={1}>
                                <button type="button" onClick={this.AddJobApplication} className="btn btn-success">Submit</button>
                            </Col>
                            <Col sm={1}>
                                <Button color="danger" onClick={this.navigateToList}>Cancel</Button>{' '}
                            </Col>
                            <Col sm={5}></Col>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }
}

export default withRouter(AddJobApplication);